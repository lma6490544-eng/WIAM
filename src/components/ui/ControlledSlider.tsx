// react-hook-form - библиотека для управления формами
// Выбрана из-за минимальных ререндеров и простой интеграции с валидацией
import { useController, type Control } from "react-hook-form"

// rc-slider - компонент слайдера с хорошей accessibility поддержкой
// Выбран вместо нативного input[type="range"] из-за лучшего контроля стилизации
// и встроенной поддержки клавиатурной навигации
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

import { type Step3FormData } from "../../schemas/step3Schema"

interface ControlledSliderProps {
  name: "amount" | "term"
  control: Control<Step3FormData>
  min: number
  max: number
  step: number
  label: string
  unit?: string
}

const ControlledSlider = ({
  name,
  control,
  min,
  max,
  step,
  label,
  unit = "",
}: ControlledSliderProps) => {
  // useController - хук для интеграции кастомных компонентов с react-hook-form
  // Обеспечивает правильную работу с валидацией и состоянием формы
  // Исключает ререндер родителя
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  const handleChange = (val: number | number[]) => {
    if (typeof val === "number") {
      onChange(val)
    }
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <div className="d-flex align-items-center gap-3">
        <div className="flex-grow-1">
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            aria-label={label}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            tabIndex={0}
          />
        </div>
        <div className="text-nowrap fw-bold">
          {value}
          {unit}
        </div>
      </div>
      <div className="d-flex justify-content-between mt-1 text-muted small">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  )
}

export default ControlledSlider
