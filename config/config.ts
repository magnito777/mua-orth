
import express from "express";
import type { Request, Response } from "express";

import sql from "../db.js"


import { getLogs } from "../utils/logger.js";

const router = express.Router();

router.get("/logs", async (req: Request, res: Response) => {
    try {
        const result = await sql`SELECT version()`;
        const version = result[0]?.version || "Unknown";
        const logs = getLogs();
        res.json({
            message: "Hello World!",
            version,
            logs
        });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to connect to database", logs: getLogs() });
    }
});

export default router;



