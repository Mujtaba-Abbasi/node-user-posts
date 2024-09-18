import { Application } from "express";
import { userRouter } from "./user";
import { postRouter } from "./post";

export const useRoutes = (app: Application) => {
  console.log("Initializing API Routes");
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
  console.log("API Routes has been initialized");
};
