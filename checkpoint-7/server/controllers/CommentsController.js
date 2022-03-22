import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"

import BaseController from '../utils/BaseController'


export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
    // .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const comments = await commentsService.getAll(req.params.projectId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const create = await commentsService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await commentsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }


}