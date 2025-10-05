// Компонент поля для ввода фамилии
import FormField from "../ui/FormField"
import TextInput from "../ui/TextInput"

interface LastNameFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const LastNameField = ({ value, onChange, error }: LastNameFieldProps) => {
  return (
    <FormField id="lastName" label="Фамилия" error={error}>
      <TextInput
        id="lastName"
        name="lastName"
        value={value}
        onChange={onChange}
        placeholder="Введите фамилию"
        error={error}
      />
    </FormField>
  )
}

export default LastNameField
