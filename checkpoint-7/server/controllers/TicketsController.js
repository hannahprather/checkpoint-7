

import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from "../db/DbContext"
import { ticketsService } from '../services/TicketsServices'
import BaseController from '../utils/BaseController'
import { BadRequest } from "../utils/Errors"

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.create(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await ticketsService.delete(req.params.id, req.userInfo.id)
      return res.send('ticket deleted')
    } catch (error) {
      next(error)
    }

  }


}