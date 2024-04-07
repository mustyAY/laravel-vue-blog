<script setup>
defineProps(['posts'])
</script>

<template>
  <div v-for="post in posts" :key="post.id" :data-cy-posts="post.id" class="flex flex-col p-2 justify-between">
    <header>
      <div>
        <img :alt="post.title" class="w-full" src="https://placehold.co/600x400">
      </div>
      <h2 class="font-bold my-5">
        <RouterLink
            :data-cy="post.id"
            :to="{name: 'Post', params: { id: post.id }}"
            class="hover:text-blue-500"
        >
          {{ post.title }}
        </RouterLink>
      </h2>
    </header>
    <section>
      {{ post.description }}
    </section>
    <footer class="flex gap-4 items-center mt-5">
      <div>
        <img :alt="post.author?.name" :src="`https://i.pravatar.cc/60?u=${post.author?.name}`"
             class="w-10 h-10 rounded-full">
      </div>
      <h3 class="font-semibold text-sm">{{ post.author?.name }}</h3>
    </footer>
  </div>
</template>

<style scoped>

</style>