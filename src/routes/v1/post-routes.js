const express = require("express");
const { PostController } = require("../../controller");
const { AuthRequestMiddlewares } = require("../../middlewares");
const router = express.Router();

router.post("/", 
            AuthRequestMiddlewares.checkAuth, 
            PostController.createPost);

router.get("/", 
            AuthRequestMiddlewares.checkAuth,
            PostController.getPosts);

router.get("/:id", 
            AuthRequestMiddlewares.checkAuth,
            PostController.getPost);
        
router.delete("/:id",
            AuthRequestMiddlewares.checkAuth,
            PostController.deletePost);

module.exports = router;
