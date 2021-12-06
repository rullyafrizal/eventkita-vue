<template>
  <div class="article-page">
    <section class="project-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container project-container mx-auto -mt-56 px-20">
      <div class="flex justify-center mt-3">
        <div class="w-3/4 mr-6">
          <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
            <div class="item-image">
              <img :src="article.thumbnail" alt="" class="rounded-20 w-full" />
            </div>
          </div>
          <nav class="text-black font-bold mt-6" aria-label="Breadcrumb">
            <ol class="list-none p-0 inline-flex">
              <li class="flex items-center">
                <router-link to="/">Home</router-link>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center">
                <router-link to="/articles">Articles</router-link>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li>
                <router-link :to="`/events/${article.id}`" class="text-yellow-600" aria-current="page">{{ article.title }}</router-link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
    <section class="container mx-auto pt-8 px-20">
      <div class="flex justify-center items-center">
        <div class="w-full md:w-3/4 mb-20">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">
            {{ article.title }}
          </h2>
          <p class="font-light text-gray-600 text-lg mb-1">
            <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" class="inline-block svg-inline--fa fa-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"></path></svg>
            &nbsp;{{ article.last_update }}
          </p>

          <div class="prose lg:prose-md font-light text-lg my-10" v-html="article.body"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Article',

  components: {
    Navbar
  },

  metaInfo () {
    return {
      title: `${this.article.title}`
    }
  },

  data: () => ({
    article: {}
  }),

  methods: {
    async fetch () {
      const { id } = this.$route.params

      const config = {
        method: 'get',
        url: `${this.$apiDomain}/api/articles/${id}`
      }

      const response = await this.axios(config)
        .catch((err) => {
          this.$toast.open({
            message: 'Oops, Something went wrong',
            type: 'error',
            duration: 5000,
            dismissible: true,
            position: 'top',
            queue: true
          })
          console.log(err)
        })

      this.article = response.data.body
    }
  },

  async created () {
    await this.fetch()
  }
}
</script>

<style scoped>

</style>
