<template>
  <v-card class="task_content">
    <loader v-if="task == null"></loader>
    <template v-else>
      <v-layout class="pl-3 pt-3 mx-0">
        <v-checkbox v-model="isDone" hide-details color="primary" class="shrink mr-2"></v-checkbox>
        <div>
          <div class="headline">{{ task.title }}</div>
          <div class="grey--text">1,000 miles of wonder</div>
        </div>
      </v-layout>
      <v-tabs icons-and-text centered grow color="white">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab href="#tab-1" class="primary--text">
          {{ texts.tabs.details }}
          <v-icon class="primary--text">list</v-icon>
        </v-tab>
        <v-tab href="#tab-2" class="primary--text">
          {{ texts.tabs.comments }}
          <v-icon class="primary--text">mode_comment</v-icon>
        </v-tab>
        <v-tab-item id="tab-1">
          <task-details></task-details>
        </v-tab-item>
        <v-tab-item id="tab-2">
          <task-comments></task-comments>
        </v-tab-item>
      </v-tabs>
    </template>
  </v-card>
</template>

<script>
  import { db } from '../../../database/db'
  import { mapState } from 'vuex'
  import TaskDetails from './details/TaskDetails'
  import TaskComments from './comments/TaskComments'
  export default {
    components: { TaskDetails, TaskComments },
    created () {
      this.init()
    },
    data () {
      return {
        text: 'lorem ipsum dolor',
        texts: {
          tabs: {
            details: 'Detalles',
            comments: 'Comentarios'
          }
        }
      }
    },
    methods: {
      init () {
        let taskRef = db.ref('projects/' + this.project['.key'] + '/tasks/' + this.$route.params.task_key)
        this.$store.dispatch('setTaskRef', taskRef)
      }
    },
    computed: {
      ...mapState(['project', 'task']),
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
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    }
  }
</script>
