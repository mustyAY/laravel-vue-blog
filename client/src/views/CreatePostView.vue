<script setup>
import axios, { AxiosError } from 'axios'
import { reactive, ref } from 'vue'

// const user = ref(null)
const formData = reactive({
  title: '',
  description: '',
  body: '',
  status: '',
  photo: ''
})
const errors = ref(null)

async function createPost() {
  const postFormData = new FormData()
  Object.keys(formData).forEach((key) => {
    postFormData.append(key, formData[key])
  })
  await axios.get('sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' })
  try {
    await axios.post('posts', postFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    window.location = '/'
  } catch (error) {
    if (error instanceof AxiosError && error.response.status === 422) {
      errors.value = error.response.data.errors
    }
  }
}

function addPhoto(event) {
  formData.photo = event.target.files[0]
}
</script>

<template>
  <section class="px-6 py-8">
    <main class="mx-auto mt-10 max-w-lg rounded-xl border-gray-200 bg-gray-100 p-6">
      <h1 class="text-center text-xl font-bold">Create A Post!</h1>
      <form @submit.prevent="createPost">
        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="title">
            Title
          </label>

          <input
            id="title"
            v-model="formData.title"
            class="w-full border border-gray-400 p-2"
            name="title"
            required
            type="text"
          />
          <ul v-if="errors?.title" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.title" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="title">
            Post Image
          </label>

          <input
            id="photo"
            class="w-full border border-gray-400 p-2"
            name="photo"
            type="file"
            @change="addPhoto"
          />
          <ul v-if="errors?.photo" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.title" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="body">
            Description
          </label>

          <textarea
            id="description"
            v-model="formData.description"
            class="w-full border border-gray-400 p-2"
            name="description"
            required
            type="text"
          >
          </textarea>
          <ul v-if="errors?.description" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.description" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="body">
            Body
          </label>

          <textarea
            id="body"
            v-model="formData.body"
            class="w-full border border-gray-400 p-2"
            name="body"
            required
            type="text"
          >
          </textarea>
          <ul v-if="errors?.body" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.body" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-bold uppercase text-gray-700" for="body">
            Status
          </label>
          <select
            id="status"
            v-model="formData.status"
            class="w-full border border-gray-400 p-2"
            name="status"
          >
            <option value="draft">Save as draft</option>
            <option value="published">Publish</option>
          </select>
          <ul v-if="errors?.status" class="mt-2 space-y-1 text-sm text-red-600">
            <li v-for="(error, index) in errors.status" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <button class="rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-500" type="submit">
            Create Post
          </button>
        </div>
      </form>
    </main>
  </section>
</template>
