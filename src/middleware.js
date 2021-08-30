export const localsMiddleware = (req, res, next) => {
	console.log("미들웨어가 실행됩니다\n");
	console.log(req.session);
	res.locals.loggedIn = Boolean(req.session.loggedIn);
	res.locals.siteName="WETUBE";
	res.locals.loggedInUser = req.session.user || {};
	next();
}

export const protectorMiddleware = (req, res, next) => {
	if (req.session.loggedIn){
		return next();
	} else {
		return res.redirect("/login");
	}
};

export const publicOnlyMiddleware = (req, res, next) => {
	if (!req.session.loggedIn){
		return next();
	} else {
		return res.redirect("/");
	}
};
