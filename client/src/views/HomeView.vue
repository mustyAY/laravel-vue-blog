<script setup>
import axios from 'axios'
import PostCard from '@/components/PostCard.vue'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const posts = ref([])
const links = ref([])
const errors = ref([])
const loadingPosts = ref(true)
const page = ref(1)
let blog
const router = useRouter()
const route = useRoute()

async function getPosts(page) {
  const url = parseInt(page) > 1 ? `/posts/?page=${page}` : '/posts'
  try {
    const { data } = await axios.get(url)
    links.value = data.links
    posts.value = data.data
    loadingPosts.value = false
  } catch ({ response }) {
    errors.value = response.data.errors || []
  }
}

async function changePage(link) {
  if (!link.url || link.active) {
    return
  }
  try {
    const { data } = await axios.get(link.url)
    links.value = data.links
    posts.value = data.data
    page.value = data.current_page
    await router.push({
      query: {
        page: page.value > 1 ? page.value : undefined
      }
    })
    blog.scrollIntoView({
      behavior: 'smooth'
    })
  } catch ({ response }) {
    errors.value = response.data.errors || []
  }
}

onBeforeMount(async () => {
  page.value = route.query.page ?? page.value
  await getPosts(page.value)
})
</script>

<template>
  <section class="relative min-h-[80vh] px-6 py-8">
    <h1 id="blog" ref="blog" class="my-3 text-center text-2xl font-bold">Blog Posts</h1>
    <div class="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      <PostCard :posts />
    </div>
    <div
      v-show="loadingPosts"
      class="absolute left-[50%] top-[50%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      <i class="fas fa-spinner animate-spin text-[60px] text-blue-500"></i>
    </div>
    <div class="m-12 flex items-center justify-center">
      <a
        v-for="(link, index) in links"
        :key="index"
        :class="`px-[16px] py-[6px] hover:bg-blue-500 hover:text-white
        ${link.active ? 'bg-blue-500 text-white' : ''} ${!link.url ? 'pointer-events-none' : ''}`"
        href="#blog"
        v-html="link.label"
        @click.prevent="changePage(link)"
      >
      </a>
    </div>
  </section>
</template>
