<template>
  <section class="px-6 py-8">
    <main class="max-w-lg mx-auto mt-10 bg-gray-100 border-gray-200 p-6 rounded-xl">
      <h1 class="text-center font-bold text-xl">Log In!</h1>
      <form @submit.prevent="login" class="mt-10">
        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="email">
            Email
          </label>

          <input
            v-model="email"
            class="border border-gray-400 p-2 w-full"
            type="email"
            name="email"
            id="email"
            value=""
            required
          />

          <ul v-if="errors.email" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.email" :key="index">{{ error }}</li>
          </ul>
          <!-- <p class="text-red-500 text-xs mt-1">{{ $message }}</p> -->
        </div>

        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="password">
            Password
          </label>

          <input
            v-model="password"
            class="border border-gray-400 p-2 w-full"
            type="password"
            name="password"
            id="password"
            required
          />
          <!-- <p class="text-red-500 text-xs mt-1">{{ $message }}</p> -->
        </div>

        <div class="mb-6">
          <button type="submit" class="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500">
            Log In
          </button>
        </div>
      </form>
    </main>
  </section>
</template>

<script>
import axios, { AxiosError } from 'axios'
import router from '@/router/index.js'

export default {
  data() {
    return {
      user: {},
      email: "",
      password: "",
      errors: {},
    }
  },

  mounted() {},

  methods: {
    login() {
      axios.get(`/sanctum/csrf-cookie`, { baseURL: "http://127.0.0.1:8000" })
        .then(response => {
          axios.post(`/login`, {
            email: this.email,
            password: this.password
          }, {baseURL: 'http://127.0.0.1:8000'}).then(({ data }) => {
            this.user = data
            window.location = '/'
          })
            .catch(error => {
              if (error instanceof  AxiosError && error.response.status === 422) {
                this.errors = error.response.data.errors
              }
              console.log(error)
            })
        }).catch(error => console.log(error))

    }
  }
}
</script>
