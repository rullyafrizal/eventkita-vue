<template>
  <div class="project-page">
    <section class="dashboard-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container mx-auto pt-8 px-20 mb-10">
      <div class="flex justify-between items-center">
        <div class="w-full mr-6">
          <router-link to="/dashboard">
            <h2 class="text-4xl text-gray-900 mb-2 font-semibold hover:text-yellow-500">Dashboard</h2>
          </router-link>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div class="w-3/4 mr-6">
          <h3 class="text-xl text-gray-900 mb-4">Edit Profile</h3>
        </div>
        <div class="w-1/4 text-right">
          <button
            @click="save"
            class="bg-green-button hover:bg-orange-button text-white font-bold px-4 py-1 rounded-xl inline-flex items-center"
          >
            <span v-if="loading" class="loader"></span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
      <div class="block">
        <div class="w-full lg:max-w-full lg:flex mb-4">
          <div class="w-full shadow-xl bg-white rounded-xl p-8 mt-2 flex flex-col justify-between leading-normal">
            <form class="w-full">
              <div class="flex flex-wrap -mx-3 mb-5">
                <div class="w-full md:w-1/2 p-5 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    v-model="formEdit.name"
                  />
                </div>
                <div class="w-full md:w-1/2 p-5">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none"
                    type="text"
                    readonly
                    v-model="formEdit.email"
                  />
                  <span v-if="errors.data" class="text-xs text-red-700">
                    {{ errors.data.errors.email ? errors.data.errors.email[0] : '' }}
                  </span>
                </div>
                <div class="w-full md:w-1/2 p-5">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    v-model="formEdit.phone"
                  />
                  <span v-if="errors.data" class="text-xs text-red-700">
                    {{ errors.data.errors.phone ? errors.data.errors.phone[0] : '' }}
                  </span>
                </div>
                <div class="w-full md:w-1/2 p-5">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    New Password
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="(Kosongkan jika tidak ingin diubah)"
                    v-model="formEdit.password"
                  />
                  <span v-if="errors.data" class="text-xs text-red-700">
                    {{ errors.data.errors.password ? errors.data.errors.password[0] : '' }}
                  </span>
                </div>
                <div v-if="formEdit.password" class="w-full p-5 md:w-1/2 my-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    New Password Confirmation
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="***************"
                    v-model="formEdit.password_confirmation"
                  />
                  <span v-if="errors.data" class="text-xs text-red-700">
                    {{ errors.data.errors.password ? errors.data.errors.password[0] : '' }}
                  </span>
                </div>
                <div v-if="formEdit.password" class="w-full md:w-1/2 p-5 my-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Old Password
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="***************"
                    v-model="formEdit.old_password"
                  />
                  <span v-if="errors.data" class="text-xs text-red-700">
                    {{ errors.data.errors.old_password ? errors.data.errors.old_password[0] : '' }}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',

  components: {
    Navbar
  },

  data: () => ({
    formEdit: {
      name: '',
      email: '',
      phone: '',
      password: ''
    },
    errors: {},
    loading: false
  }),

  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      token: 'auth/token',
      user: 'auth/user'
    })
  },

  methods: {
    async save () {
      this.loading = true
      const data = this.formEdit

      const config = {
        method: 'put',
        url: `${this.$apiDomain}/api/users`,
        data,
        headers: {
          Authorization: `Bearer ${this.token.access_token}`
        }
      }

      const response = await this.axios(config)
        .catch((error) => {
          this.loading = false
          this.errors = error.response

          if (this.errors.status === 422) {
            this.$toast.open({
              message: `Ooops, ${this.errors.data.message}`,
              type: 'error',
              duration: 5000,
              dismissible: true,
              position: 'top',
              queue: true
            })
          } else {
            this.$toast.open({
              message: 'Oops, Something went wrong',
              type: 'error',
              duration: 5000,
              dismissible: true,
              position: 'top',
              queue: true
            })
          }
        })

      if (response) {
        this.$toast.open({
          message: 'Yayy, &nbsp;Update profile success!',
          type: 'success',
          duration: 2000,
          dismissible: true,
          position: 'top',
          queue: true
        })

        setTimeout(() => {
          this.loading = false
          this.$router.push('/dashboard/profile')
        }, 500)

        this.clearPasswordField()
      }
    },

    clearPasswordField () {
      this.formEdit.password = ''
      this.formEdit.password_confirmation = ''
      this.formEdit.old_password = ''
    }
  },

  created () {
    const { name, email, phone } = this.user
    const password = ''
    // eslint-disable-next-line camelcase
    const password_confirmation = ''
    // eslint-disable-next-line camelcase
    const old_password = ''

    this.formEdit = {
      name,
      email,
      phone,
      password,
      password_confirmation,
      old_password
    }
  }
}
</script>

<style scoped>

</style>
