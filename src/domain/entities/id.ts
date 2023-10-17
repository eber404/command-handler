import { createId } from '@paralleldrive/cuid2'
import { z } from 'zod'

export const idSchema = z
  .string()
  .cuid2()
  .optional()
  .transform((id) => (id ? id : createId()))

export type Id = z.output<typeof idSchema>
