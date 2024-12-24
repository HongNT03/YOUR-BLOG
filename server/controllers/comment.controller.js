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

const getGetPostComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorhandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorhandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorhandler(403, "You not allow to edit this comment"));
    }
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorhandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorhandler(403, "You not allow to edit this comment"));
    }
    await Comment.findByIdAndDelete(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(`${req.params.commentId} 's Comment has been deleted`);
  } catch (error) {
    next(error);
  }
};

const getListComment = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorhandler(403, "Unauthorized"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate("userId")
      .populate("postId");
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

export const CommentController = {
  create,
  getGetPostComment,
  likeComment,
  editComment,
  deleteComment,
  getListComment,
};
