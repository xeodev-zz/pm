<template>
  <v-container fluid fill-height>
    <v-layout row class="justify-center align-center">
      <v-flex xs12 sm6 xl3>
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            src="/static/partido-morado.jpg"
          >
          </v-card-media>
          <v-card-title primary-title>
            <v-layout>
              <v-flex xs12>
                <h3 class="headline primary--text text-xs-center">{{ texts.title }}</h3>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" dismissible v-model="formErrors.error" class="mb-3">
              {{ formErrors.message }}
            </v-alert>
            <v-form v-model="formSettings.valid" ref="form" lazy-validation @submit.prevent="onSubmit">
              <v-text-field
                label="Email"
                name="pm-email"
                v-model="form.email"
                :rules="formSettings.emailRules"
                class="input-group--focused"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                :append-icon="formSettings.pass_visibility ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (formSettings.pass_visibility = !formSettings.pass_visibility)"
                v-model="form.password"
                :rules="formSettings.passwordRules"
                class="input-group--focused"
                :type="formSettings.pass_visibility ? 'password' : 'text'"
                required
              ></v-text-field>
              <v-layout row>
                <v-flex xs6>
                  <router-link :to="{name: 'Signup'}">{{ texts.signup }}</router-link>
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                  <v-btn type="submit" color="primary" :loading="formSettings.isSubmiting" :disabled="formSettings.isSubmiting">{{ texts.submitButton }}</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        formErrors: {
          error: false,
          message: null
        },
        formSettings: {
          valid: false,
          isSubmiting: false,
          passwordRules: [
            (v) => !!v || 'Password es requerido.'
          ],
          pass_visibility: true,
          emailRules: [
            (v) => !!v || 'Email es requerido.',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'El Email no es válido.'
          ]
        },
        texts: {
          title: 'ACCEDE CON TU CUENTA',
          signup: '¿Aún no tienes una cuenta?',
          submitButton: 'ENTRAR'
        }
      }
    },
    methods: {
      onSubmit () {
        if (!this.$refs.form.validate()) {
          return false
        }
        this.formSettings.isSubmiting = true
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            this.$store.dispatch('autoSignIn', user).then(() => {
              this.formSettings.isSubmiting = false
              this.$router.push({name: 'Projects'})
            })
          })
          .catch(error => {
            this.formErrors.error = true
            this.formErrors.message = error.message
            this.formSettings.isSubmiting = false
          })
      }
    }
  }
</script>
