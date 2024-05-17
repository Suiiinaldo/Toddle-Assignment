const { LikeRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const likeRepository = new LikeRepository();



async function toggleLike(data){
    try {
        const like = await likeRepository.toggleLike(data);
        return like;
    } catch (error) {
        throw new AppError('Cannot like/unlike the post',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    toggleLike,
};