<template>
  <section class="px-6 py-8 relative min-h-[80vh]">
    <h1 class="text-2xl font-bold my-3 text-center">Blog Posts</h1>
    <div class="flex flex-wrap">
      <div data-cy="posts" class="sm:w-[50%] md:w-[calc(100%/3)] lg:w-[25%]" v-for="post in posts" :key="post.id">
        <article
          class="transition-colors duration-300 hover:bg-gray-100 border border-black border-opacity-0 hover:border-opacity-5 rounded-xl"
        >
          <div class="py-6 px-5 lg:flex flex-col">
            <div class="flex-1 lg:mr-8">
              <img
                src="./images/illustration-1.png"
                alt="Blog Post illustration"
                class="rounded-xl"
              />
            </div>

            <div class="flex-1 flex flex-col justify-between">
              <header class="mt-8 lg:mt-0">
                <!-- <div class="space-x-2">
                              <a href="#" class="px-3 py-1 border border-blue-300 rounded-full text-blue-300 text-xs uppercase font-semibold" style="font-size: 10px">Techniques</a>

                              <a href="#" class="px-3 py-1 border border-red-300 rounded-full text-red-300 text-xs uppercase font-semibold" style="font-size: 10px">Updates</a>
                          </div> -->

                <div class="mt-4">
                  <h1 class="text-3xl">
                    <router-link
                      :data-cy="post.id"
                      :to="{
                      name: 'Post',
                      params: { id: post.id }
                    }"
                      class="hover:underline"
                    >
                      {{ post.title }}
                    </router-link>
                  </h1>

                  <span class="mt-2 block text-gray-400 text-xs"> </span>
                </div>
              </header>

              <div class="text-sm mt-2">
                {{ post?.description }}
              </div>

              <footer class="flex justify-between items-center mt-8">
                <div class="flex items-center text-sm">
                  <img
                    :src="`https://i.pravatar.cc/60?u=${post.author?.id}`"
                    class="rounded-xl"
                    alt="{{ post?.author.name }}"
                  />
                  <a href="/users/{{ /*$job->lister->id*/ }}">
                    <div class="ml-3">
                      <h5 class="font-bold">{{ post?.author.name }}</h5>
                    </div>
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div
      v-show="posts.length === 0"
      class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
    >
      <i class="fas fa-spinner text-blue-500 text-[60px] animate-spin"></i>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      try {
        
        const {data} = await axios.get('/posts');
        console.log(data.data)
        this.posts = data.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
