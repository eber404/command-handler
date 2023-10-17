import { CreateUserCommand } from '@/application/usecases/create-user-command'
import { CreateUserController } from '@/infra/controllers/create-user-controller'
import { FakeUserRepository } from '@/infra/repositories/fake-user-repository'

export function createUserIoC() {
  const userRepository = new FakeUserRepository()
  const createUserCommand = new CreateUserCommand(userRepository)
  const createUserController = new CreateUserController(createUserCommand)
  return { createUserController }
}
