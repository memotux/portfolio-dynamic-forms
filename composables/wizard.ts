import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import type { FormWizard } from "~/types"

export const defaultData = {
  plan: null,
  email: null,
  name: null,
  password: null,
  address: null,
  recipient: null,
  chocolate: false,
  otherTreat: false
}

const validations = {
  plan: {
    required
  },
  email: {
    required,
    email
  },
  password: {
    required
  },
  name: {
    required
  },
  address: {
    required
  },
  recipient: {
    required
  }
}

const form = reactive<FormWizard>(defaultData)
const currentStepNumber = ref(1)
const $v = useVuelidate(validations, form)
const showCompleteMessage = ref(false)

function goNext() {
  switch (currentStepNumber.value) {
    case 1:
      if (!$v.value.plan.$invalid) {
        currentStepNumber.value += 1
      }
      break;
    case 2:
      if (
        !$v.value.email.$invalid &&
        !$v.value.name.$invalid
      ) {
        currentStepNumber.value += 1
      } else {
        $v.value.email.$touch()
        $v.value.name.$touch()
      }
      break;
    case 3:
      if (
        !$v.value.recipient.$invalid &&
        !$v.value.address.$invalid
      ) {
        currentStepNumber.value += 1
      } else {
        $v.value.recipient.$touch()
        $v.value.address.$touch()
      }
      break;
    case 4:
      if (!$v.value.$invalid) {
        showCompleteMessage.value = true
      }
      break;

    default:
      break;
  }
}
function goBack() {
  currentStepNumber.value -= 1
}

export const useWizard = () => ({
  form,
  currentStepNumber,
  goNext,
  goBack,
  $v,
  showCompleteMessage
})
