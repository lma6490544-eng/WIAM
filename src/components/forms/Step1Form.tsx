import { useForm } from "react-hook-form"

// @hookform/resolvers - react-hook-form с различными валидационными библиотеками
// Работает в связке с Zod схемами
import { zodResolver } from "@hookform/resolvers/zod"

import { useAppStore } from "../../store/useAppStore"

import PhoneInput from "../ui/PhoneInput"
import Button from "../ui/Button"

import { step1Schema, type Step1FormData } from "../../schemas/step1Schema"
import FirstNameField from "../fields/FirstNameField"
import GenderField from "../fields/GenderField"
import LastNameField from "../fields/LastNameField"
import type { FC } from "react"

interface Step1FormProps {
  onSubmit: () => void
}

const Step1Form: FC<Step1FormProps> = ({ onSubmit }) => {
  const { form, setPersonal } = useAppStore()

  // react-hook-form с zodResolver для автоматической валидации
  const { handleSubmit, formState, watch, setValue } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: form.personal,
  })

  const { errors } = formState

  const handleFormSubmit = (data: Step1FormData) => {
    setPersonal({
      phone: data.phone,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      gender: data.gender,
    })
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <PhoneInput
        value={watch("phone")}
        onChange={(val) => setValue("phone", val, { shouldValidate: true })}
        error={errors.phone?.message}
      />

      <FirstNameField
        value={watch("firstName")}
        onChange={(val) => setValue("firstName", val, { shouldValidate: true })}
        error={errors.firstName?.message}
      />

      <LastNameField
        value={watch("lastName")}
        onChange={(val) => setValue("lastName", val, { shouldValidate: true })}
        error={errors.lastName?.message}
      />

      <GenderField
        value={watch("gender")}
        onChange={(val) =>
          setValue("gender", val, {
            shouldValidate: true,
          })
        }
        error={errors.gender?.message}
      />

      <Button type="submit" variant="primary" size="lg">
        Далее
      </Button>
    </form>
  )
}

export default Step1Form
