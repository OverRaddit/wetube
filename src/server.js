import express from "express";

const PORT = 4000;

const app = express();

const gossipmiddleware = (req, res, next) => {
	console.log("I'm in middleware! 🐶");
	next();
}

const handleHome = (req, res, next) => {
	console.log("Somebody is trying to go home.🔑");
	return res.end();
}
app.get("/", gossipmiddleware, handleHome);

const handleListening = () => console.log("Server listening on port 4000🪄");

app.listen(4000, handleListening);
