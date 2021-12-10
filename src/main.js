import Vue from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import './assets/css/index.css'
import './assets/css/index.scss'
import store from './store'
import axios from './plugins/axios'
import router from './router'
import VueProgressBar from 'vue-progressbar'
import VueMeta from 'vue-meta'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import VueToast from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-default.css'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.config.productionTip = false

Sentry.init({
  Vue,
  dsn: 'https://af04aa7d05974b739e1a024efc5b179d@o1069250.ingest.sentry.io/6063616',
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['eventkita.my.id', /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

const options = {
  color: '#D97706',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '1s',
    opacity: '0.1s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)
Vue.use(VueMeta)
Vue.use(VueToast)

Vue.prototype.$apiDomain = 'https://backend.eventkita.my.id'

new Vue({
  axios,
  router,
  store,
  render: h => h(App),
  metaInfo: {
    titleTemplate: title => (title ? `${title} - Eventkita` : 'Eventkita')
  }
}).$mount('#app')
