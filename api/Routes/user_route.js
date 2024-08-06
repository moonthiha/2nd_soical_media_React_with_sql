import express from "express";
import user_controller from "../controllers/user_controller.js";
import AuthUser from "../middleware/Auth_User.js";
const UserRouter = express.Router();


UserRouter.get("/find/:userId", user_controller.getUser);
UserRouter.put("/updateUser",AuthUser, user_controller.updateUser);



export default UserRouter;