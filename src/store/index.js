import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../database/db'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appLoader: false,
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
      return new Promise((resolve) => {
        db.ref('users/' + payload.uid).on('value', (snapshot) => {
          let user = snapshot.val()
          commit('setUser', user)
          resolve()
        })
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
