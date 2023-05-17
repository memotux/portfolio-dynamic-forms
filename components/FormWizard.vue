<script setup lang="ts">
const steps = [
  resolveComponent('FormPlanPicker'),
  resolveComponent('FormUserDetails'),
  resolveComponent('FormAddress'),
  resolveComponent('FormReviewOrder'),
]

useSeoMeta({
  title: 'Liquid Gold Box'
})

const { form, canGoNext } = useWizard()

const currentStepNumber = ref(1)
const showCompleteMessage = ref(false)

const length = computed(() => steps.length)
const currentStep = computed(() => steps[currentStepNumber.value - 1])
const progress = computed(() => {
  return currentStepNumber.value / length.value * 100
})
const isFormComplete = computed(() => currentStepNumber.value === steps.length)

function goBack() {
  currentStepNumber.value -= 1
}
function goNext() {
  if (isFormComplete.value) {
    showCompleteMessage.value = true
  } else {
    currentStepNumber.value += 1
  }
}
function restart() {
  Object.assign(form, {
    plan: null,
    email: null,
    name: null,
    password: null,
    address: null,
    recipient: null,
    chocolate: false,
    otherTreat: false
  })
  currentStepNumber.value = 1
  canGoNext.value = false
  showCompleteMessage.value = false
}
</script>

<template>
  <div>
    <template v-if="showCompleteMessage">
      <h1 class="title">Thank you!</h1>
      <h2 class="subtitle">
        We look forward to shipping you your first box!
      </h2>

      <div style="display: flex;justify-content: center; gap: 1rem;">
        <a href="https://vueschool.io" target="_blank" class="btn">Go somewhere cool!</a>
        <button class="btn" @click="restart">Make another order</button>
      </div>
    </template>
    <template v-else>
      <component :is="currentStep" />

      <div class="progress-bar">
        <div :style="`width: ${progress}%;`"></div>
      </div>

      <!-- Actions -->
      <div class="buttons">
        <button
          @click="goBack"
          v-if="currentStepNumber > 1"
          class="btn-outlined">Back
        </button>
        <button
          @click="goNext"
          :disabled="!canGoNext"
          class="btn">{{ isFormComplete ? 'Complete' : 'Next' }}</button>
      </div>
    </template>
  </div>
</template>
