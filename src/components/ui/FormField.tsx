// Переиспользуемый компонент для обертки полей формы
// Обеспечивает единообразное отображение лейблов и ошибок
import React, { type FC } from "react"

interface FormFieldProps {
  id: string
  label: string
  children: React.ReactNode
  error?: string
  required?: boolean
}

const FormField: FC<FormFieldProps> = ({
  id,
  label,
  children,
  error,
  required = true,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    {children}
    {error && (
      <div id={`${id}-error`} className="invalid-feedback" role="alert">
        {error}
      </div>
    )}
  </div>
)

export default FormField
