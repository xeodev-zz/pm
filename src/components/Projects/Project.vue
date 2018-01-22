<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <template v-if="project != null">
        {{ project.title }}
      </template>
    </v-layout>
  </v-container>
</template>

<script>
  import { db } from '../../database/db'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        id: null
      }
    },
    created () {
      this.id = this.$route.params.id
      let projectRef = db.ref('projects/' + this.id)
      this.$store.dispatch('setProjectRef', projectRef)
    },
    computed: {
      ...mapState(['project'])
    }
  }
</script>
