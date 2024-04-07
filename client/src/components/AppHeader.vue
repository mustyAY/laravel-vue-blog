<script setup>
import axios, { AxiosError } from 'axios'
import { onBeforeMount, ref } from 'vue'

const user = ref(null)

async function getUser() {
  try {
    const { data } = await axios.get('/user')
    user.value = data
  } catch (error) {
    if (error instanceof AxiosError && error.response.status === 401) {
      await logout()
    }
  }
}

async function logout() {
  if (!user.value) return
  await axios.post(
    '/logout',
    {},
    {
      baseURL: 'http://localhost:8000'
    }
  )
  user.value = null
}

onBeforeMount(async () => {
  await getUser()
})
</script>

<template>
  <header>
    <nav class="md:flex md:items-center md:justify-between">
      <div>
        <RouterLink :to="{ name: 'Home' }">
          <img
            alt="Laracasts Logo"
            class="max-h-16 max-w-16"
            height="288"
            src="@/assets/images/lary-newsletter-icon.png"
            width="290"
          />
        </RouterLink>
      </div>

      <div class="mt-8 flex items-center md:mt-0">
        <button v-if="user" class="text-xs font-bold">{{ user?.name }}</button>

        <RouterLink
          v-if="user && user.role !== 'subscriber'"
          id="create-job-button"
          :to="{ name: 'CreatePost' }"
          class="ml-3 rounded-full bg-blue-600 px-5 py-3 text-xs font-semibold text-white"
        >
          New Post
        </RouterLink>

        <form v-if="user" class="ml-4 text-xs font-semibold text-blue-500" @submit.prevent="logout">
          <button type="submit">Log Out</button>
        </form>

        <div v-else class="text-xs font-bold">
          <RouterLink :to="{ name: 'Register' }" class="mx-4 text-blue-500 hover:text-blue-600"
            >Register
          </RouterLink>
          <RouterLink :to="{ name: 'Login' }" class="font-bold text-blue-500 hover:text-blue-600">
            Login
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-active {
  @apply font-extrabold;
}
</style>
