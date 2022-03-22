import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { eventsService } from './EventsService'

class TicketsService {
  async getMyTickets(id) {
    const myEventTickets = await dbContext.Tickets.find({ accountId: id }).populate('event')
    return myEventTickets.map(mongooseDocument => {
      const myEventTicket = mongooseDocument.toJSON()
      return {
        ticketId: myEventTicket.id,
        accountId: myEventTicket.accountId,
        ...myEventTicket.event

      }
    })
  }

  async getEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId: eventId }).populate('creator')
    return eventTickets.map(mongooseDocument => {
      const eventTickets = mongooseDocument.toJSON()
      return {
        ticketId: eventTickets.id,
        eventId: eventTickets.eventId,
        ...eventTickets.account

      }
    })
  }

  async create(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    const event = await dbContext.Events.findById(ticket.eventId)
    event.capacity--
    event.save()
    return ticket

  }
}

export const ticketsService = new TicketsService()

