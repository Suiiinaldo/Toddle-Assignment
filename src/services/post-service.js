const { PostRepository, UserRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const userRepository = new UserRepository();
const postRepository = new PostRepository();


async function createPost(data){
    try {
        const post = await postRepository.create(data);
        return post;
    } catch (error) {
        throw new AppError("Something went wrong while creating the post", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPosts(){
    try {
        const posts = await postRepository.getPosts();
        return posts;
    } catch (error) {
        throw new AppError("Something went wrong while fetching all post", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPost(id){
    try {
        const posts = await postRepository.getPost(id);
        return posts;
    } catch (error) {
        throw new AppError("Something went wrong while fetching the post", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deletePost(id){
    try {
        const response = await postRepository.destroy(id);
        return response;
    } catch (error) {
        throw new AppError("Something went wrong while deleting the post", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFeed(userId){
    try {
        console.log("Inside getFeed " + userId);
        const user = await userRepository.getProfile(userId);
        const followees = user.dataValues.Followees;
        // Extract followees' ids
        const followeeIds = followees.map(followee => followee.dataValues.id);
        followeeIds.push(userId);
        const feed = await postRepository.getFeed(followeeIds);
        console.log(followeeIds);
        return feed;
    } catch (error) {
        console.log(error);
        throw new AppError("Something went wrong while fetching the feed", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createPost,
    getPosts,
    getPost,
    deletePost,
    getFeed,
}