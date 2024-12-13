import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { PostController } from "../controllers/post.controller.js";

const router = express();

router.post("/create", verifyToken, PostController.create);
router.get("/list-post", PostController.getListPosts);

export default router;
