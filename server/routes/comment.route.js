import express from "express";
import { CommentController } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express();

router.post("/create", verifyToken, CommentController.create);
router.get("/getPostComment/:postId", CommentController.getGetPostComment)
router.put('/likeComment/:commentId', verifyToken, CommentController.likeComment)
router.put('/editComment/:commentId', verifyToken, CommentController.editComment)
router.delete('/deleteComment/:commentId', verifyToken, CommentController.deleteComment)

export default router;
