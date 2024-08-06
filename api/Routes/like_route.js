import express from "express";
import like_controller from "../controllers/like_controller.js";
import AuthUser from "../middleware/Auth_User.js";

const LikeRouter = express.Router();

LikeRouter.get("/", like_controller.getLike);
LikeRouter.post("/", like_controller.createLike);
LikeRouter.delete("/", AuthUser , like_controller.dropLike);

export default LikeRouter;