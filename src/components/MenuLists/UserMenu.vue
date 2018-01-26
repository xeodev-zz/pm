<template>
  <div>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="user.photoURL">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ user.position }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon :class="'green--text'" :to="{name: 'Profile'}">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile v-for="(item, i) in items" :to="{name: item.redirectTo}" exact :key="i">
        <v-icon class="mr-2">{{ item.icon }}</v-icon>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="signOut">
        <v-icon class="mr-2">keyboard_tab</v-icon>
        <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
  import * as firebase from 'firebase'

  export default {
    data () {
      return {
        items: [
          {
            icon: 'person',
            title: 'Mi Perfil',
            redirectTo: 'Profile'
          },
          {
            icon: 'view_module',
            title: 'Mis Proyectos',
            redirectTo: 'MyProjects'
          },
          {
            icon: 'view_comfy',
            title: 'Todos los Proyectos',
            redirectTo: 'Projects'
          }
        ]
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      signOut () {
        firebase.auth().signOut().then(() => {
          this.$store.commit('setUser', null)
          this.$router.push({name: 'Signin'})
        })
      }
    }
  }
</script>
