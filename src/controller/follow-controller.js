const { FollowService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse} = require("../utils/common");

async function toggleFollow(req,res){
    try {
        console.log("Inside Controller");
        // console.log(req);
        const response = await FollowService.toggleFollow({
            followerId: req.body.userId,
            followeeId: req.params.id,
        });
        // const response = true;
        SuccessResponse.data = response;
        if(response === true)
            SuccessResponse.message = "User followed successfully";
        else
            SuccessResponse.message = "User unfollowed successfully";
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
    toggleFollow,
};