<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from '@vuelidate/validators'
import type { FormWizard } from "~/types";

const { form, processStep } = useWizard()

const state = reactive<Pick<FormWizard, 'address' | 'recipient'>>({
  address: null,
  recipient: form.name
})
const validations = {
  address: {
    required
  },
  recipient: {
    required
  }
}

const $v = useVuelidate(validations, state)

function submit() {
  if (!$v.value.$invalid) {
    processStep({ ...state })
  }
}
</script>

<template>
  <div>
    <h1 class="title">Delivery details</h1>

    <h2 class="subtitle">
      Where should we send your freshly roasted coffee beans?
    </h2>

    <form @input="submit" class="form">
      <div class="form-group">
        <label class="form-label" for="delivery_name">Name</label>
        <input v-model="$v.recipient.$model" type="text" placeholder="Recipients Name"
          class="form-control" id="delivery_name">
        <div v-if="$v.recipient.$error" class="error">field is required</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="address">Address</label>
        <textarea v-model="($v.address.$model as string)"
          placeholder="London Street 470978 New England" rows="3" class="form-control"
          id="address"></textarea>
        <div v-if="$v.address.$error" class="error">field is required</div>
      </div>
    </form>
  </div>
</template>