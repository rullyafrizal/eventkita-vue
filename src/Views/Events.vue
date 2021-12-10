<template>
  <div class="events-page w-full mb-20">
    <section class="project-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container project-container mx-auto -mt-48 px-20">
      <div>
        <div>
          <nav class="font-bold mt-6" aria-label="Breadcrumb">
            <ol class="list-none p-0 inline-flex">
              <li class="flex items-center text-white">
                <router-link to="/">Home</router-link>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center">
                <router-link to="/events" class="text-yellow-500">Events</router-link>
              </li>
            </ol>
          </nav>
          <main class="max-w-7xl mx-auto">
            <section aria-labelledby="products-heading">
              <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                <!-- Filters -->
                <form class="hidden lg:block">
                  <div class="bg-white rounded-xl mt-8 px-6 border-b border-gray-200 py-6">
                    <div class="border-2 py-1 px-3 flex justify-between rounded-lg">
                      <input v-model="formFilters.search" class="outline-none text-gray-600 w-3/4" type="text" placeholder="Search Events" />
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-blue-400 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div class="bg-white rounded-xl my-3 px-6 border-b border-gray-200 py-6">
                    <h3 class="-my-3 flow-root">
                      <!-- Expand/collapse section button -->
                      <button type="button" class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                        <span class="font-medium text-gray-900">
                          Event Type
                        </span>
                      </button>
                    </h3>
                    <!-- Filter section, show/hide based on section state. -->
                    <div class="pt-6" id="filter-section-0">
                      <div class="space-y-4">
                        <div class="flex items-center" v-for="type in eventTypes" :key="type">
                          <input v-model="formFilters.eventTypes" id="filter-color-0" :value="type" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                          <label for="filter-color-0" class="ml-3 text-sm text-gray-600">
                            {{ type }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <!-- Product grid -->
                <div class="lg:col-span-3">
                  <!-- Replace with your content -->
                  <div class="rounded-lg h-96 lg:h-full">
                    <div class="grid xl:grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
                      <EventCard v-for="event in events.data" :key="event.id" :event="event" />
                    </div>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
              <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div></div>
                  <div v-if="events.meta" class="flex items-center space-x-1">
                    <button v-for="page in events.meta.links"
                            :key="page.label"
                            :disabled="!page.url"
                            @click="movePage(page.url)"
                            class="flex items-center px-4 py-2 bg-gray-50 shadow-2xl rounded-md"
                            :class="{'hover:bg-blue-600 hover:text-white': page.url, 'bg-blue-600 text-white': page.active}"
                            v-html="page.label"
                    ></button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import throttle from 'lodash/throttle'

export default {
  name: 'Events',
  components: {
    Navbar,
    EventCard
  },
  data: () => ({
    events: [],
    eventTypes: [],
    formFilters: {
      eventTypes: [],
      search: ''
    }
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
          console.log(e.response)
        })

      this.events = response.data
    },

    async fetchEventTypes (url = `${this.$apiDomain}/api/event-types`) {
      const config = {
        method: 'get',
        url
      }

      const response = await this.axios(config)
        .catch((e) => {
          console.log(e.response)
        })

      this.eventTypes = response.data.body.event_types
    },

    async movePage (link) {
      const page = link.split('?')[1].split('=')[1]
      await this.$router.push(`/events?page=${page}`)
      await this.fetch(`${link}`)
    }
  },

  watch: {
    formFilters: {
      handler: throttle(async function () {
        if (this.$route.fullPath !== '/events') {
          this.$router.push('/events')
        }
        let url = `${this.$apiDomain}/api/events-pagination?`

        if (this.formFilters.eventTypes.length) {
          url += `type=${this.formFilters.eventTypes.join(',')}`
        }

        if (this.formFilters.search) {
          url += `&search=${this.formFilters.search.toLowerCase()}`
        }

        await this.fetch(url)
      }, 150),
      deep: true
    }
  },

  async mounted () {
    await this.fetch()
    await this.fetchEventTypes()
  }
}
</script>

<style scoped>

</style>
