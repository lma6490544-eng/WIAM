// Страница первого шага - личные данные
import { useNavigate } from "react-router-dom"

import StepLayout from "../components/forms/StepLayout"
import Step1Form from "../components/forms/Step1Form"

const Step1 = () => {
  const navigate = useNavigate()

  const handleSubmitForm = () => {
    navigate("/step2")
  }

  return (
    <StepLayout title="Шаг 1: Личные данные">
      <Step1Form onSubmit={handleSubmitForm} />
    </StepLayout>
  )
}

export default Step1
