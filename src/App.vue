<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
      v-if="user != null"
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app dark color="primary">
      <v-layout row class="align-center mx-0" :class="drawerJustify">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="user != null" class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-title class="hidden-md-and-up mx-0"><img src="/static/logo.png" style="display: block"/></v-toolbar-title>
        <v-toolbar-title v-text="title" class="hidden-sm-and-down"></v-toolbar-title>
        <v-spacer  class="hidden-sm-and-down"></v-spacer>
        <v-menu offset-x :close-on-content-click="false" :nudge-width="200" v-if="user != null">
          <v-btn icon slot="activator" dark>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-card>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://vuetifyjs.com/static/doc-images/john.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>John Leider</v-list-tile-title>
                  <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon :class="'red--text'">
                    <v-icon>favorite</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile @click="redirectTo('Profile')">
                  <v-icon class="mr-2">person</v-icon>
                  <v-list-tile-title>Mi Perfil</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="redirectTo('MyProjects')">
                <v-icon class="mr-2">view_comfy</v-icon>
                <v-list-tile-title>Mis Proyectos</v-list-tile-title>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile @click="signOut">
                <v-icon class="mr-2">keyboard_tab</v-icon>
                <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-layout>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import * as firebase from 'firebase'

  export default {
    data () {
      return {
        drawer: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        title: 'Proyectos Puente Piedra'
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      drawerJustify () {
        return (this.user != null) ? 'justify-space-between' : 'justify-center'
      }
    },
    methods: {
      signOut () {
        firebase.auth().signOut().then(() => {
          this.$store.commit('setUser', null)
          this.$router.push({name: 'Signin'})
        })
      },
      redirectTo (route) {
        this.$router.push({name: route})
      }
    }
  }
</script>
