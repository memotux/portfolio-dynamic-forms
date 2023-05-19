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

const {
  form,
  goNext,
  goBack,
  restart,
  currentStepNumber,
  showCompleteMessage } = useWizard()

const length = computed(() => steps.length)
const currentStep = computed(() => steps[currentStepNumber.value - 1])
const progress = computed(() => {
  return currentStepNumber.value / length.value * 100
})
const isFormComplete = computed(() => currentStepNumber.value === steps.length)
</script>

<template>
  <div>
    <Transition name="wizard" mode="out-in">
      <div v-if="showCompleteMessage">
        <h1 class="title">Thank you!</h1>
        <h2 class="subtitle">
          We look forward to shipping you your first box!
        </h2>

        <div style="display: flex;justify-content: center; gap: 1rem;">
          <a href="https://vueschool.io" target="_blank" class="btn">Go somewhere cool!</a>
          <button class="btn" @click="restart">Make another order</button>
        </div>
      </div>
      <div v-else>
        <Transition name="wizard">
          <component :is="currentStep" />
        </Transition>

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
            class="btn">{{ isFormComplete ? 'Complete' : 'Next' }}</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="css">
.wizard-move,
.wizard-enter-active,
.wizard-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.wizard-enter-from,
.wizard-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

.wizard-leave-active {
  position: absolute;
}
</style>