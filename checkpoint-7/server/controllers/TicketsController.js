

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
      .post('', this.attendEvent)
      .delete('/:ticketId', this.delete)
  }

  async attendEvent(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.attendEvent(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await ticketsService.delete(req.params.ticketId)
      return res.send(deleted)
    } catch (error) {
      next(error)
    }

  }


}