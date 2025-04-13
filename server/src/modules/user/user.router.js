import { Router } from "express";
import userController, { getAllUsers } from "./user.controller.js";

const userRouter = Router();
userRouter.get("/users", getAllUsers);

export default userRouter;
