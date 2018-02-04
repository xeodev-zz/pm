<template>
  <v-layout row>
    <v-flex xs12 md8>
      <v-layout row>
        <v-flex xs12 md4 v-for="category in categories" :key="category.handle">
          <v-card>
            <v-card-title class="primary white--text">
              <span>{{ category.title }}</span>
              <v-spacer></v-spacer>
              <v-btn icon small class="my-0" dark @click="toggleTaskForm">
                <v-icon>add</v-icon>
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
              <create-task v-show="showTaskForm" @toggleTaskForm="toggleTaskForm"></create-task>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-list two-line class="py-0">
                <v-list-tile avatar ripple>
                  <v-list-tile-action>
                    <v-checkbox v-model="notifications" color="primary"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile avatar ripple>
                  <v-list-tile-action>
                    <v-checkbox v-model="sound" color="primary"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile avatar ripple>
                  <v-list-tile-action>
                    <v-checkbox v-model="video" color="primary"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile avatar ripple>
                  <v-list-tile-action>
                    <v-checkbox v-model="invites" color="primary"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import CreateTask from './CreateTask'

  export default {
    components: { CreateTask },
    data: () => ({
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
      items: [
        { title: 'Marcar todos' },
        { title: 'Eliminar todos' }
      ],
      showTaskForm: false,
      notifications: false,
      sound: false,
      video: false,
      invites: false
    }),
    methods: {
      toggleTaskForm: function () {
        this.showTaskForm = !this.showTaskForm
      }
    }
  }
</script>
