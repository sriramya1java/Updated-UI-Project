<template>
<div>
  <v-dialog width="500" v-model="dialog">
    <v-btn small slot="activator" color="blue" flat fab>
      <v-icon @click="deleteNote()">delete</v-icon>
    </v-btn>
    <v-card>
      <v-card-text>
        {{ deleteNoteMessage }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="confirmDeleteNote()">OK</v-btn>
      <v-btn @click="dialog = false">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-layout row justify-center>
        <v-dialog v-model="loading" persistent content-class="loading-dialog" width="500">
          <v-container fill-height>
            <v-layout row justify-center align-center>
              <v-progress-circular indeterminate :size="70" :width="7" color="blue"></v-progress-circular>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>
 </div>     
</template>
<script>
  import store from '../../../store/store.js'
  import notesService from '../../api/notesService'
  export default {
    store: store,
    name: 'DeleteTable',
    data () {
      return {
        dialog: false,
        loading: false,
        error: {},
        tables: [],
        deleteNoteMessage: ''
      }
    },
    methods: {
      deleteNote () {
        notesService.getTablesOnNotes(this.params.data).then(response => {
          let tableValues = []
          let datasetValues = []
          let deliveredValues = []
          response.body.forEach(x => {
            tableValues.push(x.tableString)
            datasetValues.push(x.datasetString)
            deliveredValues.push(x.delivered)
          })
          console.log(response.bodyText)
          const isPresent = datasetValues.every((val, i, arr) => val === arr[0])
          this.tables = tableValues
          console.log(deliveredValues)
          let isDelivered = deliveredValues.some(function (item) { return item === 'True' })
          console.log(!isPresent)
          console.log('isDelivered', isDelivered)
          console.log('is present ', isPresent)
          console.log('tables length', this.tables.length)
          switch (true) {
            case (this.tables.length === 0):
              this.deleteNoteMessage = 'Do you want to delete the unused note? ' + this.params.data.noteString
              break
            case (this.tables.length > 0 && !isPresent):
              this.deleteNoteMessage = 'The note ' + this.params.data.noteString + ' is used by ' + this.tables.length + ' tables in multiple datasets. Are you really sure you want to delete all instances of the note and the note itself?'
              break
            case (this.tables.length > 0 && isPresent):
              switch (isDelivered) {
                case true:
                  this.deleteNoteMessage = 'The note ' + this.params.data.noteString + ' is used by ' + this.tables.length + ' tables in dataset ' + datasetValues[0] + ' .Some of these tables have already been delivered. Are you sure you want to delete all instances '
                  break
                case false:
                  this.deleteNoteMessage = 'The note ' + this.params.data.noteString + ' is used by ' + this.tables.length + ' undelivered tables in dataset ' + datasetValues[0] + ' . Delete all instances of the note and the note itself? '
                  break
              }
              break
          }
        }, error => {
          this.error = error
        })
      },
      confirmDeleteNote () {
        this.loading = true
        notesService.deleteNote(this.params.data).then(response => {
          this.dialog = false
          this.loading = false
          this.$store.dispatch('notes/getNotes')
        }, error => {
          this.loading = false
          this.error = error
          alert('Error in deleting the table. Please try again after sometime')
        })
      }
    }
  }
</script>
<style scoped>
  span {
    font-weight: bold;
  }
</style>