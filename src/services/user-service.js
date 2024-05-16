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
        console.log(error);
        throw new AppError('Cannot create a new user',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    console.log("Inside Services");
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
        console.log(error);
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createUser,
    signin,


};