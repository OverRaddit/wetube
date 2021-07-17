import express from "express";
import {watch, getedit, postedit, getUpload, postUpload, deleteVideo} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
//videoRouter.get("/:id(\\d+)/edit", getedit);
//videoRouter.post("/:id(\\d+)/edit", postedit);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getedit).post(postedit);

videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
