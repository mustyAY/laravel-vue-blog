import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useRoute, useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const baseURL = 'http://localhost:8000'
  const router = useRouter()
  const routes = useRoute()

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const canCreatePost = computed(() => ['admin', 'author'].includes(user.value?.role))
  const canModifyPost = computed(() => (post) => user.value?.id === post?.user_id)

  async function getCsrfCookie() {
    await axios.get('sanctum/csrf-cookie', { baseURL })
  }

  async function getUser() {
    try {
      const { data } = await axios.get('/user')
      user.value = data
      localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === 401) {
        user.value = null
      }
    }
  }

  async function login(formData) {
    await getCsrfCookie()
    try {
      await axios.post('login', formData, { baseURL })
      await getUser()
      if (routes.query.redirect) return router.push(routes.query.redirect)
      return await router.push('/')
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === 422) {
        formData.password = ''
        return error.response.data.errors
      }
    }
  }

  async function register(formData) {
    await getCsrfCookie()
    try {
      await axios.post('register', formData, { baseURL })
      await getUser()
      return await router.push('/')
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === 422) {
        formData.password = formData.password_confirmation = ''
        return error.response.data.errors
      }
    }
  }

  async function logout() {
    if (!user.value) return
    try {
      await axios.post(
        '/logout',
        {},
        {
          baseURL
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      user.value = null
      localStorage.removeItem('user')
      if (routes.meta.requiresAuth) await router.push('/login')
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    canCreatePost,
    canModifyPost,
    getUser,
    register,
    login,
    logout
  }
})
