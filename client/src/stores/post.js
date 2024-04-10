import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'vue-router'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])
  const router = useRouter()

  async function getPosts(page) {
    const url = parseInt(page) > 1 ? `/posts/?page=${page}` : '/posts'
    try {
      const { data } = await axios.get(url)
      posts.value = data.data
      return { data, errors: [] }
    } catch ({ response }) {
      return { data: null, errors: response.data.errors || [] }
    }
  }

  async function createPost(formData) {
    const postFormData = new FormData()
    Object.keys(formData).forEach((key) => {
      postFormData.append(key, formData[key])
    })

    try {
      await axios.post('posts', postFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      await router.push('/')
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === 422) {
        return error.response.data.errors
      }
    }
  }

  return {
    posts,
    getPosts,
    createPost
  }
})
