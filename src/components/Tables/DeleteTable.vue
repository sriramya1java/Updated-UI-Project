<template>
  <div>
    <v-dialog width="500" v-model="dialog">
      <v-btn small slot="activator" color="blue" flat fab>
        <v-icon>delete</v-icon>
      </v-btn>
      <v-card>
        <v-card-text>
          Do you want to delete the table {{ params.data.tableString }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteTable">OK</v-btn>
          <v-btn @click="cancelDeleteTable">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout row justify-center>
      <v-dialog v-model="loading" persistent content-class="loading-dialog">
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
  export default {
    store: store,
    name: 'DeleteTable',
    data () {
      return {
        dialog: false,
        loading: false,
        error: {}
      }
    },
    methods: {
      deleteTable () {
        console.log(this.params.data)
        this.loading = true
        this.$store.dispatch('tables/getDeleteTableData', this.params.data).then((response) => {
          console.log('response')
          this.loading = false
          this.dialog = false
          alert('deleted successfully')
        }, error => {
          this.errors = error
          this.loading = false
          // this.generateFileAlert = true
          this.dialog = false
          console.log('got an error back')
          alert('delete operation failed. Please try again after sometime')
        })
      },
      cancelDeleteTable () {
        console.log('cancelling')
        this.dialog = false
      }
    }
  }
</script>
<style scoped>
</style>
