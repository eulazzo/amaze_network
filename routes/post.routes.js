const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.postController");

router.get("/", postController.readPost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/:unlike-post/:id", postController.unlikePost);

// comments
router.post("/comment-post/:id", postController.commentPost);
router.put("/edit-comment-post/:id", postController.editCommentPost);
router.delete("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
