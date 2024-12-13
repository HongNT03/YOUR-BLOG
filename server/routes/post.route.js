import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { PostController } from "../controllers/post.controller.js";

const router = express();

router.post("/create", verifyToken, PostController.create);
router.put("/update/:postId/:userId", verifyToken, PostController.update);
router.get("/list-post", PostController.getListPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, PostController.deletePost)

export default router;
