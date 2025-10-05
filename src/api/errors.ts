// Кастомные классы ошибок для централизованной обработки
export class ApiError extends Error {
  public statusCode?: number
  public originalError?: unknown

  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message)
    Object.setPrototypeOf(this, ApiError.prototype)
    this.name = "ApiError"
    this.statusCode = statusCode
    this.originalError = originalError
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = "Ошибка сети", originalError?: unknown) {
    super(message, undefined, originalError)
    Object.setPrototypeOf(this, NetworkError.prototype)
    this.name = "NetworkError"
  }
}

export class TimeoutError extends ApiError {
  constructor(
    message: string = "Превышено время ожидания",
    originalError?: unknown
  ) {
    super(message, 408, originalError)
    Object.setPrototypeOf(this, TimeoutError.prototype)
    this.name = "TimeoutError"
  }
}

export class ServerError extends ApiError {
  constructor(
    message: string = "Ошибка сервера",
    statusCode: number = 500,
    originalError?: unknown
  ) {
    super(message, statusCode, originalError)
    Object.setPrototypeOf(this, ServerError.prototype)
    this.name = "ServerError"
  }
}

// Функция для преобразования технических ошибок в понятные пользователю сообщения
export const mapToUserMessage = (
  err: unknown,
  fallback = "Произошла ошибка"
) => {
  if (err instanceof ServerError) return "Ошибка сервера, попробуйте позже"
  if (err instanceof NetworkError) return "Проблемы с подключением к интернету"
  if (err instanceof TimeoutError) return "Сервер не отвечает, попробуйте позже"
  if (err instanceof ApiError) return fallback
  return "Не удалось выполнить запрос"
}
