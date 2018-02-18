<template>
  <v-card flat class="grey lighten-5 task_details">
    <v-card-text>
      <div class="t_desc" v-if="!triggers.editDescription" @click="toggleEditDescription">
        <div class="t_desc_empty_description" v-if="!existDescription">{{ texts.empty_description}}</div>
        <div v-else>{{ task.description }}</div>
        <v-icon>edit</v-icon>
      </div>
      <div class="t_desc_edit" v-if="triggers.editDescription">
        <v-text-field class="pa-0" ref="inputDescription" :label="texts.empty_description" v-model="fakers.description" full-width multi-line single-line rows="1" auto-grow @blur="updateDescription"></v-text-field>
      </div>
      <v-list three-line>
        <task-date :date_key="'start_date'" :date_value="fakers.start_date"></task-date>
        <task-date :date_key="'finish_date'" :date_value="fakers.finish_date"></task-date>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
  import { db } from '../../../../database/db'
  import { mapState } from 'vuex'
  import TaskDate from './TaskDate'

  export default {
    components: { TaskDate },
    created () {
      this.initValues()
    },
    data () {
      return {
        fakers: {
          description: '',
          start_date: '',
          finish_date: ''
        },
        triggers: {
          editDescription: false,
          openStartDateModal: false
        },
        texts: {
          empty_description: 'Añade una descripción',
          start_date: 'Fecha de Inicio',
          cancel: 'Cancelar',
          select: 'Seleccionar'
        }
      }
    },
    methods: {
      toggleEditDescription: function () {
        this.triggers.editDescription = !this.triggers.editDescription
        if (this.triggers.editDescription) setTimeout(() => { this.$refs.inputDescription.focus() }, 150)
      },
      updateDescription: function () {
        this.toggleEditDescription()
        if (this.task.description === this.fakers.description) return
        db.ref('/projects/' + this.project['.key'] + '/tasks/' + this.task['.key'] + '/description').set(this.fakers.description).then(() => {
          this.$store.dispatch('snackbar', { text: '¡La descripción de la tarea ha sido actualizada!' })
        })
      },
      updateStartDate: function () {
        this.triggers.openStartDateModal = false
        db.ref('/projects/' + this.project['.key'] + '/tasks/' + this.task['.key'] + '/start_date').set(this.fakers.start_date).then(() => {
          this.$store.dispatch('snackbar', { text: '¡La Fecha de Inicio de la tarea ha sido actualizada!' })
        })
      },
      initValues: function () {
        this.fakers.description = this.task.description || ''
        this.fakers.start_date = this.task.start_date || ''
        this.fakers.finish_date = this.task.finish_date || ''
      }
    },
    computed: {
      ...mapState(['project', 'task']),
      existDescription: function () {
        return this.task.description && this.task.description !== ''
      }
    },
    watch: {
      task: {
        handler: function () {
          this.initValues()
        },
        deep: true
      }
    }
  }
</script>
