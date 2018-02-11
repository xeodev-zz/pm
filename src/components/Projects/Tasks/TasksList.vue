<template>
  <v-flex xs12 md4>
    <v-card>
      <v-card-title class="primary white--text">
        <span>{{ category.title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon small class="my-0" dark @click="toggleTaskForm">
          <v-icon>{{ activatorIcon }}</v-icon>
        </v-btn>
        <v-menu bottom left>
          <v-btn icon small class="my-0" slot="activator" dark>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i" @click="">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <create-task v-show="showTaskForm" :category="category" @toggleTaskForm="toggleTaskForm"></create-task>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list two-line class="py-0">
          <template v-for="task in tasksFiltered">
            <task-list-item :task="task"></task-list-item>
            <v-divider></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import CreateTask from './CreateTask'
  import TaskListItem from './TaskListItem'
  import { mapState } from 'vuex'

  export default {
    components: { CreateTask, TaskListItem },
    props: ['category'],
    data: () => ({
      items: [
        { title: 'Marcar todos' },
        { title: 'Eliminar todos' }
      ],
      showTaskForm: false
    }),
    methods: {
      toggleTaskForm: function () {
        this.showTaskForm = !this.showTaskForm
      }
    },
    computed: {
      ...mapState(['project']),
      tasksFiltered: function () {
        let tasks = window.utils.fireParserArray(this.project.tasks)
        return tasks.filter((task) => {
          return task.category === this.category.title
        })
      },
      activatorIcon: function () {
        return this.showTaskForm ? 'remove' : 'add'
      }
    }
  }
</script>
