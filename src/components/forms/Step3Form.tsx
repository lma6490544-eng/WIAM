// Форма третьего шага - параметры займа
// Включает отправку заявки и отображение результата
import { useState, type FC } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAppStore } from "../../store/useAppStore"

import { addProduct } from "../../api/products"

import ControlledSlider from "../ui/ControlledSlider"
import ResultModal from "./ResultModal"
import Button from "../ui/Button"

import { step3Schema, type Step3FormData } from "../../schemas/step3Schema"

interface Step3FormProps {
  onSubmit: () => void
  onBack: () => void
}

const Step3Form: FC<Step3FormProps> = ({ onSubmit, onBack }) => {
  const { form, setLoan } = useAppStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { handleSubmit, control } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      amount: form.loan.amount,
      term: form.loan.term,
    },
  })

  const handleFormSubmit = async (data: Step3FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      setLoan({
        amount: data.amount,
        term: data.term,
      })

      const title = `${form.personal.firstName} ${form.personal.lastName}`
      await addProduct(title)

      setShowModal(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Ошибка отправки заявки"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    onSubmit()
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <ControlledSlider
          name="amount"
          control={control}
          min={200}
          max={1000}
          step={100}
          label="Сумма займа"
          unit="$"
        />

        <ControlledSlider
          name="term"
          control={control}
          min={10}
          max={30}
          step={1}
          label="Срок займа"
          unit=" дней"
        />

        {submitError && (
          <div className="alert alert-danger" role="alert">
            {submitError}
          </div>
        )}

        <div className="d-grid gap-2 d-md-flex justify-content-md-between">
          <Button
            type="button"
            variant="outline-secondary"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Назад
          </Button>
          <Button
            type="submit"
            variant="success"
            size="lg"
            loading={isSubmitting}
          >
            Подать заявку
          </Button>
        </div>
      </form>

      <ResultModal
        isOpen={showModal}
        onClose={handleModalClose}
        personal={form.personal}
        loan={form.loan}
      />
    </>
  )
}

export default Step3Form
