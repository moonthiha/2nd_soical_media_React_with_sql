import express from "express";
import auth_controller from "../controllers/auth_controller.js";
const AuthRouter = express.Router();

AuthRouter.post("/register", auth_controller.register);
AuthRouter.post("/login", auth_controller.login);
AuthRouter.post("/logout", auth_controller.logout);

export default AuthRouter;