const { CommentRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const commentRepository = new CommentRepository();



async function createComment(data){
    try {
        const comment = await commentRepository.create(data);
        return comment;
    } catch (error) {
        throw new AppError('Cannot create the comment',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateComment(content, id){
    try {
        const commnet = await commentRepository.updateComment(content,id);
        return commnet;
    } catch (error) {
        throw new AppError('Cannot update the comment',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteComment(id){
    try {
        const commnet = await commentRepository.destroy(id);
        return commnet;
    } catch (error) {
        throw new AppError('Cannot update the comment',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getComments(){
    try {
        const comments = await commentRepository.getAll();
        return comments;
    } catch (error) {
        throw new AppError('Cannot get the comments',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getComment(id){
    try {
        const comment = await commentRepository.get(id);
        return comment;
    } catch (error) {
        throw new AppError('Cannot get the comment',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
    getComment
};