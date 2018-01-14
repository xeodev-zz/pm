<template>
  <v-layout row wrap>
    <v-btn :loading="isLoading" :disabled="isLoading" color="primary" @click="onPickFile">
      {{ text }}
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
    <v-progress-circular v-bind:size="45" v-bind:width="5" v-bind:rotate="-90" v-bind:value="progressPercentage" color="primary" v-if="isLoading">
      {{ progressPercentage }}%
    </v-progress-circular>
    <input type="file" style="display: none" ref="fileInput" :accept="accept" @change="onFilePicked">
  </v-layout>
</template>
<script>
  import { storage } from '../../database/db'
  import * as firebase from 'firebase'

  export default {
    props: {
      text: {
        type: String,
        default: 'Subir'
      },
      accept: {
        type: String,
        default: '*'
      },
      storageRoute: {
        type: String,
        default: null
      },
      onComplete: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        isLoading: false,
        progressPercentage: 0
      }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        let self = this
        self.isLoading = true
        const files = event.target.files
        let file = files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        let uploadTask = storage.ref(this.storageRoute).put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function (snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            self.progressPercentage = parseInt(progress)
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                break
              case firebase.storage.TaskState.RUNNING:
                break
            }
          }, function (error) {
            console.log(error)
            self.isLoading = false
            event.target.value = ''
            this.$store.dispatch('snackbar', { text: '¡Hubo un problema al cargar el archivo! ¡Inténtalo de nuevo!', color: 'error' })
          }, function () {
            let fileUploaded = uploadTask.snapshot
            self.isLoading = false
            event.target.value = ''
            self.onComplete(fileUploaded)
          })
      }
    }
  }
</script>
