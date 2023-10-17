import { Request, Response } from 'express'
import { Controller } from '@/infra/controllers/controller'

export class ExpressAdapter {
  public static adapt(controller: Controller) {
    return async function (req: Request, res: Response) {
      try {
        const input = {
          ...(req.body || {}),
          ...(req.query || {}),
          ...(req.params || {}),
          ...(req.headers || {}),
        }

        const { status, ...body } = await controller.handle(input)

        if (body.data) {
          return res.status(status).json(body.data)
        }

        if (body.message) {
          return res.status(status).json({ message: body.message })
        }

        return res.status(status).send()
      } catch (error) {
        console.log(error)
        return res.status(500).json(error)
      }
    }
  }
}
