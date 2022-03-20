import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService"

class EventsService {
  async getAll() {
    try {
      const res = await api.get('/api/events')
      AppState.events = res.data
    } catch (error) {
      logger.log("get all events error", error)
    }
  }

  // async createEvent() {
  //   try {
  //     const res = await api.get('/api/events')
  //     console.log("EVENTS?: ", res.data);
  //   } catch (error) {
  //     logger.log("get all events error", error)
  //   }
  // }

  // async getById() {
  //   try {
  //     const res = await api.get('/api/events')
  //     console.log("EVENTS?: ", res.data);
  //   } catch (error) {
  //     logger.log("get all events error", error)
  //   }
  // }



}

export const eventsService = new EventsService()