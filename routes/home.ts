import express from "express";
import type { Request, Response } from "express";
import { auth } from "../auth.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if (session) {
        res.json({
            message: `Welcome, ${session.user.name}!`,
            status: "Logged In",
            role: session.user.role,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    res.json({
        message: "Welcome to Mua Orthopaedic Clinic API",
        status: "Online",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

export default router;
