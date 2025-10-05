// Zod схема для валидации третьего шага формы
import { z } from "zod"

export const step3Schema = z.object({
  amount: z.number(),
  term: z.number(),
})

export type Step3FormData = z.infer<typeof step3Schema>
