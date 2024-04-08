<script setup>
import axios, { AxiosError } from 'axios'
import { reactive, ref } from 'vue'

// const user = ref(null)
const formData = reactive({
  email: '',
  password: ''
})
const errors = ref(null)

async function login() {
  await axios.get('sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' })
  try {
    await axios.post('login', formData, { baseURL: 'http://localhost:8000' })
    window.location = '/'
  } catch (error) {
    if (error instanceof AxiosError && error.response.status === 422) {
      errors.value = error.response.data.errors
      formData.password = ''
    }
  }
}
</script>

<template>
  <section class="px-6 py-8">
    <main class="mx-auto mt-10 max-w-lg rounded-xl border-gray-200 bg-gray-100 p-6">
      <h1 class="text-center text-xl font-bold">Log In!</h1>
      <form class="mt-10" @submit.prevent="login">
        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="email">
            Email
          </label>

          <input
            id="email"
            v-model="formData.email"
            autofocus
            class="w-full border border-gray-400 p-2"
            name="email"
            required
            type="email"
          />

          <ul v-if="errors?.email" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.email" :key="index">
              {{ error }}
            </li>
          </ul>
          <!-- <p class="text-red-500 text-xs mt-1">{{ $message }}</p> -->
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="password">
            Password
          </label>

          <input
            id="password"
            v-model="formData.password"
            class="w-full border border-gray-400 p-2"
            name="password"
            required
            type="password"
          />
          <!-- <p class="text-red-500 text-xs mt-1">{{ $message }}</p> -->
        </div>

        <div class="mb-6">
          <button class="rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-500" type="submit">
            Log In
          </button>
        </div>
      </form>
    </main>
  </section>
</template>
