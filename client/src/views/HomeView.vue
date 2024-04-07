<script setup>
import axios from 'axios'
import PostCard from "@/components/PostCard.vue";
import {onBeforeMount, ref} from "vue";

const posts = ref([])
const links = ref([])
const errors = ref([])
const loadingPosts = ref(true)

async function getPosts() {
  try {
    const {data} = await axios.get('/posts');
    links.value = data.links
    posts.value = data.data
    loadingPosts.value = false
  } catch ({response}) {
    errors.value = response.data.errors || []
  }
}

async function changePage(link) {
  if (!link.url || link.active) {
    return;
  }
  try {
    const {data} = await axios.get(link.url);
    links.value = data.links
    posts.value = data.data
  } catch ({response}) {
    errors.value = response.data.errors || []
  }
}

onBeforeMount(async () => {
  await getPosts()
})

</script>

<template>
  <section class="px-6 py-8 relative min-h-[80vh]">
    <h1 class="text-2xl font-bold my-3 text-center">Blog Posts</h1>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      <PostCard :posts/>
    </div>
    <div
        v-show="loadingPosts"
        class="flex justify-center items-center absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
    >
      <i class="fas fa-spinner text-blue-500 text-[60px] animate-spin"></i>
    </div>
    <div class="flex justify-center items-center m-12">
      <a
          v-for="(link, index) in links"
          :key="index"
          :class="`py-[6px] px-[16px] hover:text-white hover:bg-blue-500
        ${link.active ? 'bg-blue-500 text-white' : ''} ${!link.url? 'pointer-events-none' : ''}`" href="#"
          v-html="link.label" @click.prevent="changePage(link)"
      >
      </a>
    </div>
  </section>
</template>