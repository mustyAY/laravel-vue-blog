<template>
  <section class="px-6 py-8">
    <main class="max-w-lg mx-auto mt-10 bg-gray-100 border-gray-200 p-6 rounded-xl">
      <h1 class="text-center font-bold text-xl">Register!</h1>
      <form @submit.prevent="register" class="mt-10">
        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="name">
            Name
          </label>

          <input v-model="name" class="border border-gray-400 p-2 w-full" type="text" name="name" id="name" value=""
            required />

          <ul v-if="errors.name" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.name" :key="index">{{ error }}</li>
          </ul>
          <!-- <p class="text-red-500 text-xs mt-1">{{ $message }}</p> -->
        </div>


        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="email">
            Email
          </label>

          <input v-model="email" class="border border-gray-400 p-2 w-full" type="email" name="email" id="email" value=""
            required />

          <ul v-if="errors.email" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.email" :key="index">{{ error }}</li>
          </ul>
          <!-- <p class="text-red-500 text-xs mt-1">{{ $message }}</p> -->
        </div>

        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="password">
            Password
          </label>

          <input v-model="password" class="border border-gray-400 p-2 w-full" type="password" name="password"
            id="password" required />

          <ul v-if="errors.password" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.password" :key="index">{{ error }}</li>
          </ul>
          <!-- <p class="text-red-500 text-xs mt-1">sorry wrong password</p> -->
        </div>

        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="password">
            Confirm Password
          </label>

          <input v-model="password_confirmation" class="border border-gray-400 p-2 w-full" type="password"
            name="password_confirmation" id="password_confirmation" required />

          <ul v-if="errors.password_confirmation" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.password_confirmation" :key="index">{{ error }}</li>
          </ul>
          <!-- <p class="text-red-500 text-xs mt-1">{{ $message }}</p> -->
        </div>

        <div class="mb-6">
          <button type="submit" class="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500">
            Submit
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {},
    }
  },

  mounted() { },

  methods: {
    register() {
      axios.get(`/sanctum/csrf-cookie`, { baseURL: "http://localhost:8000" })
        .then(response => {
          axios.post(`/register`, {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          }, {
            baseURL: "http://localhost:8000"
          }).then(({ data }) => {
            console.log(data)
            router.push('/')
          })
          .catch(error => {
            if (error instanceof  AxiosError && error.response.status === 422) {
              this.errors = error.response.data.errors
            }
            console.log(error)
          })
        }).catch(error => console.log(error))

    },
  }
}
</script>
