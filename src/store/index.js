import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../database/db'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appLoader: false,
    user: null,
    snackbar: {
      active: false,
      y: 'top',
      x: 'right',
      color: '',
      mode: '',
      timeout: 5000,
      text: ''
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAppLoader (state, payload) {
      state.appLoader = payload
    },
    setSnackbar (state, payload) {
      state.snackbar.active = payload.active || true
      state.snackbar.y = payload.y || 'top'
      state.snackbar.x = payload.x || 'right'
      state.snackbar.color = payload.color || ''
      state.snackbar.mode = window.innerWidth < 767 ? 'vertical' : ''
      state.snackbar.timeout = payload.timeout || 5000
      state.snackbar.text = payload.text || '¡Acción completada!'
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
    },
    snackbar ({commit}, payload) {
      commit('setSnackbar', payload)
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
