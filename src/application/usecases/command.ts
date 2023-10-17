export interface CommandHandlers {
  onSuccess: <T = unknown>(data?: T) => void
  onError: (message: string) => void
}

export class Command {
  protected handlers!: CommandHandlers

  public async execute(input?: unknown) {
    throw new Error('execute method not implemented.')
  }

  public attachHandlers(handlers: CommandHandlers) {
    this.handlers = handlers
  }
}
