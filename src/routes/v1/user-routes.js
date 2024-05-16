const express = require("express");

const router = express.Router();

const { UserController } = require("../../controller");
const { AuthRequestMiddlewares } = require("../../middlewares");


router.post("/signup",
            AuthRequestMiddlewares.validateAuthRequestSignUp,
            UserController.signup);


module.exports = router;