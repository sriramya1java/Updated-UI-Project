<template>
  <div>
    <v-container fluid v-if="pathVal === 'Notes'">
      <v-flex xs12 class="text-sm-left">
        <v-tooltip top>
          <v-btn :to="{ name: 'editnote', params: { programString: 'new', noteString: 'new' }, query: { debug: true }}" slot="activator">Create a New Note</v-btn>
          <span>Click to Create a New Note</span>
        </v-tooltip>
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
                     :rowData="notesList">
        </ag-grid-vue>
      </v-flex>
    </v-container>
    <router-view></router-view>
  </div>
</template>
<script>
  import {AgGridVue} from 'ag-grid-vue'
  import Vue from 'vue'
  // import VueRouter from 'vue-router'
  import { mapGetters } from 'vuex'
  import EditNote from './EditNote.vue'
  import DeleteNote from './DeleteNote.vue'
  // const router = new VueRouter()
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
      'edit-component': EditNote,
      'delete-component': DeleteNote
    },
    methods: {
      stringComparator (a, b) {
        a = a.toLowerCase()
        b = b.toLowerCase()
        let alphabet = '-_01234567989abcdefghijklmnopqrstuvwxyz'
        let length = Math.min(a.length, b.length)
        for (let i = 0; i < length; i++) {
          let lowerValueA = alphabet.indexOf(a[i])
          console.log(lowerValueA)
          let lowerValueB = alphabet.indexOf(b[i])
          console.log(lowerValueB)
          return lowerValueA === lowerValueB ? 0 : (lowerValueA > lowerValueB) ? 1 : -1
        }
      },
      MySort (alphabet, a, b) {
        return function (a, b) {
          let indexA = alphabet.indexOf(a[0])
          let indexB = alphabet.indexOf(b[0])
          if (indexA === indexB) {
            // same first character, sort regular
            if (a < b) {
              return -1
            } else if (a > b) {
              return 1
            }
            return 0
          } else {
            return indexA - indexB
          }
        }
      },
      createColDefs () {
        return [
          {headerName: 'Edit', field: 'edit', cellRendererFramework: 'edit-component', suppressSorting: true},
          {headerName: 'Program ID', field: 'programString', icons: {sortAscending: '<i class="fa fa-sort-alpha-asc"/>', sortDescending: '<i class="fa fa-sort-alpha-desc"/>'}, sort: 'asc'},
          {headerName: 'Note Title', field: 'noteString', comparator: this.stringComparator},
          {headerName: 'Contents Preview', field: 'notePreview'},
          {headerName: 'Position', field: 'noteTypeString'},
          {headerName: 'Last Updated By', field: 'lastUpdatedBy'},
          {headerName: 'Last Updated', field: 'lastUpdatedDate'},
          {headerName: 'Delete', field: 'delete', cellRendererFramework: 'delete-component', suppressSorting: true}
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
      iconClick: function (event) {
        // `event` is the native DOM event
        if (event) {
          confirm('Do you want to delete the note ' + event.target.id + ' ?')
          this.noteTitle = event.target.id
        }
      }
    },
    created () {
      this.gridOptions = {
        rowHeight: 40,
        enableColResize: true,
        enableSorting: true,
        rowSelection: 'multiple',
        animateRows: true,
        enableFilter: true,
        isExternalFilterPresent: this.isExternalFilterPresent,
        doesExternalFilterPass: this.doesExternalFilterPass,
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
        notesList: 'notes/notesList',
        programs: 'userAndPrograms/programs'
      })
    },
    watch: {
      crumbs () {
      }
    }
  }
  /* function noteCellRenderer (params) {
    if (params !== undefined && params !== null) {
      let aTag = document.createElement('a')
      let abc = params.data.noteString
      let programString = params.data.programString
      aTag.setAttribute('href', '#/notes/editnote/' + programString + '/' + abc)
      aTag.innerHTML = '<i class="fa fa-edit">'
      return aTag
    }
  } */
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
