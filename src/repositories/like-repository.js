const CrudRepository = require("./crud-repository");
const { Like } = require("../models");


class LikeRepository extends CrudRepository {
    constructor(){
        super(Like);
    }

    async toggleLike(data){
        const like = await Like.findOne({
            where: {
                userId : data.userId,
                postId : data.postId,
            }
        });
        if(like){
            await like.destroy();
            return false;
        }else{
            await Like.create(data);
            return true;
        }
    }

    
}

module.exports = LikeRepository;