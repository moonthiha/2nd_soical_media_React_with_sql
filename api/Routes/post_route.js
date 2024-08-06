import express from 'express';
import AuthUser from '../middleware/Auth_User.js';
import post_controller from '../controllers/post_controller.js';
const PostRoute = express.Router();


PostRoute.post("/add",AuthUser , post_controller.addPost);
PostRoute.get("/get", AuthUser, post_controller.getPost);
PostRoute.delete("/delete/:id",AuthUser,post_controller.dropPost);

export default PostRoute;