import { Post, User } from "@/models";
import { catchError } from "@/utils";
import { createPostSchema } from "@/validations";
import { Request, Response } from "express";

export function createPost(request: Request, response: Response) {
  catchError(async () => {
    const result = createPostSchema.parse(request.body);

    const { author, title, body } = result;

    const user = await User.findById(author);

    if (!user) {
      return response.status(400).json({
        message: "Author not found with the provided id",
      });
    }

    const post = new Post({
      author,
      title,
      body,
    });

    await post.save();

    return response.status(201).json({
      message: "Post has been created",
      data: post,
    });
  }, response);
}

export function getPostById(request: Request, response: Response) {
  catchError(async () => {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({
        message: "Post id is required",
      });
    }

    const post = await Post.findById(id).populate("author", "-password");

    if (!post) {
      return response.status(400).json({
        message: "Post not found with the provided ID",
      });
    }

    return response.status(200).json({
      message: "Post has been created",
      data: post,
    });
  }, response);
}
