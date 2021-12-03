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
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
          <ul class="flex mt-2">
            <li class="mr-6">
              <a class="text-gray-800 font-bold" href="#"> Participated Events </a>
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
      <div class="grid grid-cols-2 mb-20">
        <div
          class="w-full lg:max-w-full lg:flex rounded-xl pr-20 pb-8 "
          v-for="participation in participations"
          :key="participation.id"
        >
          <div
            class="border h-36 lg:h-auto lg:w-48 flex-none bg-cover rounded-l-xl text-center overflow-hidden hover:shadow-2xl shadow-md transition-all duration-350 ease-in-out"
            :style="
              `background-color: #bbb; background-position: center; background-image: url(${participation.event.pictures.data[0].path})`
            "
          ></div>
          <router-link
            :to="'/events/' + participation.event.id"
            class="w-full bg-white rounded-r-xl p-8 flex flex-col justify-between leading-normal hover:shadow-2xl shadow-md transition-all duration-350 ease-in-out"
          >
            <div class="mb-8">
              <div class="text-gray-900 font-bold text-xl mb-4" style="overflow: hidden; display: inline-block; text-overflow: ellipsis; white-space: nowrap; width:280px;">
                {{ participation.event.name }}
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" class="inline-block mr-3 svg-inline--fa fa-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"></path></svg>
                {{ participation.event.start_date }}
              </p>
              <p class="text-sm text-gray-600 text-base">
                <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" class="mr-2 svg-inline--fa fa-location-dot inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"></path></svg>
                {{ participation.event.location }}
              </p>
            </div>
            <div class="flex items-center">
              <button class="bg-green-button text-white py-2 px-4 rounded">
                Detail
              </button>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapGetters } from 'vuex'

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
        console.log(error.response)
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
