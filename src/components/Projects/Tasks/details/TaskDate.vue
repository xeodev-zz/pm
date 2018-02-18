<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-icon>date_range</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ texts[date_key] }}:</v-list-tile-title>
      <v-list-tile-sub-title>
        <v-menu lazy
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="0"
                min-width="290px"
                v-model="triggers.openDatePicker">
          <div :class="'task_item_value'" slot="activator">
            <template v-if="date_value !== ''">{{ date_value }}</template>
            <template v-else><v-icon>add</v-icon></template>
          </div>
          <v-date-picker v-model="date" :first-day-of-week="1" locale="es-sp" scrollable actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="triggers.openDatePicker = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="updateStartDate">{{ texts.select }}</v-btn>
          </v-date-picker>
        </v-menu>
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import { db } from '../../../../database/db'
  import { mapState } from 'vuex'
  export default {
    props: ['date_key', 'date_value'],
    data () {
      return {
        date: '',
        triggers: {
          editDescription: false,
          openDatePicker: false
        },
        texts: {
          start_date: 'Fecha de Inicio',
          finish_date: 'Fecha de Termino',
          cancel: 'Cancelar',
          select: 'Seleccionar'
        }
      }
    },
    methods: {
      updateStartDate: function () {
        this.triggers.openDatePicker = false
        db.ref('/projects/' + this.project['.key'] + '/tasks/' + this.task['.key'] + '/' + this.date_key).set(this.date).then(() => {
          this.$store.dispatch('snackbar', { text: '¡La ' + this.texts[this.date_key] + ' de la tarea ha sido actualizada!' })
        })
      }
    },
    computed: {
      ...mapState(['project', 'task'])
    },
    watch: {
      date_value: function () {
        this.date = this.date_value
      }
    }
  }
</script>
