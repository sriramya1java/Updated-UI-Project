<template>
  <div>
    <v-tooltip top>
      <v-btn :href="'#/tables/edittable/' + params.data.datasetString + '/' + params.data.tableString" slot="activator" color="blue" flat small @click="editTable">{{ params.data.tableString }}</v-btn>
      <span>Click here to edit the table</span>
    </v-tooltip>
  </div>
</template>
<script>
  import store from '../../../store/store.js'
  export default {
    store: store,
    name: 'EditTable',
    methods: {
      editTable () {
        console.log('edit table ------------------')
        this.$store.dispatch('tables/getExistingTableData', this.params.data)
      }
    }
  }
</script>
