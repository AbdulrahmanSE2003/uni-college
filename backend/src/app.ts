// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// ─── Routes ─────────────────────────────────────────────────────────────
// app.use("/api/v1/", routes)

export default app;
