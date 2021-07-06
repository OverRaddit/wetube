import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
	console.log("Somebody is trying to go home.🔑");
	return res.end();
}
app.get("/", handleHome);

const handleListening = () => console.log("Server listening on port 4000🪄");

app.listen(4000, handleListening);
