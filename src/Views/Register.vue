<template>
  <div class="h-screen flex justify-center items-center my-20">
    <div class="w-auto sm:2-1/4 md:w-1/4 lg:w-2/4 xl:w-3/5 flex justify-center items-center">
      <div class="w-full lg:w-1/2 px-10 lg:px-0">
        <h2 class="font-semibold mb-6 text-3xl text-black">Sign Up Account</h2>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-gray-500 block mb-3"
            >Full Name</label
            >
            <input
              type="text"
              class="auth-form focus:outline-none focus:bg-gray-200 focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="Write Your Name Here"
              v-model="formRegister.name"
            />
            <span v-if="errors.data" class="text-xs text-red-700" id="passwordHelp">
              {{ errors.data.errors.name ? errors.data.errors.name[0] : '' }}
            </span>
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-gray-500 block mb-3"
            >Email Address</label
            >
            <input
              type="email"
              class="auth-form focus:outline-none focus:bg-gray-200 focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="Write your email address here"
              v-model="formRegister.email"
            />
            <span v-if="errors.data" class="text-xs text-red-700">
              {{ errors.data.errors.email ? errors.data.errors.email[0] : '' }}
            </span>
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-gray-500 block mb-3"
            >Phone Number</label
            >
            <input
              type="text"
              class="auth-form focus:outline-none focus:bg-gray-200 focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="+6281234567890"
              v-model="formRegister.phone"
            />
            <span v-if="errors.data" class="text-xs text-red-700">
              {{ errors.data.errors.phone ? errors.data.errors.phone[0] : '' }}
            </span>
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-gray-500 block mb-3"
            >Password</label
            >
            <input
              type="password"
              class="auth-form focus:outline-none focus:bg-gray-200 focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-800"
              placeholder="Type your password here"
              v-model="formRegister.password"
              @keyup.enter="register"
            />
            <span v-if="errors.data" class="text-xs text-red-700">
              {{ errors.data.errors.password ? errors.data.errors.password[0] : '' }}
            </span>
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <button
              @click="register"
              class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
            >
              Continue Sign Up
            </button>
          </div>
        </div>
        <div class="text-center">
          <p class="text-black text-md">
            Already have account?
            <router-link to="/auth/login" class="no-underline text-orange-button"
            >Sign In</router-link
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'tailwind-toast'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',

  metaInfo () {
    return {
      title: 'Register'
    }
  },

  data: () => ({
    formRegister: {
      name: '',
      email: '',
      phone: '',
      password: ''
    },
    errors: {}
  }),

  methods: {
    ...mapActions({
      setToken: 'auth/setToken'
    }),

    async register () {
      const data = this.formRegister

      const config = {
        method: 'post',
        url: `${this.$apiDomain}/api/auth/register`,
        data
      }

      const response = await this.axios(config)
        .catch((err) => {
          console.log(err.response)
          this.errors = err.response

          if (this.errors.status === 422) {
            toast().default('Ooops,', `${this.errors.data.message}`)
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

      if (response) {
        toast().default('Yayyy,', 'You are registered and now redirecting...')
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

        const config = {
          method: 'post',
          url: `${this.$apiDomain}/api/auth/login`,
          data: {
            email: this.formRegister.email,
            password: this.formRegister.password
          },
          headers: {
            Accept: 'application/json'
          }
        }

        const response = await this.axios(config).catch(() => {
          toast().default('Oops,', 'Something went wrong, please login manually')
            .with({
              shape: 'pill',
              duration: 2000,
              speed: 2000,
              positionX: 'center',
              positionY: 'top',
              color: 'bg-red-500 text-gray-50 text-center',
              fontTone: 200
            })
            .show()

          setTimeout(() => {
            this.$router.push('/auth/login')
          }, 2900)
        })

        if (response.status === 200) {
          this.setToken(response.data.body)

          setTimeout(() => {
            this.$router.push('/events')
          }, 2800)
        }
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
    }
  }
}
</script>

<style scoped>

</style>
