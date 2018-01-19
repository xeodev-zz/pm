<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <create-project></create-project>
      <v-flex xs12 sm6 lg4 xl3 v-for="project in projects" :key="project['.key']">
        <v-card>
          <v-card-title primary-title>
            <v-layout>
              <v-flex xs12>
                <h3 class="headline">{{ project.title }}</h3>
                <span class="grey--text">19 de enero, 2019</span>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">{{ texts.share }}</v-btn>
            <v-btn flat color="primary">{{ texts.seeMore }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { db } from '../../database/db'
  import CreateProject from './CreateProject'
  export default {
    components: { CreateProject },
    firebase: {
      projects: db.ref('projects')
    },
    data () {
      return {
        texts: {
          share: 'Compartir',
          seeMore: 'Ver más'
        }
      }
    }
  }
</script>
