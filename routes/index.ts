import express from "express";
import homeRouter from "./home.js";
import dashboardRouter from "./dashboard.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/dashboard", dashboardRouter);

export default router;
