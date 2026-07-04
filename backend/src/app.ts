// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { globalErrorHandler } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import { inngest } from "./config/inngest";
import { gradeExamFunction } from "./inngest";
import { serve } from "inngest/express";
import gradeRoutes from "./routes/gradeRoutes";

const app = express();

// ─── Security Middleware ──────────────────────────────────────────────────────
// 1. Set secure HTTP headers to mitigate cross-site scripting (XSS) and clickJacking
app.use(helmet());

// 2. Sanitize user input to prevent NoSQL Query Injection attacks
app.use(mongoSanitize());

// 3. Limit repeated requests to public APIs / endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
app.use("/api/", limiter);

// ─── Standard Middleware ──────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Body parser with payload limit protection
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/grades", gradeRoutes);

app.use(
  "/api/inngest",
  serve({ client: inngest, functions: [gradeExamFunction] }),
);

app.use(globalErrorHandler);
export default app;
