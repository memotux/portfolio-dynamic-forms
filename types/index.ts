export interface FormWizard {
  plan: Plan | null
  email: string | null
  name: string | null
  password: string | null
  address: string | null
  recipient: string | null
  chocolate: boolean
  otherTreat: boolean
}

export interface Plan {
  price: number
  weight: string
  name: string
  description: string
}