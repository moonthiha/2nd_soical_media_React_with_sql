import express from "express";
import comment_controller from "../controllers/comment_controller.js";
import AuthUser from "../middleware/Auth_User.js";
const CommentRouter = express.Router();

CommentRouter.get("/", comment_controller.getComment);
CommentRouter.post("/", AuthUser , comment_controller.createComment);

export default CommentRouter;