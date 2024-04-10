import { createRouter, createWebHistory } from 'vue-router'

import RefreshDatabase from '@/views/RefreshDatabase.vue'
import Home from '../views/HomeView.vue'
import Post from '../views/PostView.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import CreatePost from '../views/CreatePostView.vue'
import { useAuthStore } from '@/stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      requiresAuth: true,
      canCreate: true
    }
  },
  {
    path: '/__cypress__/refresh_database',
    name: 'RefreshDatabase',
    component: RefreshDatabase
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  } else if (to.meta.guest && authStore.isAuthenticated) {
    return {
      path: '/'
    }
  } else if (to.meta.canCreate && !authStore.canCreatePost) {
    return {
      path: '/'
    }
  }
})

export default router
