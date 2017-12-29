import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
