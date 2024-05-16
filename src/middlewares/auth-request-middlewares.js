const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateAuthRequestSignIn(req,res,next){
    if(!req.body.email){
        ErrorResponse.message = "Something went wrong while authenticating";
        ErrorResponse.error = new AppError([ "Email or usernmae not found in the incoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    if(!req.body.password){
        ErrorResponse.message = "Something went wrong while authenticating";
        ErrorResponse.error = new AppError([ "Password not found in the incoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    next();
}

function validateAuthRequestSignUp(req,res,next){
    if(!req.body.email){
        ErrorResponse.message = "Something went wrong while signing in";
        ErrorResponse.error = new AppError([ "Email not found in the incoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    if(!req.body.password){
        ErrorResponse.message = "Something went wrong while signing in";
        ErrorResponse.error = new AppError([ "Password not found in the incoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    if(!req.body.username){
        ErrorResponse.message = "Something went wrong while signing in";
        ErrorResponse.error = new AppError([ "Username not found in the incoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while signing in";
        ErrorResponse.error = new AppError([ "Name not found in the incoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateAuthRequestSignUp,
    validateAuthRequestSignIn
};