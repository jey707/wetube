import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); //하나의 url에 get,post방식 쓰일떄
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo); //하나의 url에 get,post방식 쓰일떄
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
