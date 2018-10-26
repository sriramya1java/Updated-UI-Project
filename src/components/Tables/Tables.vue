<template>
  <div>
    <v-container fluid>
      <v-flex xs12>
        <v-alert :value="showalert" type="error">Please choose only one dataset</v-alert>
        <v-alert :value="generateFileAlert" type="error">The delivery operation didn't go through. Please try again after sometime</v-alert>
        <v-alert :value="showSuccess" type="error">Sucessfully generated the file.</v-alert>
      </v-flex>
      <v-flex xs12 class="text-sm-left">
        <v-tooltip top>
          <v-btn :to="{ name: 'edittable', params: { datasetString: 'new', tableString: 'new' }, query: {debug: true }}" slot="activator" @click="createNewTable">Create a New Table</v-btn>
          <span>Click to Create a New Table</span>
        </v-tooltip>
        <v-btn :disabled="!checked"  @click='fileDelivery'>
          Create Delivery File
        </v-btn>
        <v-select
          :items="programs"
          label="Select a Program"
          clearable
          v-model="program"
          @change="externalFilterChanged(program)">
        </v-select>
      </v-flex>
      <v-flex xs12 text-center class="pa-2">
        <ag-grid-vue style="width: 100%; height: 400px;"
                     class="ag-theme-balham"
                     :gridOptions="gridOptions"
                     :rowDataChanged="onRowDataChanged"
                     :rowSelected="onRowSelected"
                     :rowData="tablesList">
        </ag-grid-vue>
      </v-flex>
      <v-flex xs12 class="text-xs-right">
        <v-dialog v-model="dialog">
          <v-card>
            <v-card-text>Do you want to generate XML for the selected tables? {{ this.exportTablesList }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="generateFile">OK</v-btn>
              <v-btn @click="cancelDelivery">CANCEl</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-layout row justify-center>
        <v-dialog v-model="loading" persistent content-class="loading-dialog">
          <v-container fill-height>
            <v-layout row justify-center align-center>
              <v-progress-circular indeterminate :size="70" :width="7" color="blue"></v-progress-circular>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>
    </v-container>
    <router-view></router-view>
  </div>
</template>
<script>
  import {AgGridVue} from 'ag-grid-vue'
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import DeleteTable from './DeleteTable.vue'
  import EditTable from './EditTable.vue'
  export default {
    name: 'Tables',
    data () {
      return {
        columnDefs: null,
        gridOptions: null,
        tableId: null,
        pathVal: '',
        checked: false,
        showalert: false,
        dialog: false,
        exportTablesList: [],
        loading: false,
        generateFileAlert: false,
        errors: {},
        showSuccess: false,
        viewMenu: false,
        program: undefined
      }
    },
    components: {
      'ag-grid-vue': AgGridVue,
      'delete-component': DeleteTable,
      'edit-component': EditTable
    },
    methods: {
      createColDefs () {
        return [
          {headerName: 'Table ID', field: 'edit', cellRendererFramework: 'edit-component', cellStyle: {textAlign: 'left'}, icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, filter: 'agTextColumnFilter'},
          // {headerName: 'Program', field: 'programString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}, filter: 'agTextColumnFilter'},
          {headerName: 'Dataset', field: 'datasetString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}, filter: 'agTextColumnFilter'},
          /* {headerName: 'Table ID', field: 'tableString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}}, */
          {headerName: 'Component', field: 'componentString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}, filter: 'agTextColumnFilter'},
          {headerName: 'Display Label', field: 'displayLabel', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}, filter: 'agTextColumnFilter'},
          {headerName: 'Last Updated By', field: 'lastUpdatedBy', suppressSorting: true, cellStyle: {textAlign: 'left'}, filter: 'agTextColumnFilter'},
          {headerName: 'Last Updated', field: 'lastUpdated', suppressSorting: true, cellStyle: {textAlign: 'left'}},
          {headerName: 'Last Delivered', field: 'lastDelivered', suppressSorting: true, cellStyle: {textAlign: 'left'}},
          {headerName: 'Delete', field: 'delete', cellRendererFramework: 'delete-component', suppressSorting: true},
          {headerName: 'Deliver', field: 'deliver', suppressSorting: true, headerCheckboxSelection: true, checkboxSelection: function (params) { if (params.data.readyToDeliver === true) { return true } else { return false } }}
        ]
      },
      isExternalFilterPresent () {
        // if program is not undefined, then we are filtering
        console.log('===========', this.program)
        return this.program !== undefined
      },
      doesExternalFilterPass (node) {
        switch (this.program) {
          case this.program: return node.data.programString === this.program
          default: return true
        }
      },
      externalFilterChanged (newValue) {
        console.log('----------', newValue)
        if (newValue !== '' && newValue !== 'undefined') {
          this.program = newValue
          this.gridOptions.api.onFilterChanged()
        }
      },
      onRowDataChanged () {
        Vue.nextTick(() => {
          this.gridOptions.api.sizeColumnsToFit()
        })
      },
      onRowSelected () {
        if (this.gridOptions.api.getSelectedRows().length > 0) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      handler: function (e) {
        // do stuff
        console.log(e)
        this.viewMenu = true
        e.preventDefault()
      },
      createNewTable () {
        this.$store.dispatch('tables/createNewTable')
        this.$store.commit('dimensions/SET_DIMENSIONS', [{'editable': true, 'label': 'Age Group', 'id': 'AGEGROUP', 'type': 'GEO'}, {'editable': true, 'label': 'Date', 'id': 'DATE_', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Description of DATE values', 'id': 'DATE_DESC', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Hispanic Origin', 'id': 'HISP', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Race', 'id': 'RACE', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Sex', 'id': 'SEX', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Universe', 'id': 'UNIVERSE', 'type': 'GCT'}, {'editable': true, 'label': 'Measure', 'id': 'MEASURE', 'type': 'MEASURE'}, {'editable': false, 'label': 'Gct', 'id': 'GCT', 'type': 'GCT'}])
      },
      fileDelivery () {
        let tableValues = []
        let datasetArray = []
        console.log(this.gridOptions.api.getSelectedRows())
        console.log(JSON.stringify(this.gridOptions.api.getSelectedRows()))
        this.gridOptions.api.getSelectedRows().forEach(x => {
          datasetArray.push(x.datasetString)
          tableValues.push(x.tableString)
        })
        const isPresent = datasetArray.every((val, i, arr) => val === arr[0])
        if (!isPresent) {
          this.showalert = true
          this.$store.dispatch('tables/getExportTablesList', [])
        } else {
          this.showalert = false
          this.dialog = true
          this.$store.dispatch('tables/getExportTablesList', this.gridOptions.api.getSelectedRows())
          this.exportTablesList = tableValues
        }
      },
      iconClick (val) {
        // `event` is the native DOM event
      },
      cancelDelivery () {
        this.dialog = false
        this.$store.dispatch('tables/getExportTablesList', [])
      },
      generateFile () {
        this.loading = true
        this.$store.dispatch('tables/postExportTablesList').then(response => {
          // this.showSuccess = true
          console.log('got some response')
          this.loading = false
          this.dialog = false
          alert('Successfully generated delivery file!')
        }, error => {
          this.errors = error
          this.loading = false
          // this.generateFileAlert = true
          this.dialog = false
          console.log('got an error back')
          alert('Delivery operation failed. Please try again after sometime')
        })
      }
    },
    created () {
      this.$store.dispatch('tables/getTables')
      this.gridOptions = {
        rowHeight: 40,
        //  gridAutoHeight: true,
        animateRows: true,
        enableFilter: true,
        isExternalFilterPresent: this.isExternalFilterPresent,
        doesExternalFilterPass: this.doesExternalFilterPass,
        enableColResize: true,
        enableSorting: true,
        sortingOrder: ['asc', 'desc'],
        rowSelection: 'multiple',
        isRowSelectable: function (params) {
          if (params.data.readyToDeliver === true) {
            return true
          } else {
            return false
          }
        },
        suppressRowClickSelection: true,
        columnDefs: this.createColDefs(),
        onGridReady: function (params) {
          params.api.sizeColumnsToFit()
        }
      }
    },
    computed: {
      ...mapGetters({
        tablesList: 'tables/tablesList',
        programs: 'userAndPrograms/programs'
      })
    },
    watch: {
      crumbs () {
      }
    },
    beforeCreate: function () {
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style>
  button:disabled {
    cursor: not-allowed;
  }
</style>
