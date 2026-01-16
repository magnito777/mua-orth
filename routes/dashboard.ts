import express from "express";
import type { Request, Response } from "express";
import { auth } from "../auth";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const session = await auth.api.getSession({
        headers: req.headers,
    });
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    res.json({ message: `Welcome back, ${session.user.name}!`, role: session.user.role });
});

export default router;
