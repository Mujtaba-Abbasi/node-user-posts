import mongoose from "mongoose";
import { config } from "./config";

export async function connectToDb() {
  try {
    console.log("Connecting to the database");
    if (!config.db.DB_URL) {
      throw {
        message: "DB connection URL is missing from the config",
      };
    }
    await mongoose.connect(config.db.DB_URL);
    console.log("Connected to the database");
  } catch (error: any) {
    throw {
      message:
        error?.message ?? "Something went wrong connecting to the database",
    };
  }
}
