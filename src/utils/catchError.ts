import { Response } from "express";
import { z } from "zod";

export async function catchError(
  callback: () => Promise<Response | void>,
  response: Response
) {
  try {
    await callback();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
    console.error(error);
    return response.status(500).send("Internal server error");
  }
}
