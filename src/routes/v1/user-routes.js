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

router.get("/",
            AuthRequestMiddlewares.checkAuth,
            UserController.getAll);

router.get("/profile",
            AuthRequestMiddlewares.checkAuth,
            UserController.getProfile);

module.exports = router;