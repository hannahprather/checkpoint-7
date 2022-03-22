import { AppState } from "../AppState";
import { router } from "../router";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService"

class EventsService {
  async getAll() {
    try {
      const res = await api.get('/api/events')
      AppState.events = res.data
      console.log(AppState.events)
    } catch (error) {
      logger.log("get all events error", error)
    }
  }

  async getEventById(id) {
    try {
      const res = await api.get(`/api/events/${id}`)
      AppState.activeEvent = res.data
    } catch (error) {
      logger.log("get one event error", error)
    }
  }

  async createEvent(event) {
    try {
      const res = await api.post('/api/events', event)
      AppState.events.push(res.data)
      return res.data
    } catch (error) {
      logger.log("get all events error", error)
    }
  }
  async editEvent(editedEvent) {
    try {
      await api.put('/api/events/' + editedEvent.id, editedEvent)
      // this.getAll()
      // this.getEventById(id)
    } catch (error) {
      logger.log("get all events error", error)
    }
  }

  async cancelEvent(id, event) {
    try {
      await api.delete('/api/events/' + id)
      event.isCanceled = true
      AppState.activeEvent = event
      this.getAll()
      this.getEventById(id)
    } catch (error) {
      logger.log(error)
    }
  }
  async attendEvent(id) {
    const body = {}
    body.eventId = id
    const ticketedEvent = await api.post('api/tickets', body)

    AppState.tickets.unshift(ticketedEvent.data)
    const activeEvent = AppState.activeEvent
    activeEvent.capacity--
    AppState.activeEvent = activeEvent

  }
  async createComment(body) {
    body.eventId = AppState.activeEvent.id
    const res = await api.post('/api/comments', body)
    logger.log("new commmmmeeennnttt", res.data)
    AppState.comments.unshift(res.data)
  }

  async getEventComments(eventId) {
    const res = await api.getapi.get(`/api/events/${eventId}/comments`)
    AppState.comments = res.data
  }
  async deleteComments(commentId) {
    await api.delete(`/api/comments/${commentId}`)
    const deletedComment = AppState.comments.fileter(c => c.id !== commentId)
    AppState.comments = deletedComment
  }

  async getTickets(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    AppState.tickets = res.data
  }

  async getMyTickets(userId) {
    const res = await api.get('account/tickets')
    AppState.getMyTickets = res.data
  }

}

export const eventsService = new EventsService()