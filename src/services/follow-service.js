const { FollowRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const followRepository = new FollowRepository();



async function toggleFollow(data){
    try {
        console.log("Inside Service");
        if(data.followerId == data.followeeId){
            throw new AppError('Cannot follow yourself',StatusCodes.BAD_REQUEST);
        }
        const follow = await followRepository.toggleFollow(data);
        return follow;
    } catch (error) {
        throw new AppError('Cannot follow the user',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    toggleFollow,

};