const express = require("express");

const { InfoController } = require("../../controller");

const router = express.Router();

router.get("/info", InfoController.info);

module.exports = router;
