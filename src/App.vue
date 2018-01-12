<template>
  <v-app>
    <template v-if="appLoader">
      <v-content>
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="purple"></v-progress-circular>
      </v-content>
    </template>
    <template v-else>
      <v-navigation-drawer temporary v-model="drawer" absolute v-if="user != null">
        <user-menu></user-menu>
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
              <user-menu></user-menu>
            </v-card>
          </v-menu>
        </v-layout>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer app class="justify-center">
        <span>&copy; Partido Morado</span>
      </v-footer>
    </template>
    <v-snackbar
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :bottom="snackbar.y === 'bottom'"
      :right="snackbar.x === 'right'"
      :left="snackbar.x === 'left'"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.active"
    >
      {{ snackbar.text }}
      <v-btn flat color="white" @click.native="snackbar.active = false">Cerrar</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  import UserMenu from './components/MenuLists/UserMenu'

  export default {
    components: { UserMenu },
    data () {
      return {
        drawer: false,
        title: 'Proyectos Puente Piedra'
      }
    },
    computed: {
      ...mapState(['user', 'appLoader', 'snackbar']),
      drawerJustify () {
        return (this.user != null) ? 'justify-space-between' : 'justify-center'
      }
    },
    methods: {
      redirectTo (route) {
        this.$router.push({name: route})
      }
    }
  }
</script>
