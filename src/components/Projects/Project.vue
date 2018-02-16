<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap v-if="project != null">
      <v-flex xs12>{{ project.title }}</v-flex>
      <v-flex xs12 md7>
        <v-layout row wrap>
          <tasks-list v-for="category in categories" :category="category" :key="category.handle"></tasks-list>
        </v-layout>
      </v-flex>
      <v-flex xs12 md5>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { db } from '../../database/db'
  import { mapState } from 'vuex'
  import TasksList from './Tasks/TasksList'
  export default {
    components: { TasksList },
    data () {
      return {
        categories: [
          {
            title: 'Por hacer',
            handle: 'todo'
          },
          {
            title: 'Haciendo',
            handle: 'doing'
          },
          {
            title: 'Hecho',
            handle: 'done'
          }
        ],
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
