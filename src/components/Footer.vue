<template>
  <footer class="bg-purple-progress py-20 text-white text-lg px-20">
    <div class="container mx-auto">
      <div class="sm:flex mb-4">
        <div class="sm:w-1/2 sm:mt-0 mt-8 h-auto">
          <router-link to="/">
            <img src="../assets/logo-footer.svg" alt="" class="mb-3" />
          </router-link>
          <p class="leading-normal font-light">
            Helps people find their <br />favorite events with convenient
          </p> <br><br>
          <p class="leading-normal font-light">
            &copy; 2020 - {{ new Date().getFullYear() }} Eventkita with &hearts;
          </p>
        </div>
        <div class="sm:w-2/4 h-auto">
        </div>
        <div class="sm:w-1/4 h-auto">
          <div class="mb-8 font-bold">Explore</div>
          <ul class="font-light">
            <li class="mb-3">
              <a href="/events">
                Events
              </a>
            </li>
            <li class="mb-3">
              <a href="/articles">
                Articles
              </a>
            </li>
          </ul>
        </div>
        <div class="sm:w-1/4 h-auto">
          <div class="mb-8 font-bold">Office</div>
          <ul class="font-light">
            <li class="mb-3">+021 2208 1996</li>
            <li class="mb-3">KBP, Bandung</li>
            <li class="mb-3">No.12 (Eventkita)</li>
            <li class="mb-3">support@eventkita.id</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
