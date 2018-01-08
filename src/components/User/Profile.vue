<template>
  <div>
    {{ user.name }} y el nombre del form es {{ form.name }} {{ form.lastName }}
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        form: {}
      }
    },
    created () {
      this.form = this.user
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>
