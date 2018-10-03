<template>
  <div>
    <v-container fluid v-if="pathVal === 'Notes'">
      <v-flex xs12 class="text-sm-left">
        <v-tooltip top>
          <v-btn :to="{ name: 'editnote', params: { noteString: 'new' }, query: { debug: true }}" slot="activator">Create a New Note</v-btn>
          <span>Click to Create a New Note</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs12 text-center class="pa-2">
        <ag-grid-vue style="width: 100%; height: 200px;"
                     class="ag-theme-balham"
                     :gridOptions="gridOptions"
                     :rowDataChanged="onRowDataChanged"
                     :rowData="rowData">
        </ag-grid-vue>
      </v-flex>
    </v-container>
    <router-view></router-view>
  </div>
</template>
<script>
  import {AgGridVue} from 'ag-grid-vue'
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  const router = new VueRouter()
  export default {
    name: 'Notes',
    data () {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        tableId: null,
        pathVal: '',
        noteTitle: null
      }
    },
    components: {
      'ag-grid-vue': AgGridVue,
      'edit-component': {
        router,
        template: '<router-link to="/edittable">edit table</router-link>'
      },
      'delete-component': {
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
          {headerName: 'Edit', field: 'edit', cellRenderer: noteCellRenderer, suppressSorting: true},
          {headerName: 'Program ID', field: 'programString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, sort: 'asc'},
          {headerName: 'Note Title', field: 'noteString'},
          {headerName: 'Contents Preview', field: 'notePreview'},
          {headerName: 'Position', field: 'noteTypeString'},
          {headerName: 'Last Updated By', field: 'lastUpdatedBy'},
          {headerName: 'Last Updated', field: 'lastUpdatedDate'},
          {headerName: 'Delete', field: 'delete', cellRendererFramework: 'delete-component', suppressSorting: true}
        ]
      },
      onRowDataChanged () {
        Vue.nextTick(() => {
          this.gridOptions.api.sizeColumnsToFit()
        })
      },
      iconClick: function (event) {
        // `event` is the native DOM event
        if (event) {
          confirm('Do you want to delete the note ' + event.target.id + ' ?')
          this.noteTitle = event.target.id
        }
      },
       /* fetches all the notes according to the user program upon component creation, this will be called in component "CREATED" lifecycle hook in the current component.  */
      fetchNotes () {
        /* this.$http.get('http://localhost:8080/meta2/api/summary/notes') */
        this.$http.get('/meta2/api/summary/notes')
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.rowData = data
            // console.log(this.rowData)
          }, (error) => {
            // console.log('printing error for http call')
            console.log(error.status)
          })
      }
    },
    created () {
      this.fetchNotes()
      this.gridOptions = {
        enableColResize: true,
        enableSorting: true,
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
      }
    },
    watch: {
      crumbs () {
      }
    }
  }
  function noteCellRenderer (params) {
    if (params !== undefined && params !== null) {
      let aTag = document.createElement('a')
      let abc = params.data.noteString
      aTag.setAttribute('href', '#/updatedNotesList/editnote/' + abc)
      aTag.innerHTML = '<i class="fa fa-edit">'
      return aTag
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
