const CrudRepository = require("./crud-repository");
const { Friend } = require("../models");


class FollowRepository extends CrudRepository {
    constructor(){
        super(Friend);
    }
    
    async toggleFollow(data){
        console.log("Inside Repository "+data);
        const follow = await Friend.findOne({
            where: {
                followerId : data.followerId,
                followeeId : data.followeeId,
            }
        });
        console.log(follow);
        if(follow){
            await follow.destroy();
            return false;
        }else{
            await Friend.create(data);
            return true;
        }
    }
}

module.exports = FollowRepository;