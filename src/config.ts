import dotenv from "dotenv";

dotenv.config();

const { PORT, DB_URL } = process.env;

export const config = {
  server: {
    PORT,
  },
  db: {
    DB_URL,
  },
};
