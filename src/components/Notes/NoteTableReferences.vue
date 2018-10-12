<template>
  <div>
    <div>
         <v-toolbar dense>
          <v-toolbar-title>
            Tables Referencing this Note
            </v-toolbar-title>
           </v-toolbar>
           <v-card>
           <v-card-text class="text-sm-left">
             <label v-if="this.isEditing === false">There are no tables associated to this Note.</label>
             <label v-else>{{ message}}</label>
           </v-card-text>
           </v-card>
      </div>
  </div>
</template>
<script>
  import notesService from '../../api/notesService'
  export default {
    name: 'NoteTableReferences',
    props: ['data'],
    data () {
      return {
        error: {},
        tables: [],
        isEditing: false,
        message: ''
      }
    },
    created () {
      if (this.data.programString !== 'new' && this.data.noteString !== 'new' && this.data.programString !== 'undefined' && this.data.noteString !== 'undefined') {
        this.isEditing = true
        notesService.getTablesOnNotes(this.data).then(response => {
          let tableValues = []
          response.body.forEach(x => {
            tableValues.push(x.tableString)
          })
          this.tables = tableValues
          switch (true) {
            case (this.tables.length === 0):
              this.message = 'There are no Tables associated to this Note.'
              break
            case (this.tables.length > 0):
              this.message = 'The note is associated to the following tables ' + this.tables.toString()
              break
          }
        }, error => {
          this.error = error
          console.log(this.error)
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