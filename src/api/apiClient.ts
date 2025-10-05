// Axios - HTTP клиент
// Выбран вместо fetch из-за встроенных интерсепторов, автоматической сериализации JSON
// и лучшей обработки ошибок с типизацией
import axios, { AxiosError } from "axios"

import { ApiError, NetworkError, TimeoutError, ServerError } from "./errors"

// Создаем настроенный экземпляр Axios с базовыми параметрами
const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000, // 10 секунд таймаут для предотвращения зависания
  headers: {
    "Content-Type": "application/json",
  },
})

// Интерсептор для централизованной обработки ошибок
// Преобразует Axios ошибки в кастомные классы для лучшей обработки
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new TimeoutError("Превышено время ожидания", error))
    }

    if (!error.response) {
      return Promise.reject(new NetworkError("Ошибка сети", error))
    }

    const { status, data } = error.response
    const message =
      (data as { message?: string })?.message ||
      error.message ||
      "Неизвестная ошибка"

    if (status >= 500) {
      return Promise.reject(new ServerError(message, status, error))
    }

    return Promise.reject(new ApiError(message, status, error))
  }
)

export default apiClient
