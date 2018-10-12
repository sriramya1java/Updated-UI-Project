<template>
  <div>
    <v-tooltip top>
      <v-btn :href="'#/notes/editnote/' + params.data.programString + '/' + params.data.noteString" slot="activator" color="blue" flat small @click="editNote"><v-icon small>edit</v-icon></v-btn>
      <span>Click here to edit the table</span>
    </v-tooltip>
  </div>
</template>
<script>
  import store from '../../../store/store.js'
  export default {
    store: store,
    name: 'EditNote',
    methods: {
      // dispatches an action to get the existing table data
      editNote () {
        console.log('edit editNote ------------------')
      }
    }
  }
</script>