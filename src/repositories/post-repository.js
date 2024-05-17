const CrudRepository = require("./crud-repository");
const { Post, User } = require("../models");
const { Sequelize } = require("sequelize");


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
                        required : true,
                        attributes: ["id","name","email","username"],
                        on : {
                            col1: Sequelize.where(Sequelize.col("Post.userId"), "=", Sequelize.col("User.id")),
                        },
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
                        on : {
                            col1: Sequelize.where(Sequelize.col("Post.userId"), "=", Sequelize.col("User.id")),
                        },
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