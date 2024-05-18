const CrudRepository = require("./crud-repository");
const { User, Like, Comment, Post } = require("../models");
const { Op, or } = require("sequelize");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");


class UserRepository extends CrudRepository {
    constructor(){
        super(User);
    }

    async findUser(email){
        const user = await User.findOne({
            where:{
                [Op.or] :[
                    {
                        email : {
                            [Op.eq] : email
                        }
                    },
                    {
                        username : {
                            [Op.eq] : email
                        }
                    }
                ]
            }
        });
        return user;

    }

    async getAllUser(){
        try {
            const users = await User.findAll({
                include:[
                    {
                        model: Post,
                        // required: true,
                        attributes: ["id","content","image"],
                    },
                    {
                        model: Like,
                        // required: true,
                        attributes: ["id","postId"],
                    },
                    {
                        model: Comment,
                        // required: true,
                        attributes: ["id","postId","content"],
                    },
                    {
                        model: User,
                        as: 'Followers',
                        attributes: ["id","name","username","email"],
                        through: {
                          attributes: [] // Exclude the junction table attributes
                        }
                      },
                      {
                        model: User,
                        as: 'Followees',
                        attributes: ["id","name","username","email"],
                        through: {
                          attributes: [] // Exclude the junction table attributes
                        }
                      }
                    
                ]
            });
            return users;
        } catch (error) {
            throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getProfile(id){
        try{
            const users = await User.findOne({
                where: {
                    id : id,
                },
                include:[
                    {
                        model: Post,
                        // required: true,
                        attributes: ["id","content","image"],
                    },
                    {
                        model: Like,
                        // required: true,
                        attributes: ["id","postId"],
                    },
                    {
                        model: Comment,
                        // required: true,
                        attributes: ["id","postId","content"],
                    }
                    
                ]
            });
            return users;
        }
        catch(error){
            throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }


}

module.exports = UserRepository;