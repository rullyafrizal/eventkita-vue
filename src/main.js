import Vue from 'vue'
import App from './App.vue'
import './index.css'
import store from './store'
import axios from './plugins/axios'
import router from './router'

Vue.config.productionTip = false

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
