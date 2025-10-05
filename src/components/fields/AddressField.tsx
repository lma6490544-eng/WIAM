// Компонент поля для ввода адреса
// Использует FormField для единообразного отображения
import FormField from "../ui/FormField"
import TextInput from "../ui/TextInput"

interface AddressFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const AddressField = ({ value, onChange, error }: AddressFieldProps) => {
  return (
    <FormField id="address" label="Адрес проживания" error={error}>
      <TextInput
        id="address"
        name="address"
        value={value}
        onChange={onChange}
        placeholder="Введите ваш адрес"
        error={error}
      />
    </FormField>
  )
}

export default AddressField
