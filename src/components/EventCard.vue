<template>
  <div class="hover:shadow-2xl shadow-md transition-all duration-350 ease-in-out p-3 mx-3 my-3 bg-white hover:bg-gray-50 rounded-xl">
    <div class="item">
      <div class="item-image p-1">
        <img
          :src="event.pictures.data[0].path"
          alt=""
          class="rounded-xl w-full object-cover h-28"
        />
      </div>
      <div class="item-meta p-2">
        <h4 class="text-md font-medium text-gray-900 mt-5" style="overflow: hidden; display: inline-block; text-overflow: ellipsis; white-space: nowrap; width:215px;">
          {{ event.name }}
        </h4>
        <p class="text-sm font-light text-gray-600" style="overflow: hidden; display: inline-block; text-overflow: ellipsis; white-space: nowrap; width:215px;">
          <svg width="17px" height="17px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" class="svg-inline--fa fa-location-dot inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"></path></svg>
          &nbsp;{{ event.location }}
        </p>
        <div class="relative pt-4 progress-bar">
          <div
            class="overflow-hidden h-2 mb-3 text-xs flex rounded bg-gray-200 h-3 rounded-lg"
          >
            <div
              :style="'width: ' + event.participant_count / event.quota * 100 + '%'"
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
            ></div>
          </div>
        </div>
        <div class="flex progress-info">
          <div>{{ (event.participant_count / event.quota * 100).toFixed(1) }}%</div>
          <div class="ml-auto font-semibold">
            {{ event.participant_count }} / {{ event.quota }}
          </div>
        </div>
      </div>
      <router-link
        :to="`/events/${event.id}`"
        class="text-center mt-2 block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-2 text-lg rounded-full"
      >
        Join Now
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: [Object, Array]
  },
  data: () => ({

  })
}
</script>

<style scoped>

</style>
