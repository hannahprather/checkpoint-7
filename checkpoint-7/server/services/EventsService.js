import { dbContext } from '../db/DbContext'
import { BadRequest } from "../utils/Errors"
class EventsService {

  async getAll(query = {}) {
    const events = await dbContext.Events.find(query).populate('creator')
    return events
  }

  async getOne(id) {
    const event = await dbContext.Events.findById(id).populate('name')
    if (!event) {
      throw new BadRequest('doesnt exist')
    }
    return event
  }
  async create(body) {
    const event = await dbContext.Events.create(body)
    // await event.populate('creator')
    return event
  }
  async remove(id, userId) {
    const event = await this.getOne(id)
    if (event.creatorId.toString() !== userId) {
      throw new BadRequest('not your project!')
    }

    // await dbContext.Events.findOneAndRemove(id)
    await event.remove()
    return event
  }

}
export const eventsService = new EventsService()