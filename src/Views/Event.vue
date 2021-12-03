<template>
  <div v-if="Object.keys(event).length" class="project-page">
    <section class="project-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container project-container mx-auto -mt-56 px-20">
      <div class="flex mt-3">
        <div class="w-3/4 mr-6">
          <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
            <div class="item-image">
              <img :src="activeImage.path" alt="" class="rounded-20 w-full" />
            </div>
          </div>
          <div class="flex -mx-2">
            <div
              v-for="image in event.pictures.data"
              :key="image.id"
              class="relative w-1/5 bg-white m-2 p-2 border border-gray-400 rounded-20"
              :class="{'outline-none ring-2 ring-blue-600': image.id === activeImage.id}"
              @click="activateImage(image)"
            >
              <div class="item-thumbnail cursor-pointer">
                <img
                  :src="image.path"
                  alt="Event Image"
                  class="rounded-20 object-cover h-36 w-full"
                />
              </div>
            </div>
          </div>
          <nav class="text-black font-bold mt-6" aria-label="Breadcrumb">
            <ol class="list-none p-0 inline-flex">
              <li class="flex items-center">
                <router-link to="/">Home</router-link>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center">
                <router-link to="/events">Events</router-link>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li>
                <router-link :to="`/events/${event.id}`" class="text-yellow-600" aria-current="page">{{ event.name }}</router-link>
              </li>
            </ol>
          </nav>
        </div>
        <div class="w-1/4">
          <div
            class="bg-white w-full p-5 border border-gray-400 rounded-20 sticky"
            style="top: 15px;"
          >
            <h3>Event Organizer:</h3>

            <div class="flex mt-3">
              <div class="w-4/4 ml-3">
                <div class="font-semibold text-xl text-gray-800">
                  {{ event.user.name }}
                </div>
                <div class="font-light text-sm text-gray-400">
                  Successfully organizing events with <strong>{{ event.user.participants_count }}</strong> total participants
                </div>
              </div>
            </div>

            <h4 class="mt-5 font-semibold">Event Information :</h4>
            <ul class="list-check mt-3">
              <li v-for="info in event.informations.data" :key="info.id">
                {{ info.information }}
              </li>
            </ul>
            <template v-if="!guest">
              <button
                @click="join"
                :disabled="participations.joined"
                :class="{'opacity-50 hover:cursor-default': participations.joined, 'hover:bg-green-600': !participations.joined}"
                class="mt-3 button-cta block w-full bg-yellow-500 text-white font-medium px-6 py-3 text-md rounded-full"
              >
                {{ participations.joined ? 'You are participated' : 'Join Now' }}
              </button>
            </template>
            <template v-else>
              <button
                @click="$router.push({ path: '/auth/login' })"
                class="mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full"
              >
                Sign in to Join
              </button>
            </template>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto pt-8 px-20">
      <div class="flex justify-between items-center">
        <div class="w-full md:w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">
            {{ event.name }}
          </h2>
          <p class="font-light text-gray-600 text-lg mb-1">
            <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" class="inline-block svg-inline--fa fa-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"></path></svg>
            &nbsp;{{ event.start_date }} - {{ event.end_date }}
          </p>
          <p class="font-light text-gray-600 text-lg mb-5">
            <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" class="svg-inline--fa fa-location-dot inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"></path></svg>
            &nbsp;{{ event.location }}
          </p>

          <div class="relative progress-bar">
            <div
              class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-50 h-6"
            >
              <div
                :style="
                  'width: ' +
                  event.participant_count / event.quota * 100 +
                  '%'
                "
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
              ></div>
            </div>
          </div>
          <div class="flex progress-info mb-6">
            <div class="text-2xl">
              {{ (event.participant_count / event.quota * 100).toFixed(1) }}%
            </div>
            <div class="ml-auto font-semibold text-2xl">
              {{event.participant_count}} / {{ event.quota }}
            </div>
          </div>

          <div class="prose lg:prose-md font-light text-lg mb-10" v-html="event.description"></div>
        </div>
        <div class="w-1/4 hidden md:block"></div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapGetters } from 'vuex'
import { toast } from 'tailwind-toast'

export default {
  name: 'Event',
  components: {
    Navbar
  },

  metaInfo () {
    return {
      title: `${this.event.name}`
    }
  },

  data: () => {
    return {
      event: {},
      activeImage: {},
      participations: {}
    }
  },

  methods: {
    async fetch () {
      const { id } = this.$route.params

      const config = {
        method: 'get',
        url: `${this.$apiDomain}/api/events/${id}`
      }

      const response = await this.axios(config)
        .catch((err) => {
          alert('Failed fetching data')
          console.log(err)
        })

      this.event = response.data.body
    },

    async checkJoined () {
      const config = {
        method: 'get',
        url: `${this.$apiDomain}/api/events/${this.$route.params.id}/check-joined`,
        headers: {
          Authorization: 'Bearer ' + this.token.access_token
        }
      }

      const response = await this.axios(config)
        .catch(() => {
          toast().default('Ooops,', 'Something went wrong')
            .with({
              shape: 'pill',
              duration: 7000,
              speed: 1000,
              positionX: 'center',
              positionY: 'top',
              color: 'bg-red-500 text-gray-50',
              fontTone: 200
            })
            .show()
        })

      this.participations = response.data.body
    },

    async join () {
      const { id } = this.$route.params
      const config = {
        method: 'post',
        url: `${this.$apiDomain}/api/events/${id}/action/join`,
        headers: {
          Authorization: 'Bearer ' + this.token.access_token
        }
      }

      const response = await this.axios(config)
        .catch(() => {
          toast().default('Ooops,', 'Something went wrong')
            .with({
              shape: 'pill',
              duration: 7000,
              speed: 1000,
              positionX: 'center',
              positionY: 'top',
              color: 'bg-red-500 text-gray-50',
              fontTone: 200
            })
            .show()
        })

      if (response) {
        toast().default('Yayy,', '&nbsp;Successfully joined, can\'t wait to see you present')
          .with({
            shape: 'pill',
            duration: 2000,
            speed: 1000,
            positionX: 'center',
            positionY: 'top',
            color: 'bg-green-500 text-gray-50',
            fontTone: 200
          })
          .show()

        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 2900)
      }
    },

    thumbnailImage () {
      if (this.event) {
        this.activeImage = this.event.pictures.data[0]
      }
    },

    activateImage (param) {
      this.activeImage = param
    }
  },

  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      token: 'auth/token',
      user: 'auth/user'
    })
  },

  async created () {
    await this.fetch()
    await this.checkJoined()
    console.log(this.participations)
    this.thumbnailImage()
  }
}
</script>

<style scoped>

</style>
