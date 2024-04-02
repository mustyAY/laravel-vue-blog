<template>
  <section class="px-6 py-8">
      <nav class="md:flex md:justify-between md:items-center">
          <div>
              <router-link :to="{ name: 'Home' }">
                  <img src="./images/lary-newsletter-icon.png" alt="Laracasts Logo" width="70" height="70">
              </router-link>
          </div>

          <div class="mt-8 md:mt-0 flex items-center">
              <!-- @auth -->
              <button class="text-xs font-bold uppercase">Username</button>

              <form class="text-xs font-semibold text-blue-500 ml-4" action="/logout" method="POST">

                  <button type="submit">Log Out</button>
              </form>
              <!-- @if(auth()->user()->user_type_id === 1) -->
              <router-link 
              :to="{ name: 'CreatePost'}"
              href="users/{{ auth()->id() }}/jobs/create" 
              id="create-job-button"
              class="bg-blue-600 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                  New Post
              </router-link>
              <!-- @endif -->
              <!-- @else -->
              <router-link class="text-xs font-bold uppercase mx-4" :to="{ name: 'Register' }">Register</router-link>
              <router-link class="text-xs font-bold uppercase" :to="{ name: 'Login' }">Login</router-link>
              <!-- @endauth               -->
              <a href="#" class="bg-blue-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                  Subscribe for updates
              </a>
          </div>
      </nav>

      <router-view></router-view>

      <footer class="bg-gray-100 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
          <img src="./images/lary-newsletter-icon.svg" alt="" class="mx-auto -mb-6" style="width: 145px;">
          <h5 class="text-3xl">Stay in touch with the latest posts</h5>
          <p class="text-sm mt-3">Promise to keep the inbox clean. No bugs.</p>

          <div class="mt-10">
              <div class="relative inline-block mx-auto lg:bg-gray-200 rounded-full">

                  <form method="POST" action="#" class="lg:flex text-sm">
                      <div class="lg:py-3 lg:px-5 flex items-center">
                          <label for="email" class="hidden lg:inline-block">
                              <img src="./images/mailbox-icon.svg" alt="mailbox letter">
                          </label>

                          <input id="email" type="text" placeholder="Your email address"
                              class="lg:bg-transparent py-2 lg:py-0 pl-4 focus-within:outline-none">
                      </div>

                      <button type="submit"
                          class="transition-colors duration-300 bg-blue-500 hover:bg-blue-600 mt-4 lg:mt-0 lg:ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
                          Subscribe
                      </button>
                  </form>
              </div>
          </div>
      </footer>
  </section>
</template>

