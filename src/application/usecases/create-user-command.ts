import { User } from '@/domain/entities/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { Command } from '@/application/usecases/command'

export class CreateUserCommand extends Command {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  async execute(input: CreateUserInput) {
    const userResult = User.create(input)

    if (userResult.isErr()) {
      return this.handlers.onError(userResult.unwrapErr())
    }

    const user = userResult.unwrap()

    const existentUserOption = await this.userRepository.getByEmail(user.email)

    if (existentUserOption.isSome()) {
      return this.handlers.onError(`Please, use another email address.`)
    }

    await this.userRepository.create(user)

    this.handlers.onSuccess()
  }
}

type CreateUserInput = {
  name: string
  email: string
}
