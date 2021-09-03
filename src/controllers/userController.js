import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});

export const postJoin = async (req, res) => {
	const {name, username, email, password, password2, location} = req.body;
	const exists = await User.exists({$or: [{username}, {email}] });
	if (password !== password2){
		return res.status(400).render("join", {
			pageTitle: "Join",
			errorMessage: "Password confirmation does not match."
		});
	}
	if (exists){
		return res.status(400).render("join", {
			pageTitle: "Join",
			errorMessage: "This username or email is  already taken."
		});
	}
	try {
		await User.create({
			name,
			username,
			email,
			password,
			location,
		});
		return res.redirect("/login");
	} catch (error) {
		console.log(error);
		return res.status(400).render("upload", {
			pageTitle: "Upload Video",
			errorMessage: error._message,
		});
	}
}

export const getLogin = (req, res) =>
	res.render("login", {pageTitle: "Login"});

export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	const pageTitle = "Login";
	const user = await User.findOne({ username, socialOnly: false });
	if (!user) {
		return res.status(400).render("login", {
			pageTitle,
			errorMessage:"An account with this username does not exists."
		});
	}
	// 비밀번호 확인
	const ok = await bcrypt.compare(password, user.password);
	if (!ok)
		return res.status(400).render("login", {
			pageTitle,
			errorMessage:"Wrong password"
		});
	//console.log("Log User in! Coming soon!")
	req.session.loggedIn = true;
	req.session.user = user;
	return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
	const baseURL = "https://github.com/login/oauth/authorize";
	const config = {
		client_id:process.env.GH_CLIENT,
		allow_signup:false,
		scope:"read:user user:email"
	}
	const params = new URLSearchParams(config).toString();
	const FullURL = `${baseURL}?${params}`;
	return res.redirect(FullURL);
}

export const finishGithubLogin = async (req, res) => {
	const baseURL = "https://github.com/login/oauth/access_token";
	const config = {
		client_id: process.env.GH_CLIENT,
		client_secret: process.env.GH_SECRET,
		code: req.query.code
	};
	const params = new URLSearchParams(config).toString();
	const FullURL = `${baseURL}?${params}`;
	const tokenRequest = await (
		await fetch(FullURL, {
			method:"POST",
			headers: {
				Accept: "application/json",
			}
		})
	).json();
	if ("access_token" in tokenRequest){
		// access api
		const {access_token} = tokenRequest;
		const apiURL = "https://api.github.com";
		const userData = await (
			await fetch(`${apiURL}/user`, {
				method: "GET",
				headers: {
					Authorization: `token ${access_token}`,
				},
			})
		).json();
		const emailData = await (
			await fetch(`${apiURL}/user/emails`, {
				method: "GET",
				headers: {
					Authorization: `token ${access_token}`,
				},
			})
		).json();
		const emailObj = emailData.find(
			(email) => email.primary === true && email.verified === true
		);
		if (!emailObj)
			return res.redirect("/login");
		const user = await User.findOne({email: emailObj.email});
		// 만약 깃허브로그인한 계정이 특정회원의 이메일과 일치x
		if (!user) {
			// create an account
			user = await User.create({
				avatarUrl: userData.avatar_url,
				name: userData.name,
				socialOnly: true,
				username: userData.login,
				email: emailObj.email,
				password: "",
				location: userData.location,
			});
		}
		req.session.loggedIn = true;
		req.session.user = user;
		res.redirect("/");
	} else {
		// notification 방식으로 보내고 싶지만 아직 user에게 notification을 보낼 수 없음.
		// 나중에 개선시킬듯!
		res.redirect("/login");
	}
}

export const getEdit = (req, res) => {
	return res.render("edit-profile", { pageTitle: "Edit Profile" });
}

export const postEdit = async (req, res) => {
	const {
		session: {
			user: {_id, avataUrl}
		},
		body : {name, email, username, location},
		file,
	} = req;
	// 다른 회원의 이메일로 가입할수있어서 중복체크를 해줘야 하는데,,,
	const updatedUser = await User.findByIdAndUpdate(
		_id,
		{
			avatarUrl: file ? file.path : avataUrl,
			name,
			email,
			username,
			location,
		},
		{ new: true } // 업데이트된 유저를 반환하기 위해 추가한 옵션
	);
	req.session.user = updatedUser;
	return res.redirect("/users/edit");
}
export const logout = (req, res) => {
	// req.session이랑 res.session이랑 무슨차이일까?
	req.session.destroy();
	return res.redirect("/");
};

export const getChangePassword = (req, res) => {
	// 소셜계정 사용자는 비밀번호를 바꿀 수 없다.
	if (req.session.user.socialOnly === true) {
		return res.redirect("/");
	}
	return res.render("users/change-password", {pageTitle:"Change Password"});
}

export const postChangePassword = async (req, res) => {
	const {
		session: {
			user: {_id, password},
		},
		body: { oldPassword, newPassword, newPasswordConfirmation },
	} = req;
	const user = await User.findById(_id);
	const ok = await bcrypt.compare(oldPassword, user.password);
	if (newPassword !== newPasswordConfirmation){
		return res.status(400).render("users/change-password", {pageTitle:"Change Password", errorMessage: "두 비밀번호가 서로 일치하지 않습니다."});
	}
	if (!ok) {
		return res.status(400).render("users/change-password", {
			pageTitle:"Change Password",
			errorMessage: "비밀번호가 틀렸습니다."
		});
	}
	user.password = newPassword;
	await user.save();
	return res.redirect("/users/logout");
}

export const see = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user){
		return res.status(404).render("404", {pageTitle: "User not found."});
	}
	return res.render("users/profile", {pageTitle: user.name, user});
}
