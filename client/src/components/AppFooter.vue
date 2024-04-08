<script setup></script>

<template>
  <footer
    class="mt-16 rounded-xl border border-black border-opacity-5 bg-gray-100 px-10 py-16 text-center"
  >
    <img
      alt="footer logo"
      class="mx-auto -mb-6"
      height="144"
      src="../assets/images/lary-newsletter-icon.svg"
      width="145"
    />
    <h5 class="text-3xl">Stay in touch with the latest posts</h5>
    <p class="mt-3 text-sm">Promise to keep the inbox clean. No bugs.</p>

    <div class="mt-10">
      <div class="relative mx-auto inline-block rounded-full lg:bg-gray-200">
        <form action="#" class="text-sm lg:flex" method="POST">
          <div class="flex items-center lg:px-5 lg:py-3">
            <label class="hidden lg:inline-block" for="email">
              <img alt="mailbox letter" src="../assets/images/mailbox-icon.svg" />
            </label>

            <input
              id="footer_email"
              class="py-2 pl-4 focus-within:outline-none lg:bg-transparent lg:py-0"
              placeholder="Your email address"
              type="email"
            />
          </div>

          <button
            class="mt-4 rounded-full bg-blue-500 px-8 py-3 text-xs font-semibold uppercase text-white transition-colors duration-300 hover:bg-blue-600 lg:ml-3 lg:mt-0"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
