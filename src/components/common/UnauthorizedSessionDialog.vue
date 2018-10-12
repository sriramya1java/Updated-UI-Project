<template>
  <alert-dialog v-bind:show="visible" v-on:ok-click="close">
    <p class="err-msg">{{ unauthorizedError.message }}</p>
    <p>Please login to continue.</p>
  </alert-dialog>
</template>

<script>
import AlertDialog from '@/components/common/AlertDialog'
import {mapState} from 'vuex'

export default {
  name: 'UnauthorizedSessionDialog',
  components: {
    'alert-dialog': AlertDialog
  },
  data () {
    return {
      dialog: true
    }
  },
  computed: {
    visible () {
      return this.unauthorizedError.status !== undefined
    },
    ...mapState('apiErrors', ['unauthorizedError'])
  },
  methods: {
    close () {
      // clear store, and reload page
      this.$store.dispatch('apiErrors/clearUnauthorizedError')
      window.location.reload()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style scoped>
.err-msg {
  font-weight:bold;
}
</style>