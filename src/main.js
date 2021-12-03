import Vue from 'vue'
import App from './App.vue'
import './index.css'
import './assets/css/index.scss'
import store from './store'
import axios from './plugins/axios'
import router from './router'
import VueProgressBar from 'vue-progressbar'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

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

Vue.prototype.$apiDomain = 'http://localhost:8000'

new Vue({
  axios,
  router,
  store,
  render: h => h(App),
  metaInfo: {
    titleTemplate: title => (title ? `${title} - Eventkita` : 'Eventkita')
  }
}).$mount('#app')
