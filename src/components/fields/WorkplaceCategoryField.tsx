// Компонент поля для выбора категории места работы
// Включает состояния загрузки, ошибок и retry функциональность
import type { FC } from "react"
import type { Category } from "../../types"

interface WorkplaceCategoryFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
  categories: Category[]
  loadingCategories: boolean
  errorCategories?: string
  onRetry: () => void
}

const WorkplaceCategoryField: FC<WorkplaceCategoryFieldProps> = ({
  value,
  onChange,
  error,
  categories,
  loadingCategories,
  errorCategories,
  onRetry,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="workplaceCategory" className="form-label">
        Место работы <span className="text-danger">*</span>
      </label>

      {loadingCategories ? (
        <div className="d-flex align-items-center gap-2">
          <div
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          />
          <span>Загрузка категорий...</span>
        </div>
      ) : errorCategories ? (
        <div className="alert alert-danger" role="alert">
          <div className="d-flex justify-content-between align-items-center">
            <span>{errorCategories}</span>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={onRetry}
              tabIndex={0}
            >
              Повторить
            </button>
          </div>
        </div>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="workplaceCategory"
          name="workplaceCategory"
          className={`form-select ${error ? "is-invalid" : ""}`}
          aria-label="Место работы"
          aria-describedby={error ? "workplaceCategory-error" : undefined}
          aria-invalid={error ? "true" : "false"}
          required
          tabIndex={0}
        >
          <option value="">Выберите место работы</option>
          {categories.map((category: Category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}

      {error && (
        <div
          id="workplaceCategory-error"
          className="invalid-feedback"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

export default WorkplaceCategoryField
