import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../database/db'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appLoader: false,
    user: null,
    projects: [],
    project: null,
    snackbar: {
      active: false,
      y: 'top',
      x: 'right',
      color: '',
      mode: '',
      timeout: 3000,
      text: '',
      closeColor: 'primary'
    },
    vuexfireRefs: []
  },
  mutations: {
    ...firebaseMutations,
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
    },
    addVuexFireRefs (state, payload) {
      state.vuexfireRefs.push(payload)
    },
    clearVuexFireRefs (state, payload) {
      state.vuexfireRefs = payload
    },
    setAnyState (state, payload) {
      state[payload.key] = payload.val
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
    },
    setProjectsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('projects', ref)
      store.commit('addVuexFireRefs', 'projects')
    }),
    setProjectRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('project', ref)
      store.commit('addVuexFireRefs', 'project')
    }),
    unbindFirebaseRef: firebaseAction(({ unbindFirebaseRef }) => {
      store.state.vuexfireRefs.forEach((ref) => {
        unbindFirebaseRef(ref)
        let cleanVal = (ref.charAt(ref.length - 1) === 's') ? [] : null
        store.commit('setAnyState', {key: ref, val: cleanVal})
      })
      store.commit('clearVuexFireRefs', [])
    })
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
