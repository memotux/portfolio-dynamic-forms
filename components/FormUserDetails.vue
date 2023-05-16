<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import type { FormWizard } from '~/types';

const emit = defineEmits<{
  (e: 'update', data: typeof form): void
}>()

const validations = {
  email: {
    required,
    email
  },
  password: {
    required
  },
  name: {
    required
  }
}

const form = reactive<Pick<FormWizard, 'email' | 'password' | 'name'>>({
  email: null,
  password: null,
  name: null,
})

const $v = useVuelidate(validations, form)

function submit() {
  if (!$v.value.$invalid) {
    emit('update', { ...form })
  }
}
</script>

<template>
  <div>
    <h1 class="title">Create Account</h1>

    <h2 class="subtitle">
      Create an account or log in to order your liquid gold subscription
    </h2>

    <form @input="submit" class="form">
      <div class="form-group">
        <label class="form-label" for="email">Email</label>
        <input type="text" v-model="$v.email.$model"
          placeholder="your@email.com"
          class="form-control" id="email">
        <div v-if="$v.email.$error && $v.email.required.$invalid" class="error">email is
          required</div>
        <div v-if="$v.email.$error && $v.email.email.$invalid" class="error">email is
          invalid</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="password">Password</label>
        <input v-model="$v.password.$model" type="password"
          placeholder="Super Secret Password" class="form-control" id="password">
        <div v-if="$v.password.$error" class="error">
          password is required</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="name">Name</label>
        <input v-model="$v.name.$model" type="text"
          placeholder="What should we call you?" class="form-control" id="name">
        <div v-if="$v.name.$error" class="error">name is required</div>
      </div>
    </form>
  </div>
</template>