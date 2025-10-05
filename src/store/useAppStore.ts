// Композитный хук для объединения всех stores
// Обеспечивает единый интерфейс для работы с состоянием приложения
import { useFormStore } from "./formStore"
import { useCategoriesStore } from "./categoriesStore"
import { useOptionsStore } from "./optionsStore"

import type { SelectOption } from "../types"

export const useAppStore = () => {
  const formStore = useFormStore()
  const categoriesStore = useCategoriesStore()
  const optionsStore = useOptionsStore()

  // Трансформация категорий в опции для select компонентов
  const getCategoryOptions = (): SelectOption[] => {
    return categoriesStore.categories.map((category) => ({
      value: category.name,
      label: category.name,
    }))
  }

  return {
    ...formStore,
    ...categoriesStore,
    ...optionsStore,
    getCategoryOptions,
  }
}
