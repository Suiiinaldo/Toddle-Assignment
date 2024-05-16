const express = require("express");

const { InfoController } = require("../../controller");

const router = express.Router();

const UserRoutes = require("./user-routes");


router.get("/info", InfoController.info);

router.use("/user",UserRoutes);


module.exports = router;
