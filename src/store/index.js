import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  key: 'eventkita-token',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [vuexPersist.plugin]
})
