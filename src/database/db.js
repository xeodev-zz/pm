import * as firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB2dPPLXMKqqTz3OACSEcsHMYgZUn58P7w',
  authDomain: 'proyectos-puente-piedra.firebaseapp.com',
  databaseURL: 'https://proyectos-puente-piedra.firebaseio.com',
  projectId: 'proyectos-puente-piedra',
  storageBucket: 'proyectos-puente-piedra.appspot.com',
  messagingSenderId: '360912728451'
})

export const db = firebaseApp.database()
