<template>
  <v-card flat class="grey lighten-5">
    <v-card-text>
      <div class="t_desc" v-if="!triggers.editDescription" @click="toggleEditDescription">
        <div class="t_desc_empty_description" v-if="!existDescription">{{ texts.empty_description}}</div>
        <div v-else>{{ task.description }}</div>
        <v-icon>edit</v-icon>
      </div>
      <div class="t_desc_edit" v-if="triggers.editDescription">
        <v-text-field class="pa-0" ref="inputDescription" :label="texts.empty_description" v-model="fakers.description" full-width multi-line single-line rows="1" auto-grow @blur="updateDescription"></v-text-field>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import { db } from '../../../../database/db'
  import { mapState } from 'vuex'
  export default {
    created () {
      this.fakers.description = this.task.description || ''
    },
    data () {
      return {
        fakers: {
          description: ''
        },
        triggers: {
          editDescription: false
        },
        texts: {
          empty_description: 'Añade una descripción'
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
          this.$store.dispatch('snackbar', { text: '¡La descripcion de la tarea ha sido actualizada!' })
        })
      }
    },
    computed: {
      ...mapState(['project', 'task']),
      existDescription: function () {
        return this.task.description && this.task.description !== ''
      }
    }
  }
</script>
