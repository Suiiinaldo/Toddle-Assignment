const { PostService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { FileConfig } = require("../config");
const { SuccessResponse, ErrorResponse} = require("../utils/common");

async function createPost(req,res){
    const singleUploader = FileConfig.upload.single('image');
    const userId = req.body.userId;
    try {
        singleUploader(req,res,async function(err,data) {
            if(err){
                ErrorResponse.message = "Image Upload Failed";
                ErrorResponse.error = err;
                return res
                        .status(StatusCodes.BAD_REQUEST)
                        .json(ErrorResponse);
            }
            const payload = {...req.body};
            if(req.file){
                payload.image = req.file.location;
            }
            payload.userId = userId;
            const response = await PostService.createPost(payload);
            SuccessResponse.data = response;
            return res
                    .status(StatusCodes.CREATED)
                    .json(SuccessResponse);
        });
         
    } catch (error) {
        ErrorResponse.error = error;
        res
            .status(error.statusCodes)
            .json(ErrorResponse);
    }
}

async function getPosts(req,res){
    try {
        const response = await PostService.getPosts();
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Something went wrong while fetching posts";
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function getPost(req,res){
    try {
        const response = await PostService.getPost(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Something went wrong while fetching the post";
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function deletePost(req,res){
    try {
        const response = await PostService.deletePost(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Something went wrong while deleting the post";
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    deletePost,
    
};