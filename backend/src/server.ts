import dotenv from "dotenv";
dotenv.config(); // ← Must be FIRST before any other imports that use env vars
console.log(process.env.CLIENT_URL);

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();
