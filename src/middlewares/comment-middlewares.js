const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { PostService } = require("../services");

async function validateCommentable(req,res,next){
    const post = await PostService.getPost(req.body.postId);
    if(post[0].dataValues.commentable === false){
        ErrorResponse.message = "Commenting is not allowed on this post";
        ErrorResponse.error = new AppError([ "Commenting is not allowed on this post" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCommentable,
    
}