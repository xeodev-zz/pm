<template>
  <v-form class="create_task_box" v-model="settings.formIsValid" ref="form" lazy-validation @submit.prevent="onSubmit">
    <v-layout row wrap>
      <v-flex xs12 class="pb-0">
        <v-text-field class="input-group--focused" :label="texts.newTask" :rules="titleRules" :counter="settings.titleSize" v-model="form.title" multi-line rows="2"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center text-sm-right py-0">
        <v-btn  small color="grey lighten-1" class="mx-0 mt-0 white--text" :disabled="settings.isSubmiting" @click="toggleTaskForm">{{ texts.cancelButton}}</v-btn>
        <v-btn  small type="submit" color="primary" class="mr-0 mt-0" :loading="settings.isSubmiting" :disabled="settings.isSubmiting">{{ texts.submitButton}}</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  import { db } from './../../../database/db'
  import { mapState } from 'vuex'
  export default {
    props: ['category'],
    created () {
      this.form.category = this.category.title
      this.originalForm = JSON.parse(JSON.stringify(this.form))
    },
    data: () => ({
      form: {
        title: '',
        description: '',
        category: '',
        done: false,
        managers: [],
        comments: [],
        tags: [],
        color: '',
        start_date: '',
        end_date: '',
        created_at: '',
        updated_at: ''
      },
      originalForm: {},
      titleRules: [
        (v) => !!v || 'Este campo es requerido.',
        (v) => v.length <= 80 || 'El máximo de caracteres permitidos es 80'
      ],
      settings: {
        formIsValid: true,
        isSubmiting: false,
        titleSize: 80
      },
      texts: {
        submitButton: 'Crear',
        cancelButton: 'Cancelar',
        newTask: 'Nueva Tarea'
      }
    }),
    methods: {
      onSubmit: function () {
        if (!this.$refs.form.validate()) {
          return false
        }
        this.settings.isSubmiting = true
        db.ref('projects/' + this.project['.key'] + '/tasks').push(this.form)
          .then(() => {
            this.settings.isSubmiting = false
            this.$store.dispatch('snackbar', { text: '¡Tarea creada satisfactoriamente!' })
            this.cleanForm()
          })
          .catch(() => {
            this.settings.isSubmiting = false
            this.$store.dispatch('snackbar', { text: '¡Ha ocurrido un error! ¡Inténtalo de nuevo!', color: 'error' })
          })
      },
      cleanForm: function () {
        this.$refs.form.reset()
        this.form = JSON.parse(JSON.stringify(this.originalForm))
      },
      toggleTaskForm: function () {
        this.$emit('toggleTaskForm')
      }
    },
    computed: {
      ...mapState(['project'])
    }
  }
</script>

<style>
  .create_task_box{
    background-color: #fff;
    border: 1px solid #000000;
    padding: 10px;
    margin-top: 10px !important;
    border-radius: 10px;
    width: 100%;
  }
</style>
