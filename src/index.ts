import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../auth";
import dotenv from "dotenv";

// Initialize utilities and environment
import "../utils/logger";
dotenv.config();

// Route imports
import configRouter from "../config/config";
import apiRouter from "../routes/index";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Auth Handler
app.use("/api/auth", toNodeHandler(auth));

// Mounting Routers
app.use("/", apiRouter);      // Home and Dashboard
app.use("/config", configRouter); // Logs and DB check

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
