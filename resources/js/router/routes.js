import { createRouter, createWebHistory } from "vue-router";

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import CreatePost from '../pages/CreatePost.vue'

const routes = [
    
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/api/posts/:id",
        name: "Post",
        component: Post,
        props: true
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/create-post",
        name: "CreatePost",
        component: CreatePost,
    },
    // {
    //     path: "/blog/:slug",
    //     name: "SingleBlog",
    //     component: SingleBlog,
    //     props: true,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;