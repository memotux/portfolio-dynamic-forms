<script setup lang="ts">
const { form } = useWizard()

const totalPrice = computed(() => {
  let total = form.plan?.price || 0
  if (form.chocolate) {
    total += 4
  }
  if (form.otherTreat) {
    total += 2
  }
  return total
})
</script>

<template>
  <div>
    <h1 class="title">Confirm your order</h1>

    <h2 class="subtitle">
      We're almost there!
    </h2>

    <div class="summary">
      <h3>Subscription</h3>

      <p class="description">
        We'll send you carefully selected coffee every month.
      </p>

      <div class="plans">
        <div class="plan active-plan">
          <div class="weight">
            {{ form.plan?.weight }}
          </div>

          <div class="description">
            <span class="title">
              {{ form.plan?.name }}
            </span>
            <span class="description">
              {{ form.plan?.description }}
            </span>
          </div>

          <div class="price">
            <span class="dollar-sign">$</span>
            <span class="number">{{ totalPrice }}</span>
          </div>
        </div>
      </div>

      <h3>
        Level up your box
      </h3>

      <p class="description">
        Treat yourself by leveling up your monthly box
      </p>

      <div class="options">
        <div class="option">
          <input v-model="form.chocolate" type="checkbox" value="chocolate"
            id="chocolate" />
          <label for="chocolate">4 pcs. Single Origin Chocolate (+$4/month)</label>
        </div>

        <div class="option">
          <input v-model="form.otherTreat" type="checkbox" value="chocolate"
            id="other_treat" />
          <label for="other_treat">Another delicious treat (+$2/month)</label>
        </div>
      </div>

      <div class="address">
        <div class="w-2/3">
          <h3>Delivery</h3>
          <p class="description">
            Your first Liquid Gold Box is right around the corner
          </p>
        </div>

        <div class="w-1/3">
          <h3>{{ form.recipient }}</h3>
          <p class="leading-normal">
            {{ form.address }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>