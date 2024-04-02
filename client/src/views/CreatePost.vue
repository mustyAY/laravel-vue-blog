<template>
  <section class="px-6 py-8">
    <main class="max-w-lg mx-auto mt-10 bg-gray-100 border-gray-200 p-6 rounded-xl">
      <h1 class="text-center font-bold text-xl">Create A Post!</h1>
      <form @submit.prevent="makePost">
        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="title">
            Title
          </label>

          <input
            v-model="title"
            class="border border-gray-400 p-2 w-full"
            type="text"
            name="title"
            id="title"
            required
          />
          <ul v-if="errors.title" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.title" :key="index">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="body">
            Description
          </label>

          <textarea
            v-model="description"
            class="border border-gray-400 p-2 w-full"
            type="text"
            name="description"
            id="description"
            required
          >
          </textarea>
          <ul v-if="errors.description" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.description" :key="index">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="body">
            Body
          </label>

          <textarea
            v-model="body"
            class="border border-gray-400 p-2 w-full"
            type="text"
            name="body"
            id="body"
            required
          >
          </textarea>
          <ul v-if="errors.body" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.body" :key="index">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="body">
            Status
          </label>
          <select v-model="status" name="status" id="status" class="border border-gray-400 p-2 w-full">
            <option value="draft">Save as draft</option>
            <option value="published">Publish</option>
          </select>
          <ul v-if="errors.status" class="text-sm text-red-600 space-y-1 mt-2">
            <li v-for="(error, index) in errors.status" :key="index">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-6">
          <button type="submit" class="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500">
            Create Post
          </button>
        </div>
      </form>
    </main>
  </section>
</template>

<script>
import axios, { AxiosError } from 'axios'

export default {
  data() {
    return {
      title: '',
      description: '',
      body: '',
      status: '',
      errors: {}
    }
  },

  mounted() {
  },

  methods: {
    makePost() {
      axios.post(`/posts`, {
        title: this.title,
        description: this.description,
        body: this.body,
        status: this.status
      }).then(({ data }) => {
        console.log(data)
        this.post = data;
        window.location = '/';
      }).catch(error => {
        if (error instanceof  AxiosError && error.response.status === 422) {
          this.errors = error.response.data.errors
        }
        console.log(error)
      })
    }
  }
}
</script>
