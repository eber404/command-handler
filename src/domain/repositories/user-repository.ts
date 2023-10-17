import { Option } from 'oxide.ts'
import { User } from '@/domain/entities/user'

export interface UserRepository {
  create(user: User): Promise<void>
  getByEmail(email: string): Promise<Option<User>>
}
