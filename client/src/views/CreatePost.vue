<template>
  <section class="px-6 py-8">
    <main class="max-w-lg mx-auto mt-10 bg-gray-100 border-gray-200 p-6 rounded-xl">
      <h1 class="text-center font-bold text-xl">Create A Post!</h1>
      <form method="POST" :action="makePost">
        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="title">
            Title
          </label>

          <input
            class="border border-gray-400 p-2 w-full"
            type="text"
            name="title"
            id="title"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block mb-2 uppercase font-bold text-xs text-gray-700" for="body">
            Body
          </label>

          <textarea
            class="border border-gray-400 p-2 w-full"
            type="text"
            name="body"
            id="body"
            required
          >
          </textarea>
        </div>

        <div class="mb-6">
          <button type="submit" class="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500">
            Publish
          </button>
        </div>
      </form>
    </main>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      post: {}
    }
  },

  mounted() {},

  methods: {
    makePost() {
      axios.post(`/api/posts`).then(({ data }) => (this.post = data))
    }
  }
}
</script>
