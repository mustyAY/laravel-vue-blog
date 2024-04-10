import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth.js'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = 'http://localhost:8000/api'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const authStore = useAuthStore()
    if (
      error instanceof AxiosError &&
      [401, 403].includes(error.response.status) &&
      authStore.isAuthenticated
    ) {
      await authStore.logout()
    }
    return Promise.reject(error)
  }
)
