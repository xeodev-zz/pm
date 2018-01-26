<template>
  <v-flex>
    <v-card>
      <v-card-title primary-title>
        <v-layout>
          <v-flex xs12>
            <h3 class="headline">{{ project.title }}</h3>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        {{ project.description }}
      </v-card-text>
      <v-card-actions>
        <v-btn flat color="primary">{{ texts.share }}</v-btn>
        <v-btn flat color="primary" :to="{name: 'Project', params: {id: project['.key']}}">{{ texts.seeMore }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    props: ['project'],
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
