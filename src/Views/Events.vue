<template>
  <div class="events-page w-full mb-20">
    <section class="project-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container project-container mx-auto -mt-56 px-20">
      <nav class="text-white font-bold mt-6" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <router-link to="/">Home</router-link>
            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center">
            <router-link to="/events" class="text-yellow-500">Events</router-link>
          </li>
        </ol>
      </nav>
      <div class="grid xl:grid-cols-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
        <EventCard v-for="event in events.data" :key="event.id" :event="event" />
      </div>
      <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div></div>
          <div v-if="events.meta" class="flex items-center space-x-1">
            <button v-for="page in events.meta.links"
              :key="page.label"
              :disabled="!page.url"
              @click="movePage(page.url)"
              class="flex items-center px-4 py-2 bg-gray-50 rounded-md"
              :class="{'hover:bg-blue-600 hover:text-white': page.url, 'bg-blue-600 text-white': page.active}"
              v-html="page.label"
            ></button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'

export default {
  name: 'Events',
  components: {
    Navbar,
    EventCard
  },
  data: () => ({
    events: []
  }),

  metaInfo () {
    return {
      title: 'Discover Events'
    }
  },
  methods: {
    async fetch (url = `${this.$apiDomain}/api/events-pagination`) {
      const config = {
        method: 'get',
        url
      }

      const response = await this.axios(config)
        .catch((e) => {
          console.log(e)
        })

      this.events = response.data
    },

    async movePage (link) {
      const page = link.split('?')[1].split('=')[1]
      await this.$router.push(`/events?page=${page}`)
      await this.fetch(`${link}`)
    }
  },

  async mounted () {
    await this.fetch()
  }
}
</script>

<style scoped>

</style>
