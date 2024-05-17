const { UserRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const userRepository = new UserRepository();
const { Auth } = require("../utils/common");



async function createUser(data){
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user = await userRepository.findUser(data.email);
        if(!user){
            throw new AppError("No such user found with this email or username" , StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.passwordCheck(data.password,user.password);
        if(!passwordMatch){
            throw new AppError("Invalid Password",StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({id: user.id, email: user.email, name : user.name});
        return jwt;
    } catch (error) {
        if(error instanceof AppError)
        {
            throw error;
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError("Missing JWT token", StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if(!user){
            throw new AppError("No User found", StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError("JWT token expired", StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllUser(){
    try {
        console.log("In service");
        const users = await userRepository.getAllUser();

        return users;
    } catch (error) {
        throw new AppError("Cannot get all users", StatusCodes.INTERNAL_SERVER_ERROR);
    }
 
}

async function getProfile(userId){
    try {
        const users = await userRepository.getProfile(userId);
        return users;
    } catch (error) {
        throw new AppError("Cannot get all users", StatusCodes.INTERNAL_SERVER_ERROR);
    }
 
}


module.exports = {
    createUser,
    signin,
    isAuthenticated,
    getAllUser,
    getProfile,


};