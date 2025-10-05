// Форма второго шага - адрес и место работы
// Включает загрузку категорий и обработку ошибок
import { useEffect } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAppStore } from "../../store/useAppStore"

import WorkplaceCategoryField from "../fields/WorkplaceCategoryField"
import AddressField from "../fields/AddressField"
import Button from "../ui/Button"

import type { FC } from "react"
import { step2Schema, type Step2FormData } from "../../schemas/step2Schema"

interface Step2FormProps {
  onSubmit: () => void
  onBack: () => void
}

const Step2Form: FC<Step2FormProps> = ({ onSubmit, onBack }) => {
  const {
    form,
    categories,
    loadingCategories,
    errorCategories,
    loadCategories,
    clearCategories,
    setWork,
  } = useAppStore()

  const { handleSubmit, formState, watch, setValue } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      workplaceCategory: form.work.workplaceCategory,
      address: form.work.address,
    },
  })

  const { errors } = formState

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const handleRetry = () => {
    clearCategories()
    loadCategories()
  }

  const handleFormSubmit = (data: Step2FormData) => {
    setWork({
      workplaceCategory: data.workplaceCategory,
      address: data.address.trim(),
    })
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <WorkplaceCategoryField
        value={watch("workplaceCategory")}
        onChange={(val) =>
          setValue("workplaceCategory", val, { shouldValidate: true })
        }
        error={errors.workplaceCategory?.message}
        categories={categories}
        loadingCategories={loadingCategories}
        errorCategories={errorCategories}
        onRetry={handleRetry}
      />

      <AddressField
        value={watch("address")}
        onChange={(val) => setValue("address", val, { shouldValidate: true })}
        error={errors.address?.message}
      />

      <div className="d-grid gap-2 d-md-flex justify-content-md-between">
        <Button type="button" variant="outline-secondary" onClick={onBack}>
          Назад
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loadingCategories || !!errorCategories}
        >
          Далее
        </Button>
      </div>
    </form>
  )
}

export default Step2Form
