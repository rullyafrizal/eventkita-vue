<template>
  <section class="call-to-action bg-purple-progress py-36">
    <div class="container mx-auto">
      <div class="w-full text-center">
        <h1 class="leading-normal text-5xl text-white font-semibold">
          Easy way to participate
          <br />
          in your favorite events
        </h1>
        <router-link
          to="/auth/login"
          class="inline-block bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 mt-8 text-lg rounded-full"
        >
          Get Started
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CallToAction'
}
</script>
