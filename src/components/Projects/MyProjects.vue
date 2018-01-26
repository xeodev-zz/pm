<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <create-project></create-project>
      <project-item class="xs12 sm6 lg4 xl3" v-for="project in projects" :project="project" :key="project['.key']"></project-item>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '../../database/db'
  import CreateProject from './CreateProject'
  import ProjectItem from './List/Item'

  export default {
    components: { CreateProject, ProjectItem },
    created () {
      console.log(this.user.uid)
      let projectRefs = db.ref('projects').orderByChild('order')
      this.$store.dispatch('setProjectsRef', projectRefs)
    },
    computed: {
      ...mapState(['projects', 'user'])
    }
  }
</script>
