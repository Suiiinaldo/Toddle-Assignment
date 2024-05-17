const { CommentService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse} = require("../utils/common");

async function createComment(req,res){
    try {
        const response = await CommentService.createComment({
            userId: req.body.userId,
            postId: req.body.postId,
            content: req.body.content,
        });
        SuccessResponse.message = "Comment posted successfully";
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
            .status(error.statusCodes)
            .json(ErrorResponse);
    }
}

async function getComments(req,res){
    try {
        const response = await CommentService.getComments();
        SuccessResponse.message = "Fetched all comments successfully";
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
            .status(error.statusCodes)
            .json(ErrorResponse);
    }
}

async function getComment(req,res){
    try {
        const response = await CommentService.getComment(req.params.id);
        SuccessResponse.message = "Fetched the comment successfully";
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
            .status(error.statusCodes)
            .json(ErrorResponse);
    }
}

async function updateComment(req,res){
    try {
        const response = await CommentService.updateComment(req.body.content, req.params.id);
        SuccessResponse.message = "Comment edited successfully";
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
            .status(error.statusCodes)
            .json(ErrorResponse);
    }
}

async function deleteComment(req,res){
    try {
        const response = await CommentService.deleteComment(req.params.id);
        SuccessResponse.message = "Comment deleted successfully";
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res
            .status(error.statusCodes)
            .json(ErrorResponse);
    }
}

module.exports = {
    createComment,
    getComments,
    getComment,
    updateComment,
    deleteComment,

};