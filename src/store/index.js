import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  key: 'blogApplication',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  plugins: [vuexPersist.plugin]
})
