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
  VSelect,
  VDivider,
  VAlert,
  VProgressCircular,
  VMenu,
  VAvatar,
  VDialog,
  VDatePicker
} from 'vuetify'
import ImageUploader from './components/Global/ImageUploader'
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
    VSelect,
    VDivider,
    VAlert,
    VProgressCircular,
    VMenu,
    VAvatar,
    VDialog,
    VDatePicker
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

Vue.component('image-uploader', ImageUploader)

Vue.config.productionTip = false

/* eslint-disable no-new */
let firstInit = true
let UserIsAuthenticated = new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && firstInit) {
      store.dispatch('autoSignIn', user).then(() => {
        resolve()
      })
    } else {
      resolve()
    }
    firstInit = false
  })
})

UserIsAuthenticated.then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})
