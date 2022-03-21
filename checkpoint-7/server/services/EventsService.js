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
      throw new BadRequest('not your event dog!')
    }
    event.isCanceled = true
    const updated = await dbContext.Events.findByIdAndUpdate(id, event)
    return updated
  }

  async update(id, body) {
    return await dbContext.Events.findByIdAndUpdate(id, body)
  }

}
export const eventsService = new EventsService()