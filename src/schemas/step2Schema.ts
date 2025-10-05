// Zod схема для валидации второго шага формы
import { z } from "zod"

export const step2Schema = z.object({
  workplaceCategory: z.string().min(1, "Выберите место работы"),
  address: z.string().trim().min(3, "Адрес должен содержать минимум 3 символа"),
})

export type Step2FormData = z.infer<typeof step2Schema>
