import { z } from 'zod'

export const emailSchema = z.string().email()

export type Email = z.output<typeof emailSchema>
