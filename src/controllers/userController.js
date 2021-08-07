import User from "../models/User";
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
	const user = await User.findOne({ username });
	console.log(user);
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
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
