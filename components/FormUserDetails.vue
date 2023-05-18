<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import type { FormWizard } from '~/types';

const { form, processStep, canGoNext } = useWizard()

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

const state = reactive<Pick<FormWizard, 'email' | 'password' | 'name'>>({
  email: form.email,
  password: form.password,
  name: form.name,
})
const userExist = ref(false)
const creatingAcount = ref(false)
const pending = ref(false)

const $v = useVuelidate(validations, state)
const isLoggedIn = computed(() => form.email && form.name)
const canLogin = computed(() => !$v.value.email.$invalid && !$v.value.password.$invalid)

function submit() {
  if (!$v.value.$invalid) {
    processStep({ ...state })
  }
}
function login() {
  pending.value = true
  setTimeout(() => {
    userExist.value = true
    state.name = 'Romeo'
    submit()
    pending.value = false
  }, 3000);
}

watchEffect(() => {
  if ($v.value.$invalid && canGoNext.value) {
    canGoNext.value = false
  }
  if (!$v.value.$invalid && !canGoNext.value) {
    canGoNext.value = true
  }
})
</script>

<template>
  <div v-show="!pending">
    <h1 class="title">Create Account</h1>

    <h2 class="subtitle">
      Create an account or log in to order your liquid gold subscription
    </h2>

    <form @input="submit" class="form" style="flex-direction: column;">
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

      <div v-show="userExist || creatingAcount || isLoggedIn" class="form-group">
        <label class="form-label" for="name">Name</label>
        <input v-model="$v.name.$model" type="text"
          placeholder="What should we call you?" class="form-control" id="name"
          :disabled="userExist">
        <div v-if="$v.name.$error" class="error">name is required</div>
      </div>

      <TransitionGroup
        class="buttons"
        name="sign-btns"
        tag="div">
        <button
          v-if="!creatingAcount && !isLoggedIn"
          @click.prevent="login"
          :disabled="!canLogin"
          tye="button"
          class="btn">Log In</button>
        <span
          v-if="!creatingAcount && !isLoggedIn"
          class="btn"
          style="background-color: transparent; border-color: transparent; margin: 0 1rem 0 0; color:#09848d">Or</span>
        <button
          v-if="!canGoNext"
          @click.prevent="creatingAcount = true"
          :disabled="creatingAcount"
          type="button"
          class="btn-outlined">Create acount</button>
      </TransitionGroup>
    </form>
  </div>
  <div v-show="pending">
    <div style="width: 200px; height: 200px; margin: 0 auto;">
      <h3 style="text-align: center; color:#09848d;">Wait please...</h3>
      <img src="/spinner.svg" width="200px" height="200px"
        style="height: auto; width: 200px" />
    </div>
  </div>
</template>

<style scoped lang="css">
.sign-btns-move,
.sign-btns-enter-active,
.sign-btns-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.sign-btns-enter-from,
.sign-btns-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.sign-btns-leave-active {
  position: absolute;
}
</style>