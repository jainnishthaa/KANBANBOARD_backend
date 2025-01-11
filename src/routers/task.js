import express from "express";
import { getDelete, getTask, postAdd, postEdit, postMove } from "../controllers/task.js";

const router = express.Router();
router.get("/:id", getTask);
router.post("/add", postAdd);
router.post("/edit/:id", postEdit);
router.post("/move/:id", postMove);
router.get("/delete/:id", getDelete);

export default router;