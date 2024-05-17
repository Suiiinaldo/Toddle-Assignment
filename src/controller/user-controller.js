const { UserService } = require("../services");
const { StatusCodes} = require("http-status-codes");
const { SuccessResponse, ErrorResponse} = require("../utils/common")


/*
 * POST : /signup 
 * req-body : { email : abcd123@gmail.com,
 *              name : ABCD,
 *              password : *******,
 *              username : ABC_123,
 *            }
 */
async function signup(req,res){
    try {
        const user = await UserService.createUser({
            email : req.body.email,
            password : req.body.password,
            username : req.body.username,
            name : req.body.name,
        });
        SuccessResponse.data = user;
        SuccessResponse.message = "User Created Successfully";
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);   
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCodes)
                .json(ErrorResponse);
    }
}


/*
 * POST : /signin 
 * req-body : { email/username : mg@gm.com/ABCD,
 *              password : *******,
 *            }
 */
async function signin(req,res){
    try {
        const user = await UserService.signin({
            email : req.body.email,
            password : req.body.password,
        });
        SuccessResponse.data = user;
        SuccessResponse.message = "User Signed In Successfully";
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);   
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCodes)
                .json(ErrorResponse);
    }
}


module.exports = {
    signup,
    signin
}
