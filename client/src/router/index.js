import { createRouter, createWebHistory } from 'vue-router'

import RefreshDatabase from '@/views/RefreshDatabase.vue'
import Home from '../views/HomeView.vue'
import Post from '../views/PostView.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import CreatePost from '../views/CreatePostView.vue'

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
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/__cypress__/refresh_database',
    name: 'RefreshDatabase',
    component: RefreshDatabase
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
