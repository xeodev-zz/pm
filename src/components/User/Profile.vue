<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg8 xl9>
        <v-card>
          <v-card-title primary-title>
            <v-layout>
              <v-flex xs12>
                <h3 class="headline primary--text text-xs-center">{{ texts.title }}</h3>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <v-form v-model="settings.valid" ref="form" lazy-validation @submit.prevent="onSubmit">
              <v-layout row wrap>
                <v-flex xs12 lg6 xl4>
                  <v-text-field :label="texts.name" name="pm-name" v-model="form.name" :rules="rules.name" required></v-text-field>
                </v-flex>
                <v-flex xs12 lg6 xl4>
                  <v-text-field :label="texts.lastName" name="pm-lastname" v-model="form.lastName" :rules="rules.lastName" required></v-text-field>
                </v-flex>
                <v-flex xs12 lg6 xl4>
                  <v-text-field :label="texts.DNI" name="pm-dni" v-model="form.DNI" :rules="rules.DNI" required></v-text-field>
                </v-flex>
                <v-flex xs12 lg6 xl4>
                  <v-dialog persistent v-model="settings.birthdayModal" lazy full-width width="290px">
                    <v-text-field slot="activator" :label="texts.birthday" :rules="rules.birthday" v-model="form.birthday" readonly required></v-text-field>
                    <v-date-picker v-model="form.birthday" :first-day-of-week="1" locale="es-sp" scrollable actions>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">{{ texts.cancel }}</v-btn>
                          <v-btn flat color="primary" @click="save">{{ texts.select }}</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 lg6 xl4>
                  <v-select :items="prefaxs.gender" v-model="form.gender" :label="texts.gender" :rules="rules.gender" item-value="value" item-text="label" required></v-select>
                </v-flex>
                <v-flex xs12 lg6 xl4>
                  <v-text-field :label="texts.profession" name="pm-profession" v-model="form.profession" :rules="rules.profession" required></v-text-field>
                </v-flex>
                <v-flex xs12 lg12 xl4>
                  <v-text-field :label="texts.address" name="pm-address" v-model="form.address" :rules="rules.address" required></v-text-field>
                </v-flex>
                <v-flex xs12 lg6 xl4>
                  <v-text-field :label="texts.email" name="pm-email" :value="form.email" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 lg6 xl4>
                  <v-text-field :label="texts.position" name="pm-position" :value="form.position" disabled></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 class="text-xs-center text-sm-right">
                  <v-btn type="submit" color="primary" :loading="settings.isSubmiting" :disabled="settings.isSubmiting">{{ texts.submitButton}}</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 lg4 xl3 text-xs-center>
        <v-card>
          <v-card-text>
            <v-avatar :tile="false" :size="settings.avatarSize" class="grey lighten-4">
              <img :src="user.photoURL" :alt="user.name">
            </v-avatar>
            <image-uploader :storage-route="storageRoute" :on-complete="uploadPhoto"></image-uploader>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  import { db } from '../../database/db'
  export default {
    data () {
      return {
        form: {
          name: null,
          lastName: null,
          email: null,
          DNI: null,
          address: null,
          birthday: null,
          gender: null,
          photoURL: null,
          position: null,
          profession: null
        },
        settings: {
          valid: false,
          isSubmiting: false,
          avatarSize: 270,
          birthdayModal: false
        },
        rules: {
          name: [
            (v) => !!v || 'Nombres es requerido.'
          ],
          lastName: [
            (v) => !!v || 'Apellidos es requerido.'
          ],
          DNI: [
            (v) => !!v || 'DNI es requerido.'
          ],
          address: [
            (v) => !!v || 'Dirección es requerido.'
          ],
          profession: [
            (v) => !!v || 'Profesión es requerido.'
          ],
          birthday: [
            (v) => !!v || 'Fecha de Nacimiento es requerido.'
          ],
          gender: [
            (v) => !!v || 'Género es requerido.'
          ]
        },
        texts: {
          name: 'Nombres',
          lastName: 'Apellidos',
          DNI: 'DNI',
          email: 'Correo Electrónico',
          address: 'Dirección',
          birthday: 'Fecha de Nacimiento',
          gender: 'Género',
          photoURL: 'Photo',
          position: 'Cargo',
          profession: 'Profesión',
          title: 'Tu Información Personal',
          select: 'Seleccionar',
          cancel: 'Cancelar',
          submitButton: 'Actualizar Información'
        },
        prefaxs: {
          gender: [
            {
              'label': 'Masculino',
              'value': 'm'
            },
            {
              'label': 'Femenino',
              'value': 'f'
            }
          ]
        }
      }
    },
    created () {
      this.form.name = this.user.name
      this.form.lastName = this.user.lastName
      this.form.email = this.user.email
      this.form.DNI = this.user.DNI
      this.form.address = this.user.address
      this.form.birthday = this.user.birthday
      this.form.gender = this.user.gender
      this.form.photoURL = this.user.photoURL
      this.form.position = this.user.position
      this.form.profession = this.user.profession
    },
    computed: {
      ...mapState(['user']),
      storageRoute () {
        return 'users/' + this.user.uid
      }
    },
    methods: {
      onSubmit () {
        if (!this.$refs.form.validate()) {
          return false
        }
        this.settings.isSubmiting = true
        db.ref('/users/' + this.user.uid).update(this.form).then(() => {
          this.settings.isSubmiting = false
        })
      },
      uploadPhoto (photo) {
        console.log(photo)
        db.ref('/users/' + this.user.uid).update({ photoURL: photo.downloadURL }).then(() => {
          console.log('cambie todo')
        })
      }
    }
  }
</script>
