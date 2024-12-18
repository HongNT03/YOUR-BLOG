import Comment from "../model/comment.modal.js";
import Post from "../model/post.model.js";
import { errorhandler } from "../utils/error.js";

const create = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorhandler(403, "You are not allow to create this comment")
      );
    }
    const postExist = await Post.findById(postId);
    if (!postExist) {
      returnnext(errorhandler(404, "Post not found"));
    }
    const newComment = new Comment({ content, postId, userId });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const CommentController = { create };
