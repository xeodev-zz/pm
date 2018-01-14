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
      timeout: 3000,
      text: '',
      closeColor: 'primary'
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
      state.snackbar.timeout = payload.timeout || 3000
      state.snackbar.text = payload.text || '¡Acción completada!'
      state.snackbar.closeColor = payload.color ? 'white' : 'primary'
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
