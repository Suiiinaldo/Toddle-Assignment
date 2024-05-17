const express = require("express");

const router = express.Router();

const { CommentController } = require("../../controller");
const { AuthRequestMiddlewares, CommentMiddlewares } = require("../../middlewares");


router.post("/",
            AuthRequestMiddlewares.checkAuth,
            CommentMiddlewares.validateCommentable,
            CommentController.createComment);

router.get("/",
            AuthRequestMiddlewares.checkAuth,
            CommentController.getComments);

router.get("/:id",
            AuthRequestMiddlewares.checkAuth,
            CommentController.getComment);

router.patch("/:id",
            AuthRequestMiddlewares.checkAuth,
            CommentController.updateComment);

router.delete("/:id",
            AuthRequestMiddlewares.checkAuth,
            CommentController.deleteComment
);

module.exports = router;