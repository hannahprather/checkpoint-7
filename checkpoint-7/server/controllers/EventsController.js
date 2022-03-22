import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsServices"
import BaseController from '../utils/BaseController'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:eventId', this.getOne)
      .get('/:eventId/comments', this.getAllComments)
      .get('/:eventId/tickets', this.getEventTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:eventId', this.update)
      .delete('/:eventId', this.remove)

  }

  async getAll(req, res, next) {
    try {
      const events = await eventsService.getAll(req.query)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async getAllComments(req, res, next) {
    try {
      const comments = await commentsService.getAll(req.params.eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets(req.params.eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const project = await eventsService.getOne(req.params.eventId)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const create = await eventsService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const deleted = await eventsService.remove(req.params.eventId, req.userInfo.id)
      return res.send(deleted)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      res.send(await eventsService.update(req.params.eventId, req.body))
    } catch (error) {
      next(error)
    }
  }



}