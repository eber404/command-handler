import { Command } from '@/application/usecases/command'
import { Query } from '@/application/usecases/query'

export interface ControllerOutput {
  status: number
  data?: any
  message?: string
}

export interface ControllerDependencies {
  usecase: Command | Query
}

export class Controller {
  protected response!: ControllerOutput

  constructor(protected deps?: ControllerDependencies) {
    this.deps = deps
    this.attachHandlers()
  }

  public handle(input?: unknown): Promise<ControllerOutput> {
    throw new Error('handle method not implemented.')
  }

  protected buildResponse(response: ControllerOutput) {
    this.response = response
  }

  protected onSuccess<T = unknown>(data?: T) {
    this.buildResponse({ status: 200, data })
  }

  protected onError(message?: string) {
    this.buildResponse({ message, status: 400 })
  }

  protected attachHandlers() {
    if (this.deps?.usecase instanceof Query) return

    this.deps?.usecase.attachHandlers({
      onError: this.onError.bind(this),
      onSuccess: this.onSuccess.bind(this),
    })
  }
}
