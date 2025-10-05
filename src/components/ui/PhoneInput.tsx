import React, { type FC } from "react"

// react-imask - библиотека для масок
// Выбрана вместо react-input-mask из-за лучшей совместимости с React 19
import { IMaskInput } from "react-imask"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  id?: string
  name?: string
}

// react-imask chosen for modern phone number formatting compatible with React 19
const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  id = "phone",
  name = "phone",
}) => {
  const handleChange = (value: string) => {
    onChange(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onBlur?.()
    }
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        Телефон <span className="text-danger">*</span>
      </label>
      <IMaskInput
        mask="000 000 000"
        placeholder="0XX XXX XXX"
        value={value}
        onAccept={handleChange}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        id={id}
        name={name}
        type="tel"
        className={`form-control ${error ? "is-invalid" : ""}`}
        aria-label="Номер телефона"
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? "true" : "false"}
        tabIndex={0}
      />
      {error && (
        <div id={`${id}-error`} className="invalid-feedback" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

export default PhoneInput
