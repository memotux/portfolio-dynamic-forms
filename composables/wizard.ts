import type { FormWizard } from "~/types"

const form = reactive<FormWizard>({
  plan: null,
  email: null,
  name: null,
  password: null,
  address: null,
  recipient: null,
  chocolate: false,
  otherTreat: false
})
const canGoNext = ref(false)

function processStep(payload: Partial<FormWizard>) {
  Object.assign(form, payload)
  canGoNext.value = true
}

export const useWizard = () => ({
  form,
  canGoNext,
  processStep
})
