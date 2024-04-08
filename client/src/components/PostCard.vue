<script setup>
defineProps(['posts'])
</script>

<template>
  <div
    v-for="post in posts"
    :key="post.id"
    :data-cy-posts="post.id"
    class="flex flex-col justify-between p-2"
    data-cy="posts"
  >
    <header>
      <div>
        <img :alt="post.title" :src="post.photo ?? 'https://placehold.co/600x400'" class="w-full" />
      </div>
      <h2 class="my-5 font-bold">
        <RouterLink
          :data-cy="post.id"
          :to="{ name: 'Post', params: { id: post.id } }"
          class="hover:text-blue-500"
        >
          {{ post.title }}
        </RouterLink>
      </h2>
    </header>
    <section>
      {{ post.description }}
    </section>
    <footer class="mt-5 flex items-center gap-4">
      <div>
        <img
          :alt="post.author?.name"
          :src="`https://i.pravatar.cc/60?u=${post.author?.name}`"
          class="h-10 w-10 rounded-full"
        />
      </div>
      <h3 class="text-sm font-semibold">{{ post.author?.name }}</h3>
    </footer>
  </div>
</template>

<style scoped></style>
