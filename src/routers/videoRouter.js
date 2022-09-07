import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit); //하나의 url에 get,post방식 쓰일떄
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
