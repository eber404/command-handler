import { Some, None, Option } from 'oxide.ts'

import { UserRepository } from '@/domain/repositories/user-repository'
import { User } from '@/domain/entities/user'
import { delay } from '@/infra/utils/delay'
import { users } from '@/infra/data/fake-db'

export interface UserModel {
  id: string
  name: string
  email: string
}
export class FakeUserRepository implements UserRepository {
  private users = users

  async create(user: User): Promise<void> {
    await delay(1)
    this.users.push({ email: user.email, id: user.id!, name: user.name })
    console.log(
      'User has been saved on database:',
      JSON.stringify(user, null, 2)
    )
  }

  async getByEmail(email: string): Promise<Option<User>> {
    await delay(0.5)

    const user = this.users.find((u) => u.email === email)

    if (!user) return None

    return Some(user)
  }
}
