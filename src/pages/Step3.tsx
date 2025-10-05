// Страница третьего шага - параметры займа
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useFormStore } from "../store/formStore"
import StepLayout from "../components/forms/StepLayout"
import Step3Form from "../components/forms/Step3Form"

const Step3 = () => {
  const navigate = useNavigate()
  const { isStep1Completed, isStep2Completed } = useFormStore()

  useEffect(() => {
    if (!isStep1Completed()) {
      navigate("/step1", { replace: true })
    } else if (!isStep2Completed()) {
      navigate("/step2", { replace: true })
    }
  }, [navigate, isStep1Completed, isStep2Completed])

  const handleSubmitForm = () => {
    navigate("/")
  }

  const handleBack = () => {
    navigate("/step2")
  }

  if (!isStep1Completed() || !isStep2Completed()) {
    return null
  }

  return (
    <StepLayout title="Шаг 3: Параметры займа">
      <Step3Form onSubmit={handleSubmitForm} onBack={handleBack} />
    </StepLayout>
  )
}

export default Step3
