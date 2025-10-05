// Базовый компонент текстового ввода с accessibility поддержкой
// Включает обработку клавиатурных событий и ARIA атрибуты
import React, { type FC } from "react"

interface TextInputProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  type?: "text" | "email" | "password"
}

const TextInput: FC<TextInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = true,
  type = "text",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur()
    }
  }

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      required={required}
      className={`form-control ${error ? "is-invalid" : ""}`}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      tabIndex={0}
    />
  )
}

export default TextInput
