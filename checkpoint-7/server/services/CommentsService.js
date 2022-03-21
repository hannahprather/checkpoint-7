import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from "../utils/Errors"
class CommentsService {

  async getAll(id) {
    const comment = await dbContext.Comments.find({ eventId: id }).populate('creator')
    return comment

  }

  async create(newComment) {
    const comment = await dbContext.Comments.create(newComment)


    await comment.populate('creator')
    return comment
  }





  async remove(id, userId) {
    const comment = await dbContext.Comments.findById(id)
    if (comment.creatorId.toString() !== userId) {
      throw new BadRequest('bruhhhh not your comment!')
    }
    await dbContext.Comments.findOneAndRemove({ _id: id })
  }


}
export const commentsService = new CommentsService()