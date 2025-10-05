import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useFormStore } from "../store/formStore"
import StepLayout from "../components/forms/StepLayout"
import Step2Form from "../components/forms/Step2Form"

const Step2 = () => {
  const navigate = useNavigate()
  const { isStep1Completed } = useFormStore()

  // Защита от прямого доступа к шагу без заполнения предыдущих данных
  // Используем replace: true чтобы предотвратить возврат к невалидному шагу
  useEffect(() => {
    if (!isStep1Completed()) {
      navigate("/step1", { replace: true })
    }
  }, [navigate, isStep1Completed])

  const handleSubmitForm = () => {
    navigate("/step3")
  }

  const handleBack = () => {
    navigate("/step1")
  }

  // Дополнительная защита рендеринга
  if (!isStep1Completed()) {
    return null
  }

  return (
    <StepLayout title="Шаг 2: Адрес и место работы">
      <Step2Form onSubmit={handleSubmitForm} onBack={handleBack} />
    </StepLayout>
  )
}

export default Step2
