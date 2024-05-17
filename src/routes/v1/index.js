const express = require("express");

const { InfoController } = require("../../controller");

const router = express.Router();

const UserRoutes = require("./user-routes");
const PostRoutes = require("./post-routes");
const LikeRoutes = require("./like-routes");


router.get("/info", InfoController.info);

router.use("/user",UserRoutes);

router.use("/post",PostRoutes);

router.use("/like",LikeRoutes);


module.exports = router;
