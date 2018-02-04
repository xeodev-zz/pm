<template>
  <v-form class="create_task_box" v-model="settings.formIsValid" ref="form" lazy-validation @submit.prevent="onSubmit">
    <v-layout row wrap>
      <v-flex xs12 class="pb-0">
        <v-text-field
          class="input-group--focused"
          label="Nueva tarea"
          :rules="titleRules"
          v-model="form.title"
          multi-line
          rows="2"
        ></v-text-field>
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
  export default {
    data: () => ({
      form: {
        title: ''
      },
      titleRules: [
        v => {
          return !!v || 'Este campo es requerido'
        }
      ],
      settings: {
        formIsValid: true,
        isSubmiting: false
      },
      texts: {
        submitButton: 'Crear',
        cancelButton: 'Cancelar'
      }
    }),
    methods: {
      onSubmit: function () {
        if (!this.$refs.form.validate()) {
          return false
        }
        this.settings.isSubmiting = true
      },
      toggleTaskForm: function () {
        this.$emit('toggleTaskForm')
      }
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
