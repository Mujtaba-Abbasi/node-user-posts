import { Router } from "express";
import { createPost, getPostById } from "@/controller";

export const postRouter = Router();

postRouter.post("/create-post", createPost);

postRouter.get("/get-post/:id", getPostById);
