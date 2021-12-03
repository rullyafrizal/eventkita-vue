<template>
  <div class="hover:shadow-2xl shadow-md transition-all duration-350 ease-in-out mx-6 my-4 p-5 bg-white hover:bg-gray-100 rounded-20">
    <div class="item">
      <div class="item-image">
        <img
          :src="article.thumbnail"
          alt=""
          class="rounded-20 w-full object-cover h-48"
        />
      </div>
      <div class="item-meta">
        <h4 class="text-xl font-medium text-gray-900 mt-5" style="overflow: hidden; display: inline-block; text-overflow: ellipsis; white-space: nowrap; width:280px;">
          {{ article.title }}
        </h4>
        <p class="text-md font-light text-gray-600 mt-1" style="overflow: hidden; display: inline-block; text-overflow: ellipsis; white-space: nowrap; width:280px;">
          <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" class="inline-block svg-inline--fa fa-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"></path></svg>
          &nbsp;{{ article.last_update }}
        </p>
      </div>
      <router-link
        :to="`/articles/${article.id}?t=${article.title}`"
        class="text-center mt-5 block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-2 text-lg rounded-full"
      >
        Read More
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: [Object, Array]
  }
}
</script>

<style scoped>

</style>
