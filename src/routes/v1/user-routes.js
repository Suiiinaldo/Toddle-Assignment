const express = require("express");

const router = express.Router();

const { UserController } = require("../../controller");
const { AuthRequestMiddlewares } = require("../../middlewares");


router.post("/signup",
            AuthRequestMiddlewares.validateAuthRequestSignUp,
            UserController.signup);

router.post("/signin",
            AuthRequestMiddlewares.validateAuthRequestSignIn,
            UserController.signin);


module.exports = router;