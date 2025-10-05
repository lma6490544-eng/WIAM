// Zustand - простой, легковесный state management
// В небольшом приложении Zustand обеспечивает все необходимые возможности без избыточности
import { create } from "zustand"

// persist middleware для автоматического сохранения в localStorage
// Обеспечивает восстановление данных при перезагрузке страницы
import { persist } from "zustand/middleware"

import { step1Schema, step2Schema } from "../schemas"
import type { AppFormState, Personal, WorkAddress, LoanParams } from "../types"

const initialFormState: AppFormState = {
  personal: {
    phone: "",
    firstName: "",
    lastName: "",
    gender: "male",
  },
  work: {
    workplaceCategory: "",
    address: "",
  },
  loan: {
    amount: 200,
    term: 10,
  },
}

interface FormStore {
  form: AppFormState
  updateForm: <T extends keyof AppFormState>(
    section: T,
    data: Partial<AppFormState[T]>
  ) => void
  setPersonal: (personal: Personal) => void
  setWork: (work: WorkAddress) => void
  setLoan: (loan: LoanParams) => void
  selectPersonal: () => Personal
  selectWork: () => WorkAddress
  selectLoan: () => LoanParams
  // Методы валидации используют Zod схемы для проверки корректности данных
  // обеспечивает единый источник истины
  isStep1Completed: () => boolean
  isStep2Completed: () => boolean
  reset: () => void
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      form: initialFormState,

      updateForm: (section, data) =>
        set((state) => ({
          form: {
            ...state.form,
            [section]: { ...state.form[section], ...data },
          },
        })),

      setPersonal: (personal) => get().updateForm("personal", personal),

      setWork: (work) => get().updateForm("work", work),

      setLoan: (loan) => get().updateForm("loan", loan),

      selectPersonal: () => get().form.personal,

      selectWork: () => get().form.work,

      selectLoan: () => get().form.loan,

      // Валидация через Zod схемы - обеспечивает консистентность с формами
      isStep1Completed: () => {
        const { personal } = get().form
        const result = step1Schema.safeParse(personal)
        return result.success
      },

      isStep2Completed: () => {
        const { work } = get().form
        const result = step2Schema.safeParse(work)
        return result.success
      },

      reset: () =>
        set(() => ({
          form: initialFormState,
        })),
    }),
    {
      name: "form-storage",
      // Сохраняем только данные формы
      partialize: (state) => ({ form: state.form }),
      version: 1,
    }
  )
)
