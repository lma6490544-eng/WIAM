// Компонент поля для ввода имени
import FormField from "../ui/FormField"
import TextInput from "../ui/TextInput"

interface FirstNameFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const FirstNameField = ({ value, onChange, error }: FirstNameFieldProps) => {
  return (
    <FormField id="firstName" label="Имя" error={error}>
      <TextInput
        id="firstName"
        name="firstName"
        value={value}
        onChange={onChange}
        placeholder="Введите имя"
        error={error}
      />
    </FormField>
  )
}

export default FirstNameField
