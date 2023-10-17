import { CreateUserCommand } from '@/application/usecases/create-user-command'
import { Controller } from '@/infra/controllers/controller'

export interface CreateUserControllerInput {
  name: string
  email: string
}

export class CreateUserController extends Controller {
  constructor(command: CreateUserCommand) {
    super({ usecase: command })
  }

  async handle(input: CreateUserControllerInput) {
    await this.deps?.usecase.execute({
      email: input.email,
      name: input.name,
    })

    return this.response
  }

  protected onSuccess(): void {
    this.buildResponse({ status: 201 })
  }

  protected onError(message?: string): void {
    this.buildResponse({
      message,
      status: 422,
    })
  }
}
