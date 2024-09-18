import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  author: z.string().regex(objectIdRegex, "Invalid author ID format"),
});

export const updatePostSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid post ID format"),
  title: z.string().min(1, "Title is required").optional(),
  body: z.string().min(1, "Body is required").optional(),
  author: z
    .string()
    .regex(objectIdRegex, "Invalid author ID format")
    .optional(),
  createdAt: z.string().optional(),
});
