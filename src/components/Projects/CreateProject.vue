<template>
  <v-flex xs12>
    <div class="text-xs-center text-sm-right">
      <v-btn @click="openModal" color="primary" class="mx-0">
        <v-icon left dark>add</v-icon>
        {{ texts.newProject }}
      </v-btn>
    </div>
    <sweet-modal :title="texts.newProject" ref="modal">
      <v-form v-model="settings.formIsValid" ref="form" lazy-validation @submit.prevent="onSubmit">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field :label="texts.title" name="np-title" v-model="form.title" :rules="rules.title" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field multi-line :label="texts.description" name="np-description" v-model="form.description" :rules="rules.description" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-switch :label="texts.isPublic" v-model="form.public" color="success"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 class="text-xs-center text-sm-right">
            <v-btn type="submit" color="primary" class="mx-0" :loading="settings.isSubmiting" :disabled="settings.isSubmiting">{{ texts.submitButton}}</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </sweet-modal>
  </v-flex>
</template>

<script>
  import { db } from '../../database/db'
  import { mapState } from 'vuex'
  export default {
    created () {
      this.form.userID = this.user.uid
      this.form.user = this.user
      this.originalForm = JSON.parse(JSON.stringify(this.form))
    },
    data () {
      return {
        form: {
          title: '',
          description: '',
          public: true,
          user: null,
          userID: null,
          order: 0,
          timestamp: 0
        },
        originalForm: {},
        texts: {
          title: 'Título',
          description: 'Descripción',
          public: 'Público',
          private: 'Privado',
          submitButton: 'Crear Proyecto',
          newProject: 'Nuevo Proyecto',
          isPublic: 'Público'
        },
        rules: {
          title: [
            (v) => !!v || 'Título es requerido.'
          ],
          description: [
            (v) => !!v || 'Descripción es requerido.'
          ]
        },
        settings: {
          formIsValid: true,
          isSubmiting: false
        }
      }
    },
    methods: {
      onSubmit: function () {
        if (!this.$refs.form.validate()) {
          return false
        }
        this.settings.isSubmiting = true
        this.form.timestamp = Math.round(new Date() / 1000)
        this.form.order = 0 - this.form.timestamp
        db.ref('projects').push(this.form)
          .then((project) => {
            console.log(project)
            this.settings.isSubmiting = false
            this.closeModal()
            this.cleanForm()
            this.$store.dispatch('snackbar', { text: '¡El proyecto ' + this.form.title + ' ha sido creado!' })
            this.$router.push({name: 'Project', params: {id: project.key}})
          })
      },
      cleanForm: function () {
        this.$refs.form.reset()
        this.form = this.originalForm
      },
      openModal: function () {
        this.$refs.modal.open()
      },
      closeModal: function () {
        this.$refs.modal.close()
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>
