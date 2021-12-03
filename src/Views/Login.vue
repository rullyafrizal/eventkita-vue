<template>
  <div class="h-screen flex justify-center items-center">
    <div class="sm:2-1/4 md:w-1/4 lg:w-2/4 xl:w-3/5 flex justify-center items-center">
      <div class="w-full lg:w-1/2 px-10 lg:px-0">
        <h2 class="font-semibold mb-6 text-3xl text-black">
          Sign In to Your Account
        </h2>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-gray-500 block mb-3">Email Address</label>
            <input
              type="email"
              v-model="formLogin.email"
              class="auth-form focus:outline-none focus:bg-gray-200 focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="Write your email address here"
              name="email"
            />
          </div>
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
              class="auth-form focus:outline-none focus:bg-gray-200 focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="Write your password here"
              name="password"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <button
              @click="login"
              class="block w-full bg-orange-button hover:bg-blue-600 text-white font-semibold px-6 py-4 text-lg rounded-full"
            >
              Sign In
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
import { toast } from 'tailwind-toast'

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
    }
  }),

  methods: {
    ...mapActions({
      setToken: 'auth/setToken'
    }),

    async login () {
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
          this.errors = err.response

          if (this.errors.status === 401) {
            toast().default('We are sorry,', 'your credentials does not<br/> match our records')
              .with({
                shape: 'pill',
                duration: 7000,
                speed: 2000,
                positionX: 'center',
                positionY: 'top',
                color: 'bg-red-500 text-gray-50 text-center',
                fontTone: 200
              })
              .show()
          } else if (this.errors.status === 422) {
            toast().default('Ooops,', `${this.errors.data.errors.email[0]}`)
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
          } else if (parseInt(this.errors.status) >= 500) {
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

      if (response.status === 200) {
        toast().default('Yayy,', '&nbsp;Login success and now you are being redirected...')
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

        this.setToken(response.data.body)

        setTimeout(() => {
          this.$router.push('/events')
        }, 2800)
      }
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
