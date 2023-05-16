<template>
  <div>
    <h1 class="title">Coffee Plans</h1>

    <h2 class="subtitle">
      We travel the world to source the very best single origin coffee for you
    </h2>

    <div class="plans">
      <div
        v-for="plan in plans"
        :key="plan.price"
        @click="pickPlan(plan)"
        :class="{ 'active-plan': state.selectedPlan === plan }"
        class="plan">
        <div class="weight">
          {{ plan.weight }}
        </div>
        <div class="description">
          <span class="title">
            {{ plan.name }}
          </span>
          <span class="description">
            {{ plan.description }}
          </span>
        </div>
        <div class="price">
          <span class="dollar-sign">$</span>
          <span class="number">{{ plan.price }}</span>
        </div>
      </div>
    </div>
    <div v-if="$v.selectedPlan.$error" class="error">you should pick a plan to continue
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import type { Plan } from '@/types'

const emit = defineEmits<{
  (e: 'update', plan: Plan): void
}>()

const validations = {
  selectedPlan: {
    required
  }
}
const state = reactive<{ selectedPlan: Plan | null }>({
  selectedPlan: null
})

const $v = useVuelidate(validations, state)

const plans: Plan[] = [
  {
    price: 19,
    weight: '250g',
    name: 'The Single',
    description: 'One bag of freshly roasted coffee beans delivered to your house every month'
  },
  {
    price: 29,
    weight: '500g',
    name: 'The Curious',
    description: 'Two different types of freshly roasted coffee every month'
  },
  {
    price: 49,
    weight: '1kg',
    name: 'The Addict',
    description: 'Two bags of two different types of freshly roasted coffee every month.'
  }
]

function pickPlan(plan: Plan) {
  state.selectedPlan = plan

  emit('update', state.selectedPlan)
}

</script>