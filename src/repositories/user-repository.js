const CrudRepository = require("./crud-repository");
const { User } = require("../models");
const { Op, or } = require("sequelize");


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

}

module.exports = UserRepository;