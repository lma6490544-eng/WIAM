// Zustand store для статических опций
import { create } from "zustand"

import type { SelectOption } from "../types"

export const genderOptions: SelectOption[] = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
]

interface OptionsStore {
  genderOptions: SelectOption[]
}

export const useOptionsStore = create<OptionsStore>()(() => ({
  genderOptions,
}))
