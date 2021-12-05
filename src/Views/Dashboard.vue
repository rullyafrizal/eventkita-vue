<template>
  <div class="project-page">
    <section class="dashboard-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container mx-auto pt-8 px-20">
      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-semibold">Dashboard</h2>
          <ul class="flex mt-2">
            <li class="mr-6">
              <a class="text-gray-800 font-semibold" href="#"> Participated Events </a>
            </li>
          </ul>
        </div>
        <div class="w-1/4 text-right">
          <router-link
            to="/dashboard/profile"
            class="bg-orange-button hover:bg-green-button text-white font-bold py-4 px-4 rounded-xl inline-flex items-center"
          >
            <svg height="18px" width="18px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="mr-3 svg-inline--fa fa-pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z"></path>
            </svg>
            Edit Profile
          </router-link>
        </div>
      </div>
      <hr />
    </section>
    <div class="container w-100 lg:w-4/5 mx-auto mb-16 flex flex-col">
      <!-- card -->
      <router-link v-for="participation in participations" :key="participation.id" :to="`/events/${participation.event.id}`"
           class="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl mt-4 w-100 mx-2 hover:shadow-2xl transition-all duration-350 ease-in-out">
        <!-- media -->
        <div class="h-64 w-auto md:w-1/2">
          <img class="inset-0 h-full w-full object-cover object-center" :src="participation.event.pictures.data[0].path" />
        </div>
        <!-- content -->
        <div class="w-full py-4 px-6 text-gray-800 flex flex-col justify-start">
          <h2 class="font-bold text-2xl leading-normal truncate" style="overflow: hidden; display: inline-block; text-overflow: ellipsis; white-space: nowrap; width:600px;">{{ participation.event.name }}</h2>
          <p class="mt-2 leading-normal">
            <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" class="inline-block text-gray-600 svg-inline--fa fa-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"></path></svg>
            &nbsp;{{ participation.event.start_date }}
          </p>
          <p class="text-sm text-gray-700 tracking-wide font-semibold mt-2 leading-normal">
            <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" class="text-gray-600 svg-inline--fa fa-location-dot inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"></path></svg>
            &nbsp;{{ participation.event.location }}
          </p>
          <div class="relative progress-bar mt-8">
            <div
              class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-6"
            >
              <div
                :style="
                  'width: ' +
                  participation.event.participant_count / participation.event.quota * 100 +
                  '%'
                "
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
              ></div>
            </div>
          </div>
          <div class="flex progress-info">
            <div class="text-lg">
              {{ (participation.event.participant_count / participation.event.quota * 100).toFixed(1) }}%
            </div>
            <div class="ml-auto font-semibold text-lg">
              {{ participation.event.participant_count }} / {{ participation.event.quota }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapGetters } from 'vuex'
import { toast } from 'tailwind-toast'

export default {
  name: 'Dashboard',

  components: {
    Navbar
  },

  data: () => ({
    participations: {}
  }),

  methods: {
    async fetchParticipations () {
      const config = {
        method: 'get',
        url: `${this.$apiDomain}/api/participations`,
        headers: {
          Authorization: 'Bearer ' + this.token.access_token
        }
      }

      const response = await this.axios(config).catch((error) => {
        if (parseInt(error.response.status) >= 500) {
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
        }
      })

      this.participations = response.data.body.data
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
    await this.fetchParticipations()
  }
}
</script>

<style scoped>

</style>
