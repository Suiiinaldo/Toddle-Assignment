const express = require("express");

const router = express.Router();

const { FollowController } = require("../../controller");
const { AuthRequestMiddlewares } = require("../../middlewares");


router.post("/toggle/:id",
            AuthRequestMiddlewares.checkAuth,
            FollowController.toggleFollow);

module.exports = router;