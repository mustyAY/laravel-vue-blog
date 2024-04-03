<script>
import axios from 'axios'
import router from '@/router/index.js'

export default {
  name: 'RefreshDatabase',

  mounted() {
    this.refreshDB()
  },

  methods: {
    async refreshDB () {
      await axios.get('/__cypress__/refresh_database')
      await router.push('/')
    }
  }
}
</script>

<template>
  <h1>Refresh DB</h1>
</template>

<style scoped>

</style>