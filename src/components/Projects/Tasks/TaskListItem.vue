<template>
  <v-list-tile avatar ripple>
    <v-list-tile-action>
      <v-checkbox v-model="isDone" color="primary"></v-checkbox>
    </v-list-tile-action>
    <router-link class="list__tile__content" style="text-decoration:none" :to="{name: 'Task', params: { id: project['.key'], task_key: task['.key'] }}">
      <v-list-tile-sub-title>{{ task.title }}</v-list-tile-sub-title>
    </router-link>
  </v-list-tile>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '../../../database/db'
  export default {
    props: ['task'],
    data: () => ({
      isChanging: false
    }),
    computed: {
      ...mapState(['project']),
      isDone: {
        get: function () {
          return this.task.done
        },
        set: function (taskDone) {
          db.ref('/projects/' + this.project['.key'] + '/tasks/' + this.task['.key'] + '/done').set(taskDone).then(() => {
            if (taskDone) this.$store.dispatch('snackbar', { text: '¡La tarea ha sido realizada!' })
          })
        }
      }
    }
  }
</script>
