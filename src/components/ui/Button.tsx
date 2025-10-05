// Переиспользуемый компонент кнопки с различными вариантами
// Поддерживает состояния загрузки и accessibility
import type { FC, ReactNode } from "react"

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "success" | "outline-secondary"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
  tabIndex?: number
}

const Button: FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  children,
  className = "",
  tabIndex = 0,
}) => {
  const baseClasses = "btn"
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    "outline-secondary": "btn-outline-secondary",
  }
  const sizeClasses = {
    sm: "",
    md: "",
    lg: "btn-lg",
  }

  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
          />
          Отправка...
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
