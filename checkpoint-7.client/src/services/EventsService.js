import { AppState } from "../AppState";
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

  async deleteEvent(id) {
    try {
      const res = await api.delete(`/api/events/${id}`)
    } catch (error) {
      logger.log("get one event error", error)
    }
  }

  async createEvent(event) {
    try {
      const res = await api.post('/api/events', event)
      AppState.events.push(res.data)
      this.getAll()
    } catch (error) {
      logger.log("get all events error", error)
    }
  }
  async editEvent(id, editedEvent) {
    try {
      await api.put('/api/events/' + id, editedEvent)
      this.getAll()
      this.getEventById(id)
    } catch (error) {
      logger.log("get all events error", error)
    }
  }

  async cancelEvent(id, event) {
    try {
      await api.delete('/api/event/' + id)
      event.isCanceled = true
      AppState.activeEvent = event
      this.getAll()
      this.getEventById(id)
    } catch (error) {
      logger.log(error)
    }
  }


}

export const eventsService = new EventsService()