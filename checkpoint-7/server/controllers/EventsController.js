import { Auth0Provider } from "@bcwdev/auth0provider"
import { eventsService } from "../services/EventsService"
import BaseController from '../utils/BaseController'


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
    // .put('/:id', this.update)
    // .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const events = await eventsService.getAll(req.query)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const project = await eventsService.getOne(req.params.id)
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
      await eventsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
  // async update(req, res, next) {
  //   try {
  //     await eventsService.update(req.params.id, req.userInfo.id)
  //     return res.send('deleted')
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}