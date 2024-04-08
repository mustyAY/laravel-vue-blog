<script setup>
import axios, { AxiosError } from 'axios'
import { onBeforeMount, ref } from 'vue'

const { id } = defineProps(['id'])

const post = ref(null)
const user = ref(null)

async function getPost() {
  const { data } = await axios.get(`/posts/${id}`)
  post.value = data
}

async function getUser() {
  try {
    const { data } = await axios.get('/user')
    user.value = data
  } catch (error) {
    if (error instanceof AxiosError && error.response.status === 401) {
      window.location = '/login'
    }
  }
}

onBeforeMount(async () => {
  await getPost()
  await getUser()
})

async function deletePost() {
  await axios.delete(`/posts/${id}`)
  window.location = '/'
}

async function likePost() {
  const { data } = await axios.post(`/posts/${id}/like`)
  post.value = data
  post.value.liked = true
}

async function UnlikePost() {
  const { data } = await axios.post(`/posts/${id}/unlike`)
  post.value = data
  post.value.liked = false
}
</script>

<template>
  <section class="px-6 py-8">
    <main class="mx-auto mt-10 max-w-6xl space-y-6 lg:mt-20">
      <article class="mx-auto max-w-4xl gap-x-10 lg:grid lg:grid-cols-12">
        <div class="col-span-4 mb-10 lg:pt-14 lg:text-center">
          <img
            :alt="post?.title"
            :src="post?.photo ?? 'https://placehold.co/600x400'"
            class="rounded-xl"
          />

          <p class="mt-4 block text-xs text-gray-400">
            <!-- Published <time>{{ formatDate(post.created_at) }}</time> -->
          </p>

          <div class="mt-4 flex items-center text-sm lg:justify-center">
            <img
              :src="`https://i.pravatar.cc/60?u=${post?.author?.name}`"
              alt="Lary avatar"
              class="rounded-xl"
            />

            <div class="ml-3 text-left">
              <h5 class="font-bold">{{ post?.author?.name }}</h5>
            </div>
          </div>
        </div>

        <div class="relative col-span-8">
          <div class="mb-6 hidden justify-between lg:flex">
            <RouterLink
              :to="{ name: 'Home' }"
              class="relative inline-flex items-center text-lg transition-colors duration-300 hover:text-blue-500"
            >
              <svg class="mr-2" height="22" viewBox="0 0 22 22" width="22">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M21 1v20.16H.84V1z"
                    stroke="#000"
                    stroke-opacity=".012"
                    stroke-width=".5"
                  ></path>
                  <path
                    class="fill-current"
                    d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z"
                  ></path>
                </g>
              </svg>

              Back to Posts
            </RouterLink>
          </div>

          <h1 class="mb-10 text-3xl font-bold lg:text-4xl">
            {{ post?.title }}
          </h1>

          <div class="mb-6 space-y-4 leading-loose lg:text-lg">
            {{ post?.body }}
          </div>

          <div
            v-show="post?.title === undefined"
            class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
          >
            <i class="fas fa-spinner animate-spin text-[60px] text-blue-500"></i>
          </div>
          <div class="relative">
            <span
              v-if="!post?.liked"
              class="flex h-4 w-4 items-center justify-center rounded-full p-8 hover:cursor-pointer hover:bg-gray-200"
            >
              <i class="far fa-heart text-2xl text-gray-500" @click="likePost"></i>
            </span>
            <span
              v-if="post?.liked"
              class="flex h-4 w-4 items-center justify-center rounded-full p-8 hover:cursor-pointer hover:bg-gray-200"
            >
              <i class="fas fa-heart text-2xl text-pink-500" @click="UnlikePost"></i>
            </span>
            <span
              v-show="post?.likes_count > 0"
              class="absolute left-[65px] top-[50%] -translate-y-1/2 text-gray-500"
            >
              {{ post?.likes_count }}
            </span>
          </div>
          <section class="col-span-8 col-start-5 mt-10 space-y-6">
            <div class="space-x-2">
              <button
                v-if="user?.id === post?.user_id || user?.role === 'admin'"
                class="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold uppercase text-red-300"
                style="font-size: 10px"
                type="submit"
                @click="deletePost"
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
