<template>
  <header class="flex items-center">
    <div style="height: 54px;" class="pr-5">
      <a href="/">
        <img src="../assets/logo-footer.svg" width="155px" alt="logo" class="h-full" />
      </a>
    </div>
      <ul class="flex items-center">
        <li>
          <router-link class="text-white hover:text-yellow-500 text-lg px-5 py-3" to="/">
            Home
          </router-link>
        </li>
        <li>
            <router-link class="text-white hover:text-yellow-500 text-lg px-5 py-3" to="/events">
              Events
            </router-link>
        </li>
        <li>
          <router-link class="text-white hover:text-yellow-500 text-lg px-5 py-3" to="/articles">
            Articles
          </router-link>
        </li>
      </ul>
      <ul class="flex ml-auto items-center mt-2"
          v-if="guest"
      >
        <li>
          <router-link to="/auth/register"
               class="inline-block bg-transparent border-white border hover:bg-yellow-600 hover:border-transparent text-white font-light w-40 text-center px-6 py-1 text-lg rounded-full mr-4"
          >
              Sign Up
          </router-link>
        </li>
        <li>
          <router-link to="/auth/login"
               class="inline-block bg-transparent border-white border hover:bg-yellow-600 hover:border-transparent text-white font-light w-40 text-center px-6 py-1 text-lg rounded-full"
          >
              Sign In
          </router-link>
        </li>
      </ul>
      <div class="flex ml-auto" v-else>
        <div class="dropdown inline-block relative z-10">
          <button class="bg-white text-gray-700 font-semibold py-2 px-4 rounded-xl inline-flex items-center" >
            <img src=""
                 alt=""
                 class="h-8 rounded-full mr-2"
            />
            <span class="mr-3">
            {{ this.user.name }}
            </span>
            <svg class="fill-current h-4 w-4"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </button>
            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 shadow w-full -mt-2">
              <li class="">
                <router-link class="bg-white rounded-t-xl mt-3 hover:bg-gray-100 hover:text-orange-500 py-2 px-4 block whitespace-no-wrap"
                     to="/dashboard"
                >My Dashboard</router-link>
              </li>
              <li class="">
                <router-link class="bg-white hover:bg-gray-100 border-t hover:text-orange-500 py-2 px-4 block whitespace-no-wrap"
                     to="/dashboard/profile"
                >My Profile</router-link>
              </li>
              <li class="">
                <a class="cursor-pointer rounded-b-xl bg-white hover:bg-gray-100 border-t hover:text-orange-500 py-2 px-4 block whitespace-no-wrap"
                   @click="logout()"
                >Logout</a>
              </li>
            </ul>
        </div>
      </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data: () => {
    return {
    }
  },

  methods: {
    ...mapActions({
      setToken: 'auth/setToken',
      setUser: 'auth/setUser'
    }),

    logout () {
      this.$toast.open({
        message: 'Yayy, &nbsp;Logout success, see you...',
        type: 'success',
        duration: 2000,
        dismissible: true,
        position: 'top',
        queue: true
      })

      setTimeout(() => {
        this.setToken({})
        this.$router.push('/events')
      }, 2750)
    }
  },

  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      token: 'auth/token',
      user: 'auth/user'
    })
  },

  mounted () {
    if (this.token) {
      this.setUser(this.token)
    }
  }
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
