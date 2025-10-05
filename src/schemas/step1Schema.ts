// Zod - библиотека для валидации схем
// Выбрана из-за TS поддержки, простого API и интеграции с react-hook-form
import { z } from "zod"

export const step1Schema = z.object({
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .regex(/^0\d{2}\s\d{3}\s\d{3}$/, "Формат: 0XX XXX XXX"),
  firstName: z
    .string()
    .trim()
    .min(1, "Укажите имя")
    .regex(/^[A-Za-zА-Яа-яЁё-]+$/, "Только буквы"),
  lastName: z
    .string()
    .trim()
    .min(1, "Укажите фамилию")
    .regex(/^[A-Za-zА-Яа-яЁё-]+$/, "Только буквы"),
  gender: z.enum(["male", "female"], {
    message: "Выберите пол",
  }),
})

// Автоматическая генерация TS типов из Zod схемы
export type Step1FormData = z.infer<typeof step1Schema>
