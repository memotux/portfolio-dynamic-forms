<template>
  <div>
    <FormPlanPicker v-if="currentStepNumber === 1" @update="processStep" />
    <!-- <FormUserDetails v-if="currentStepNumber === 2" />
    <FormAddress v-if="currentStepNumber === 3" />
    <FormReviewOrder v-if="currentStepNumber === 4" /> -->

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
        class="btn">Next</button>
    </div>

    <pre><code>{{ form }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import type { Plan } from '@/types'

useSeoMeta({
  title: 'Liquid Gold Box'
})

const currentStepNumber = ref(1)
const length = ref(4)
const form = reactive({
  plan: null,
  email: null,
  name: null,
  password: null,
  address: null,
  recipient: null,
  chocolate: false,
  otherTreat: false
})

const progress = computed(() => {
  return currentStepNumber.value / length.value * 100
})

function goBack() {
  currentStepNumber.value -= 1
}
function goNext() {
  currentStepNumber.value += 1
}
function processStep(payload: Plan) {
  Object.assign(form, { plan: payload })
}
</script>