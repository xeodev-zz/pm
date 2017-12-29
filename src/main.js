import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCard,
  VForm,
  VTextField,
  VDivider,
  VAlert,
  VProgressCircular,
  VMenu
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import './database/db'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VForm,
    VTextField,
    VDivider,
    VAlert,
    VProgressCircular,
    VMenu
  },
  theme: {
    primary: '#9c27b0',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged((user) => {
  console.log('Hello')
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      console.log('Hello DESDE VUE')
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    }
  })
})
