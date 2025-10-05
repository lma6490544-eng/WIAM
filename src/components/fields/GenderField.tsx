// Компонент поля для выбора пола
import FormField from "../ui/FormField"
import { useAppStore } from "../../store/useAppStore"
import type { Gender } from "../../types"
import type { FC } from "react"

interface GenderFieldProps {
  value: Gender
  onChange: (value: Gender) => void
  error?: string
}

const GenderField: FC<GenderFieldProps> = ({ value, onChange, error }) => {
  const { genderOptions } = useAppStore()

  return (
    <FormField id="gender" label="Пол" error={error}>
      <select
        id="gender"
        name="gender"
        value={value}
        onChange={(e) => onChange(e.target.value as Gender)}
        className={`form-select ${error ? "is-invalid" : ""}`}
        aria-label="Пол"
        aria-describedby={error ? "gender-error" : undefined}
        aria-invalid={error ? "true" : "false"}
        required
        tabIndex={0}
      >
        <option value="">Выберите пол</option>
        {genderOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}

export default GenderField
