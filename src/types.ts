// TypeScript для статической типизации. Предотвращает ошибки на этапе разработки

export interface Personal {
  phone: string
  firstName: string
  lastName: string
  gender: Gender
}

export type Gender = "male" | "female"

export interface WorkAddress {
  workplaceCategory: string
  address: string
}

export interface LoanParams {
  amount: number
  term: number
}

export interface AppFormState {
  personal: Personal
  work: WorkAddress
  loan: LoanParams
}

// Упрощенный интерфейс Category - API DummyJSON
export interface Category {
  name: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface AppStore {
  form: AppFormState
  categories: Category[]
  loadingCategories: boolean
  errorCategories?: string
  genderOptions: SelectOption[]
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
  setCategories: (categories: Category[]) => void
  setLoadingCategories: (loading: boolean) => void
  setErrorCategories: (error?: string) => void
  getCategoryOptions: () => SelectOption[]
  loadCategories: () => Promise<void>
  clearCategories: () => void
  reset: () => void
}
