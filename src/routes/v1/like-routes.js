const express = require("express");

const router = express.Router();

const { LikeController } = require("../../controller");
const { AuthRequestMiddlewares } = require("../../middlewares");


router.post("/toggle",
            AuthRequestMiddlewares.checkAuth,
            LikeController.toggleLike);

module.exports = router;