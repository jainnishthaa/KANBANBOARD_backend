import express from "express";
import { getTasks, getUser } from "../controllers/user.js";

const router = express.Router();
router.get("/", getUser);
router.get("/tasks",getTasks);

export default router;