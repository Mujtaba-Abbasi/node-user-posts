import express from "express";

import { config } from "./config";
import { connectToDb } from "./db";
import { useRoutes } from "./routes";

const PORT = config.server.PORT || 4000;

const app = express();

app.use(express.json());

useRoutes(app);

app.listen(PORT, async () => {
  try {
    await connectToDb();
    console.log("Server is running on", PORT);
  } catch (error: any) {
    console.log(error?.message || `Something went wrong at the server startup`);
  }
});
