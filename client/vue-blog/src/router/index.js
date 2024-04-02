import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import CreatePost from '../views/CreatePost.vue'

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
  }
  // {
  //     path: "/blog/:slug",
  //     name: "SingleBlog",
  //     component: SingleBlog,
  //     props: true,
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
