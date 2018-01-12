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
                label="Nombres"
                name="pm-name"
                v-model="form.name"
                :rules="formSettings.nameRules"
                class="input-group--focused"
                required
              ></v-text-field>
              <v-text-field
                label="Apellidos"
                name="pm-lastname"
                v-model="form.lastName"
                :rules="formSettings.lastNameRules"
                class="input-group--focused"
                required
              ></v-text-field>
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
                  <span>{{ texts.haveAccount }}</span>
                  <router-link :to="{name: 'Signin'}">{{ texts.signin }}</router-link>
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                  <v-btn type="submit" color="primary" :loading="formSettings.isSubmiting" :disabled="formSettings.isSubmiting">Registrar</v-btn>
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
  import firebase from 'firebase'
  import { db } from '../../database/db'
  export default {
    data () {
      return {
        form: {
          name: '',
          lastName: '',
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
            (v) => !!v || 'Password es requerido.',
            (v) => v.length >= 8 || 'El password debe contener mínimo 8 caracteres.'
          ],
          pass_visibility: true,
          emailRules: [
            (v) => !!v || 'Email es requerido.',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'El Email no es válido.'
          ],
          nameRules: [
            (v) => !!v || 'Nombres es requerido.'
          ],
          lastNameRules: [
            (v) => !!v || 'Apellidos es requerido.'
          ]
        },
        texts: {
          title: 'REGÍSTRATE Y FORMA PARTE DE LOS PROYECTOS DE PUENTE PIEDRA',
          haveAccount: 'Ya tengo una cuenta.',
          signin: 'Ir al login.'
        }
      }
    },
    methods: {
      onSubmit () {
        if (!this.$refs.form.validate()) {
          return false
        }
        this.formSettings.isSubmiting = true
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            let userData = {
              uid: user.uid,
              name: this.form.name,
              lastName: this.form.lastName,
              email: user.email,
              DNI: '',
              address: '',
              birthday: '',
              gender: '',
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/proyectos-puente-piedra.appspot.com/o/users%2Fdefault-user.jpg?alt=media&token=892e70b5-f9a6-4564-9323-cfe4f39a86f8',
              position: 'Miembro del Partido',
              profession: '',
              isValidate: false,
              isAdmin: false,
              isCompleted: false
            }
            db.ref('users/' + user.uid).set(userData)
            this.$store.dispatch('autoSignIn', user).then(() => {
              this.formSettings.isSubmiting = false
              this.$store.dispatch('snackbar', { text: '¡Tu cuenta ha sido creada!' })
              this.$router.push({name: 'Profile'})
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
