<template>
  <div class="h-full flex justify-center items-center">
    <div class="sm:w-1/4 md:w-1/4 lg:w-2/4 xl:w-3/5 flex my-20 justify-center items-center overflow-x-auto bg-white rounded-xl shadow-xl">
      <div class="w-full sm:w-1/2 md:w-1/2 xl:w-3/5 py-16 px-10 justify-center lg:px-0">
        <div class="flex justify-center mb-10">
          <svg width="55" height="55" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.7234 0.0851286C20.0984 1.18747 10.7883 6.96482 5.13045 15.9695C-2.89142 28.7328 -1.37736 45.6797 8.76951 56.7164C14.414 62.8523 21.4 66.5047 29.7937 67.7C31.3742 67.9258 36.5937 67.9125 38.2273 67.6867C46.4883 66.5445 53.4742 62.9054 59.1055 56.7961C63.7406 51.7758 66.7023 45.3609 67.7383 38.1226C67.964 36.5554 67.964 31.3226 67.7383 29.7554C66.9547 24.2304 65.2015 19.5422 62.293 15.1594C61.0711 13.3 59.8359 11.7859 58.1094 10.0461C52.8101 4.68044 46.2492 1.37341 38.6922 0.257785C37.0586 0.0187224 32.3437 -0.0875277 30.7234 0.0851286ZM38.0945 19.7679C40.7773 20.4851 43.0617 21.7601 44.8547 23.5531C46.0765 24.775 46.8336 25.8508 47.6039 27.4844C48.6531 29.7023 49.1445 32.5578 48.9054 34.9351L48.7859 36.1304L38.5726 36.1703L28.3594 36.1969L28.439 36.6617C28.5586 37.4187 29.289 38.8 29.9133 39.4242C31.2281 40.7789 33.3664 41.2836 35.5578 40.7789C36.7265 40.5 37.6297 39.982 38.3469 39.1586L38.9578 38.4547H43.6461H48.3344L48.2414 38.7469C47.5109 41.1508 45.5453 43.9133 43.3804 45.5867C41.6804 46.8883 39.2633 47.9109 36.8461 48.3492C35.1195 48.6547 31.6133 48.575 30.1258 48.1765C27.9344 47.5922 26.3273 46.8351 24.7469 45.6664C21.4531 43.2226 19.5008 39.6765 19.0758 35.3734C18.4648 29.2508 21.4797 23.5664 26.7523 20.9367C29.3156 19.6617 31.0023 19.3164 34.3758 19.3828C36.4875 19.4226 37.0054 19.4758 38.0945 19.7679Z" fill="#3B41E3"/>
            <path d="M33.0742 26.7937C31.0023 27.0195 29.2359 28.5203 28.6117 30.5789L28.5187 30.8843H34.0305C37.975 30.8843 39.5555 30.8445 39.5555 30.7383C39.5555 30.6586 39.343 30.1804 39.0773 29.6758C37.9351 27.5109 35.8101 26.4883 33.0742 26.7937Z" fill="#3B41E3"/>
          </svg>
        </div>

        <h2 class="font-semibold mb-6 text-3xl text-black">
          Sign In to Your Account
        </h2>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-gray-500 block mb-3">Email Address</label>
            <input
              type="email"
              v-model="formLogin.email"
              class="auth-form focus:outline-none focus:bg-gray-200 bg-gray-200 focus:shadow-outline focus:shadow-2xl focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="Write your email address here"
              name="email"
            />
          </div>
          <span v-if="errors.data" class="text-xs text-red-700">
              {{ errors.data.errors.email ? errors.data.errors.email[0] : '' }}
            </span>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-gray-500 block mb-3"
            >Password</label
            >
            <input
              @keyup.enter="login"
              type="password"
              v-model="formLogin.password"
              class="auth-form focus:outline-none focus:bg-gray-200 bg-gray-200 focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="Write your password here"
              name="password"
            />
            <span v-if="errors.data" class="text-xs text-red-700">
              {{ errors.data.errors.password ? errors.data.errors.password[0] : '' }}
            </span>
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <button
              @click="login"
              class="block inline-flex justify-center w-full bg-orange-button hover:bg-blue-600 text-white font-semibold px-6 py-4 text-lg rounded-full"
            >
              <span class="flex-1 flex justify-center">
                <span v-if="loading" class="loader"></span>
                <span v-else>Sign In</span>
              </span>
            </button>
          </div>
        </div>
        <div class="text-center">
          <p class="text-black text-md">
            Don't have account?
            <router-link to="/auth/register" class="no-underline text-orange-button"
            >Sign Up</router-link
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',

  metaInfo () {
    return {
      title: 'Sign in'
    }
  },

  data: () => ({
    formLogin: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  }),

  methods: {
    ...mapActions({
      setToken: 'auth/setToken'
    }),

    async login () {
      this.loading = true
      const data = this.formLogin

      const config = {
        method: 'post',
        url: `${this.$apiDomain}/api/auth/login`,
        data,
        headers: {
          Accept: 'application/json'
        }
      }

      const response = await this.axios(config)
        .catch((err) => {
          console.log(err.response)
          this.errors = err.response
          this.loading = false

          if (this.errors.status === 401) {
            this.$toast.open({
              message: 'We are sorry, your credentials does not<br/> match our records',
              type: 'error',
              duration: 5000,
              dismissible: true,
              position: 'top',
              queue: true
            })
          } else if (this.errors.status === 422) {
            this.$toast.open({
              message: 'Oops, the given data was invalid',
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

      if (response.status === 200) {
        this.$toast.open({
          message: 'Yayy, &nbsp;Login success and now you are being redirected...',
          type: 'success',
          duration: 2000,
          dismissible: true,
          position: 'top',
          queue: true
        })

        this.setToken(response.data.body)
        this.loading = false
        setTimeout(() => {
          this.$router.push('/events')
        }, 2800)
      }

      this.loading = false
    }
  },

  computed: {
    ...mapGetters({
      token: 'auth/token',
      user: 'auth/user',
      guest: 'auth/guest'
    })
  },

  created () {
    if (!this.guest) {
      this.$router.push('/events')
    } else {
      this.$router.push(`/auth/login?node=${Math.random().toString(36).slice(2, 10)}`)
    }
  }
}
</script>

<style scoped>

</style>
