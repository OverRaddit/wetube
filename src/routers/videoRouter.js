import express from "express";
import {watch, getedit, postedit, upload, deleteVideo} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", getedit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

videoRouter.post("/:id(\\d+)/edit", postedit);
export default videoRouter;
