// Zustand store для управления категориями продуктов
// Включает состояние загрузки, ошибок и кэширование данных
import { create } from "zustand"

import type { Category } from "../types"
import { getCategories } from "../api/products"

interface CategoriesStore {
  categories: Category[]
  loadingCategories: boolean
  errorCategories?: string
  setCategories: (categories: Category[]) => void
  setLoadingCategories: (loadingCategories: boolean) => void
  setErrorCategories: (errorCategories?: string) => void
  loadCategories: () => Promise<void>
  clearCategories: () => void
}

export const useCategoriesStore = create<CategoriesStore>()((set, get) => ({
  categories: [],
  loadingCategories: false,

  setCategories: (categories) =>
    set(() => ({
      categories,
      loadingCategories: false,
    })),

  setLoadingCategories: (loadingCategories) =>
    set(() => ({ loadingCategories })),

  setErrorCategories: (errorCategories) =>
    set(() => ({ errorCategories, loadingCategories: false })),

  // Загрузка категорий с проверкой кэша
  // Предотвращает повторные запросы при наличии данных
  loadCategories: async () => {
    const { categories, loadingCategories } = get()

    if (categories.length === 0 && !loadingCategories) {
      set({ loadingCategories: true })

      try {
        const fetchedCategories = await getCategories()
        set({
          categories: fetchedCategories,
          loadingCategories: false,
        })
      } catch (error) {
        set({
          errorCategories:
            error instanceof Error ? error.message : "Ошибка загрузки",
          loadingCategories: false,
        })
      }
    }
  },

  clearCategories: () => {
    set({ categories: [] })
  },
}))
