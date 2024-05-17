const { LikeService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse} = require("../utils/common");

async function toggleLike(req,res){
    try {
        const response = await LikeService.toggleLike(req.body);
        SuccessResponse.data = response;
        if(response === true)
            SuccessResponse.message = "Post liked successfully";
        else
            SuccessResponse.message = "Post unliked successfully";
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
    toggleLike,
};