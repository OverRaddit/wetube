import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,// form에서 unique를 쓸때 warning발생하는 것을 꺼주기 위함.
});

const handleOpen = () => console.log("DB OPEN 💡");
const db = mongoose.connection;
db.on("error", (error) => console.log("DB Error: ", error));
db.once("open", handleOpen);
