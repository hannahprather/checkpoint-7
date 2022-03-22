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
    const event = await dbContext.Events.findById(id)
    if (event.creatorId.toString() !== userId) {
      throw new BadRequest('not your event dog!')
    }
    event.isCanceled = true
    const updated = await dbContext.Events.findByIdAndUpdate(id, event)
    return updated
  }

  async update(editedEvent) {
    const foundEvent = await this.getOne(editedEvent.id)
    if (foundEvent.isCanceled) {
      throw new BadRequest('event is canceled yo!')
    }
    if (foundEvent.creatorId.toString() !== editedEvent.creatorId) {
      throw new BadRequest('Unauthorized to edite')
    }
    delete editedEvent.isCanceled
    foundEvent.description = editedEvent.description || foundEvent.description
    foundEvent.name = editedEvent.name || foundEvent.name
    await foundEvent.save()
    return foundEvent
  }

  async attendEvent(userId) {
    const user = await dbContext.Events.findById
  }

}
export const eventsService = new EventsService()