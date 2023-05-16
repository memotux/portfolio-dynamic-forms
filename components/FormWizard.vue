<script setup lang="ts">
useSeoMeta({
  title: 'Liquid Gold Box'
})

const { form, canGoNext } = useWizard()

const currentStepNumber = ref(1)
const steps = [
  resolveComponent('FormPlanPicker'),
  resolveComponent('FormUserDetails'),
  resolveComponent('FormAddress'),
  resolveComponent('FormReviewOrder'),
]
const length = computed(() => steps.length)
const currentStep = computed(() => steps[currentStepNumber.value - 1])

const progress = computed(() => {
  return currentStepNumber.value / length.value * 100
})

function goBack() {
  currentStepNumber.value -= 1
}
function goNext() {
  currentStepNumber.value += 1
  canGoNext.value = false
}
</script>

<template>
  <div>
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
        class="btn">Next</button>
    </div>

    <pre><code>{{ form }}</code></pre>
  </div>
</template>
