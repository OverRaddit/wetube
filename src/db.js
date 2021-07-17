import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const handleOpen = () => console.log("DB OPEN 💡");
const db = mongoose.connection;
db.on("error", (error) => console.log("DB Error: ", error));
db.once("open", handleOpen);
