import express from "express";
import { CommentController } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express();

router.post("/create", verifyToken, CommentController.create);

export default router;