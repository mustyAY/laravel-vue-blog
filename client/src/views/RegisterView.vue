<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const errors = ref(null)

async function handleRegister() {
  errors.value = await authStore.register(formData)
}
</script>

<template>
  <section class="px-6 py-8">
    <main class="mx-auto mt-10 max-w-lg rounded-xl border-gray-200 bg-gray-100 p-6">
      <h1 class="text-center text-xl font-bold">Register!</h1>
      <form class="mt-10" @submit.prevent="handleRegister">
        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="name">
            Name
          </label>

          <input
            id="name"
            v-model="formData.name"
            class="w-full border border-gray-400 p-2"
            name="name"
            required
            type="text"
            value=""
          />

          <ul v-if="errors?.name" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.name" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="email">
            Email
          </label>

          <input
            id="email"
            v-model="formData.email"
            class="w-full border border-gray-400 p-2"
            name="email"
            required
            type="email"
            value=""
          />

          <ul v-if="errors?.email" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.email" :key="index">
              {{ error }}
            </li>
          </ul>
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

          <ul v-if="errors?.password" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.password" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="password">
            Confirm Password
          </label>

          <input
            id="password_confirmation"
            v-model="formData.password_confirmation"
            class="w-full border border-gray-400 p-2"
            name="password_confirmation"
            required
            type="password"
          />
        </div>

        <div class="mb-6">
          <button class="rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-500" type="submit">
            Submit
          </button>
        </div>
      </form>
    </main>
  </section>
</template>
