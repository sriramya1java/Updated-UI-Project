<template>
  <div>
    <v-container fluid v-if="pathVal === 'Tables'">
      <v-flex xs12>
        <v-alert :value="showalert" type="error">Please choose only one dataset</v-alert>
        <v-alert :value="generateFileAlert" type="error">The delivery operation didn't go through. Please try again after sometime</v-alert>
        <v-alert :value="showSuccess" type="error">Sucessfully generated the file.</v-alert>
      </v-flex>
      <v-flex xs12 class="text-sm-left">
        <v-tooltip top>
        <v-btn :to="{ name: 'edittable', params: { tableString: 'new' }}" slot="activator">Create a New Table</v-btn>
        <span>Click to Create a New Table</span>
      </v-tooltip>
      </v-flex>
      <v-flex xs12 text-center class="pa-2">
        <ag-grid-vue style="width: 100%; height: 200px;"
                         class="ag-theme-balham"
                         :gridOptions="gridOptions"
                         :rowDataChanged="onRowDataChanged"
                         :rowSelected="onRowSelected"
                         :rowData="tablesList">
        </ag-grid-vue>
      </v-flex>
      <v-flex xs12 class="text-xs-right">
        <v-btn :disabled="!checked"  @click='fileDelivery'>
          Create Delivery File
        </v-btn>
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
  import VueRouter from 'vue-router'
  import { mapGetters } from 'vuex'
  const router = new VueRouter()
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
        showSuccess: false
      }
    },
    components: {
      'ag-grid-vue': AgGridVue,
      /* 'edit-component': {
        router,
        template: '<router-link to="/edittable">edit table</router-link>'
      }, */
      'delete-component': {
        router,
        template: '<a @click="deleteTable"><i class="fa fa-trash"></i></a>',
        methods: {
          deleteTable () {
            confirm('Do you want to delete the table')
          }
        }
      }
    },
    methods: {
      createColDefs () {
        return [
          {headerName: 'Table ID', field: 'edit', cellRenderer: tableCellRenderer, cellStyle: {textAlign: 'left'}, icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}},
          {headerName: 'Program', field: 'programString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}},
          {headerName: 'Dataset', field: 'datasetString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}},
          /* {headerName: 'Table ID', field: 'tableString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}}, */
          {headerName: 'Component', field: 'componentString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}},
          {headerName: 'Display Label', field: 'displayLabel', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, cellStyle: {textAlign: 'left'}},
          {headerName: 'Last Updated By', field: 'lastUpdatedBy', suppressSorting: true, cellStyle: {textAlign: 'left'}},
          {headerName: 'Last Updated', field: 'lastUpdated', suppressSorting: true, cellStyle: {textAlign: 'left'}},
          {headerName: 'Last Delivered', field: 'lastDelivered', suppressSorting: true, cellStyle: {textAlign: 'left'}},
          {headerName: 'Delete', field: 'delete', cellRendererFramework: 'delete-component', suppressSorting: true},
          {headerName: 'Deliver', field: 'deliver', suppressSorting: true, headerCheckboxSelection: true, checkboxSelection: function (params) { if (params.data.readyToDeliver === true) { return true } else { return false } }}
        ]
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
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        sortingOrder: ['asc', 'desc'],
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        columnDefs: this.createColDefs(),
        onGridReady: function (params) {
          params.api.sizeColumnsToFit()
        }
      }
    },
    computed: {
      crumbs () {
        this.pathVal = this.$route.name
      },
      ...mapGetters({
        tablesList: 'tables/tablesList'
      })
    },
    watch: {
      crumbs () {
      }
    },
    beforeCreate: function () {
    }
  }
  function tableCellRenderer (params) {
    if (params !== undefined && params !== null) {
      let aTag = document.createElement('a')
      let abc = params.data.tableString
      aTag.setAttribute('href', '#/tables/edittable/' + abc)
      aTag.innerHTML = abc
      return aTag
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style>
  button:disabled {
    cursor: not allowed;
  }
</style>
