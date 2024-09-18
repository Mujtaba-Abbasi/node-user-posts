import { Request, Response } from "express";
import { Post, User } from "@/models";
import { performPasswordHash } from "@/utils";
import { catchError } from "@/utils/catchError";
import { createUserSchema, updateUserSchema } from "@/validations";
import { Types } from "mongoose";

export function createUser(request: Request, response: Response) {
  catchError(async () => {
    const result = createUserSchema.parse(request.body);
    const { username, firstName, lastName, email, password, role } = result;

    const isEmailAlreadyTaken = await User.findOne({ email });

    if (isEmailAlreadyTaken) {
      return response.status(400).json({
        message: "Email is already taken",
      });
    }

    const isUsernameAlreadyTaken = await User.findOne({ username });

    if (isUsernameAlreadyTaken) {
      return response.status(400).json({
        message: "Username is already taken",
      });
    }

    const hashedPassword = performPasswordHash(password);

    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    response.status(201).json({
      message: "User has been created",
      data: user,
    });
  }, response);
}

export function getUserById(request: Request, response: Response) {
  catchError(async () => {
    const userId = request.params.id;

    if (!userId) {
      return response.status(400).json({ message: "User id is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json({
      message: "User found",
      data: user,
    });
  }, response);
}

export function updateUser(request: Request, response: Response) {
  catchError(async () => {
    const userId = request.params.id;
    const result = updateUserSchema.parse(request.body);

    const user = await User.findByIdAndUpdate(userId, result, { new: true });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  }, response);
}

export function deleteUser(request: Request, response: Response) {
  catchError(async () => {
    const userId = request.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json({
      message: "User deleted successfully",
    });
  }, response);
}

export function getUserPosts(request: Request, response: Response) {
  catchError(async () => {
    const id = checkUserIdParams(request, response);

    const posts = await Post.find({
      author: id,
    }).populate("author", "-password");

    response.status(200).json({
      message: "Post has been fetched successfully",
      data: posts,
    });
  }, response);
}

export function getUserPostStats(request: Request, response: Response) {
  catchError(async () => {
    const id = checkUserIdParams(request, response);

    const stats = await User.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id as string),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$posts" },
        },
      },
      {
        $project: {
          username: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          postCount: 1,
          posts: {
            title: 1,
            body: 1,
            author: 1,
          },
        },
      },
    ]);

    response.status(200).json({
      message: "User stats has been fetched",
      data: stats,
    });
  }, response);
}

export function checkUserIdParams(request: Request, response: Response) {
  const id = request.params.id;

  if (!id) {
    return response.status(400).json({
      message: "User id is required",
    });
  }

  return id;
}
