import {
  createUser,
  deleteUser,
  getUserById,
  getUserPosts,
  getUserPostStats,
  updateUser,
} from "@/controller";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/create-user", createUser);
userRouter.put("/update-user/:id", updateUser);

userRouter.get("/get-user/:id", getUserById);
userRouter.get("/get-posts/:id", getUserPosts);
userRouter.get("/get-post-stats/:id", getUserPostStats);

userRouter.delete("/delete-user/:id", deleteUser);
