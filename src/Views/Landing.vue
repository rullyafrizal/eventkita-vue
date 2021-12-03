<template>
  <div class="landing-page">
    <section class="landing-hero pt-5 px-20">
      <div class="header__bg"></div>
      <div class="container mx-auto relative">
        <Navbar />
        <div class="flex items-center pt-10 px-5 md:px-0">
          <div class="w-1/2">
            <h1 class="leading-normal text-4xl text-white mb-5">
              We help <u class="hero-underline">people</u> to <br />
              find their favorite events<br /> and <u class="hero-underline">get</u>
              participated
            </h1>
            <p class="leading-loose text-white text-xl font-light mb-8">
              Find the best events that suits you, <br />
              lots of partner organizer are here
            </p>
            <router-link
              to="/events"
              class="bg-orange-button hover:bg-green-button text-white font-semibold px-12 py-3 text-xl rounded-full"
            >
              Find Events
            </router-link>
          </div>
          <div class="w-1/2 flex justify-center">
            <img src="../assets/hero-image@2x.png" alt="crowdfunding project" />
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto pt-36 px-20" id="features">
      <div class="flex justify-between items-center mb-10">
        <div class="w-auto">
          <h2 class="leading-normal text-3xl text-gray-900 mb-6">
            Only 3 steps to participate <br />
            in your favorite events
          </h2>
        </div>
      </div>
      <div class="flex">
        <div class="w-full px-56 mb-5">
          <img src="../assets/line-step.svg" alt="" class="w-full" />
        </div>
      </div>
      <div class="flex justify-between items-center text-center">
        <div class="w-1/3">
          <figure class="flex justify-center items-center">
            <img src="../assets/step-1-illustration.svg" alt="" class="h-30 mb-8" />
          </figure>
          <div class="step-content">
            <h3 class="leading-normal font-medium">Sign Up</h3>
            <p class="font-light">
              Sign Up account and start <br />finding events
            </p>
          </div>
        </div>
        <div class="w-1/3">
          <figure class="flex justify-center items-center -mt-24">
            <img src="../assets/step-2-illustration.svg" alt="" class="h-30 mb-8" />
          </figure>
          <div class="step-content">
            <h3 class="font-medium">Join Event</h3>
            <p class="font-light">
              Choose suitable event, <br />
              and start join
            </p>
          </div>
        </div>
        <div class="w-1/3">
          <figure class="flex justify-center items-center -mt-48">
            <img src="../assets/step-3-illustration.svg" alt="" class="h-30 mb-8" />
          </figure>
          <div class="step-content">
            <h3 class="font-medium">Relax</h3>
            <p class="font-light">
              Time to makes dream <br />
              comes true
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto pt-24 px-20" id="projects">
      <div class="flex justify-between items-center">
        <div class="w-auto">
          <h2 class="leading-normal text-3xl text-gray-900 mb-8">
            New events you can <br />
            participate
          </h2>
        </div>
        <div class="w-auto mt-5 mr-5">
          <router-link class="text-gray-900 hover:underline hover:text-yellow-500 text-sm font-medium" to="/events"
          >View All &raquo;</router-link
          >
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-3">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </div>
    </section>
    <section class="container mx-auto pt-24 px-20" id="testimonials">
      <div class="flex justify-between items-center">
        <div class="w-auto">
          <h2 class="leading-normal text-3xl text-gray-900 mb-8">
            See What Our <br />
            Happy Users Say
          </h2>
        </div>
      </div>
      <div class="flex mb-10">
        <div class="w-2/12 flex justify-center items-start">
          <img src="../assets/testimonial-line.svg" alt="" />
        </div>
        <div class="w-8/12 mt-16">
          <h2 class="leading-normal text-3xl text-gray-900 font-light">
            “Finding an event is very easy at eventkita. <br />
            Just need to find an event, click and already participated.”
          </h2>
          <div class="testimonial-info mt-8">
            <div class="leading-normal name text-xl font-semibold">Sophia Latjuba</div>
            <div class="leading-normal title text-xl font-light text-gray-400">
              Participant
            </div>
          </div>
          <div class="testimonial-icon mt-10">
            <img
              src="../assets/testimonial-1-icon.png"
              alt=""
              class="w-20 mr-5 inline-block testimonial-user rounded-full"
            />
            <img
              src="../assets/testimonial-2-icon.png"
              alt=""
              class="w-20 mr-5 inline-block testimonial-user rounded-full"
            />
            <img
              src="../assets/testimonial-3-icon.png"
              alt=""
              class="w-20 mr-5 inline-block testimonial-user active rounded-full"
            />
          </div>
        </div>
        <div class="w-2/12"></div>
      </div>
    </section>
    <CallToAction />
  </div>
</template>

<script>
import CallToAction from '../components/CallToAction'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'

export default {
  name: 'Landing',
  components: {
    CallToAction,
    Navbar,
    EventCard
  },
  data: () => {
    return {
      events: []
    }
  },
  methods: {
    async fetch () {
      const config = {
        method: 'get',
        url: `${this.$apiDomain}/api/events?paginate=6`
      }

      const response = await this.axios(config)
        .catch((e) => {
          console.log(e)
        })

      this.events = response.data.body.data
    }
  },
  async created () {
    await this.fetch()
  }
}
</script>
