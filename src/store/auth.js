import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: {},
    user: {}
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    }
  },
  actions: {
    setToken: ({ commit, dispatch }, payload) => {
      commit('setToken', payload)

      dispatch('setUser', payload)
    },
    setUser: async ({ commit }, payload) => {
      const config = {
        method: 'get',
        url: 'https://backend.eventkita.my.id/api/auth/me',
        headers: {
          Authorization: 'Bearer ' + payload.access_token
        }
      }
      axios.get('https://backend.eventkita.my.id/sanctum/csrf-cookie').then(async (res) => {
        try {
          const response = await axios(config)

          commit('setUser', response.data.body)
        } catch (error) {
          commit('setUser', {})
        }
      }).catch((err) => {
        console.log(err.response)
      })
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    guest: state => Object.keys(state.token).length === 0
  }
}
