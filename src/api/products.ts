// API функции для работы с DummyJSON
// Централизованная обработка запросов с типизацией
import type { Category } from "../types"
import apiClient from "./apiClient"

import { mapToUserMessage, ApiError } from "./errors"

export interface AddProductRequest {
  title: string
}

export interface AddProductResponse {
  id: number
  title: string
}

// Получение категорий продуктов с кэшированием в store
// Обработка ошибок через кастомные классы ошибок
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<Category[]>("/products/categories")

    if (!response.data) {
      throw new Error("Невалидный формат данных категорий")
    }

    return response.data
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new Error(mapToUserMessage(error, "Ошибка при загрузке категорий"), {
      cause: error,
    })
  }
}

// Отправка заявки с именем пользователя как title
export const addProduct = async (
  title: string
): Promise<AddProductResponse> => {
  try {
    const response = await apiClient.post<AddProductResponse>("/products/add", {
      title,
    })

    if (!response.data) {
      throw new Error("Невалидный ответ от сервера")
    }

    return response.data
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new Error(mapToUserMessage(error, "Ошибка при отправке заявки"), {
      cause: error,
    })
  }
}
