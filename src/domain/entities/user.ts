import { z } from 'zod'
import { Result, Ok, Err } from 'oxide.ts'

import { Id, idSchema } from '@/domain/entities/id'
import { Email } from '@/domain/entities/email'

const userSchema = z.object({
  id: idSchema,
  name: z.string().min(3),
  email: z.string().email(),
})

type UserInput = z.input<typeof userSchema>
type UserProps = z.infer<typeof userSchema>

export class User {
  public readonly id: Id
  public readonly name: string
  public readonly email: Email

  private constructor(input: UserProps) {
    this.id = input.id
    this.name = input.name
    this.email = input.email
  }

  static create(input: UserInput): Result<User, string> {
    const validation = userSchema.safeParse(input)

    if (!validation.success) {
      return Err(
        validation.error.issues
          .map((issue) => `[${issue.path}]: ${issue.message}`.toLowerCase())
          .join(', ')
      )
    }

    return Ok(new User(validation.data))
  }
}
