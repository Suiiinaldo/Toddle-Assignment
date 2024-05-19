const CrudRepository = require("./crud-repository");
const { Post, User, Like, Comment } = require("../models");
const { Sequelize } = require("sequelize");
const { Op } = Sequelize;

class PostRepository extends CrudRepository {
    constructor(){
        super(Post);
    }
    async getPosts(){
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        // required : true,
                        attributes: ["id","name","email","username"],
                    },
                    {
                        model: Like,
                        // required: true,
                        attributes: ["id","userId"],
                    },
                    {
                        model: Comment,
                        // required: true,
                        attributes: ["id","userId","content"],
                    }
                ]
            });
            return posts;
        } catch (error) {
            console.log(error);
            throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getPost(data){
        try {
            const posts = await Post.findAll({
                where: {
                    id : data,
                },
                include: [
                    {
                        model: User,
                        required : true,
                        attributes: ["id","name","email","username"],
                    },
                    {
                        model: Like,
                        // required: true,
                        attributes: ["id","userId"],
                    },
                    {
                        model: Comment,
                        // required: true,
                        attributes: ["id","userId","content"],
                    }
                ]
            });
            return posts;
        } catch (error) {
            console.log(error);
            throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getFeed(data){
        try {
            const posts = await Post.findAll({
                where: {
                    id : {
                        [Op.in]: data,
                    }
                },
                include: [
                    {
                        model: User,
                        required : true,
                        attributes: ["id","name","email","username"],
                    },
                    {
                        model: Like,
                        // required: true,
                        attributes: ["id","userId"],
                    },
                    {
                        model: Comment,
                        // required: true,
                        attributes: ["id","userId","content"],
                    }
                ]
            });
            return posts;
        } catch (error) {
            console.log(error);
            throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = PostRepository;