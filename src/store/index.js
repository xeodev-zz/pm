import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appLoader: true,
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAppLoader (state, payload) {
      state.appLoader = payload
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
    },
    appLoader (state) {
      return state.appLoader
    }
  }
})
