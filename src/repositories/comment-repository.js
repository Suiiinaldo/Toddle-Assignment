const CrudRepository = require("./crud-repository");
const { Comment } = require("../models");


class CommentRepository extends CrudRepository {
    constructor(){
        super(Comment);
    }
    async updateComment(content,id){
        try {
            const comment = await Comment.update({
                content: content,
            },{
                where: {
                    id: id,
                }
            });
            return comment;
        } catch (error) {
            throw new AppError('Cannot update the comment',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = CommentRepository;