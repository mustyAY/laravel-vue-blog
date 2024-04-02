<template>
  <section class="px-6 py-8">
    <main class="max-w-6xl mx-auto mt-10 lg:mt-20 space-y-6">
      <article class="max-w-4xl mx-auto lg:grid lg:grid-cols-12 gap-x-10">
        <div class="col-span-4 lg:text-center lg:pt-14 mb-10">
          <img src="./images/illustration-1.png" alt="" class="rounded-xl" />

          <p class="mt-4 block text-gray-400 text-xs">
            <!-- Published <time>{{ $job->created_at->diffForHumans() }}</time> -->
          </p>

          <div class="flex items-center lg:justify-center text-sm mt-4">
            <img
              src="https://i.pravatar.cc/60?u={{ $job->lister->id }}"
              class="rounded-xl"
              alt="Lary avatar"
            />
            <a href="/users/{{ $job->lister->id }}">
              <div class="ml-3 text-left">
                <h5 class="font-bold">{{ post.author?.name }}</h5>
                <!-- <h6>Lister on WorkLet</h6> -->
              </div>
            </a>
          </div>
        </div>

        <div class="col-span-8 relative">
          <div class="hidden lg:flex justify-between mb-6">
            <router-link
              :to="{ name: 'Home' }"
              class="transition-colors duration-300 relative inline-flex items-center text-lg hover:text-blue-500"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" class="mr-2">
                <g fill="none" fill-rule="evenodd">
                  <path
                    stroke="#000"
                    stroke-opacity=".012"
                    stroke-width=".5"
                    d="M21 1v20.16H.84V1z"
                  ></path>
                  <path
                    class="fill-current"
                    d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z"
                  ></path>
                </g>
              </svg>

              Back to Posts
            </router-link>
          </div>

          <h1 class="font-bold text-3xl lg:text-4xl mb-10">
            {{ post.title }}
          </h1>

          <div class="space-y-4 lg:text-lg leading-loose">
            {{ post.body }}
          </div>

          <div
            v-show="post.title === undefined"
            class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
          >
            <i class="fas fa-spinner text-blue-500 text-[60px] animate-spin"></i>
          </div>

          <i
            @click="likePost"
            class="far fa-heart text-gray-500 text-2xl hover:cursor-pointer w-8"
          ></i>
          <i
            @click="UnlikePost"
            class="fas fa-heart text-pink-500 text-2xl hover:cursor-pointer w-8"
          ></i>
          <section class="col-span-8 col-start-5 mt-10 space-y-6">
            <div class="space-x-2">
              <!-- <a href="#"
                                            class="px-3 py-1 border border-blue-300 rounded-full text-blue-300 text-xs uppercase font-semibold"
                                            style="font-size: 10px">Techniques</a> -->

              <button
                type="submit"
                class="px-3 py-1 border border-red-300 rounded-full text-red-300 text-xs uppercase font-semibold"
                style="font-size: 10px"
              >
                Delete Post
              </button>
            </div>
          </section>
        </div>
      </article>
    </main>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],

  data() {
    return {
      post: {}
    }
  },

  mounted() {
    this.getPost()
  },

  methods: {
    getPost() {
      axios.get(`/posts/${this.id}`).then(({ data }) => {
        console.log(data)
        this.post = data
      })
    },

    deletePost() {
      axios.delete(`/api/posts/${this.id}`).then(({ data }) => (this.post = data))
    },

    likePost() {
      axios.post(`/api/posts/${this.id}/like`).then(({ data }) => (this.post = data))
    },

    UnlikePost() {
      axios.post(`/api/posts/${this.id}/unlike`).then(({ data }) => (this.post = data))

      // const heartIcon = document.querySelectorAll(".fa-heart")
      // heartIcon.forEach(icon => {
      //     icon.onclick = function() {
      //         this.parentNode.submit();
      //     };
      // });
    }
  }
}
</script>
