import express, { urlencoded } from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// session이라는 middleware가 브라우저체 cookie를 전송한다.
// Cookie란 백엔드가 브라우저에게 주는 정보이다.
// 브라우저는 매 요청시마다 request에 쿠키를 덧붙이게 된다.
app.use(session({
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized:false,
	// cookie: {
	// 	maxAge: 20000,
	// },
	store: MongoStore.create({
		mongoUrl: process.env.DB_URL
	})
}))

app.use((req, res, next) => {
	req.sessionStore.all((error, sessions) => {
		console.log(sessions);
		next();
	});
});
app.use(localsMiddleware);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/videos", videoRouter);

export default app;
