<template>
  <v-form ref="form" v-model="valid">
    <!-- ========== Programs Drop Down ========== -->
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Program: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs4>
        <v-select
          :disabled="mode === modeEdit"
          :items="user.programs"
          label="Select a Program"
          v-model="table.program"
          v-on:change="getComponentList"
          :rules="selectedProgramRules">
        </v-select>
      </v-flex>
      <v-flex xs6>
        <span>(* = required)</span>
      </v-flex>
    </v-layout>

    <!-- ========== Components Drop Down ========== -->
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Component: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs4>
        <v-select
          :disabled="!table.program || mode === modeEdit"
          :items="components"
          :label="componentLabel"
          :loading="loadingComponents"
          v-model="table.component"
          v-on:change="getDatasetList"
          :rules="selectedProgramRules">
        </v-select>
      </v-flex>
    </v-layout>

    <!-- ========== Datasets Drop Down ========== -->
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Dataset: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs4>
        <v-select
          :disabled="!table.component || mode === modeEdit"
          :items="datasets"
          :label="datasetLabel"
          :loading="loadingDatasets"
          v-model="table.dataset"
          :rules="selectedDatasetRules">
        </v-select>
      </v-flex>
    </v-layout>

    <!-- ========== Table ID Input box ========== -->
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Table ID: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          :disabled="mode === modeEdit"
          label="Enter a Table ID"
          v-model="table.tableId"
          :rules="selectedTableIdRules">
        </v-text-field>
      </v-flex>
    </v-layout>

    <!-- ========== Display Label Input box ========== -->
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Display Label: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          label="Enter a Display Label"
          v-model="table.label"
          :rules="selectedDisplayLabelRules">
        </v-text-field>
      </v-flex>
    </v-layout>

    <!-- ========== Presentation Styles Drop Down ========== -->
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Presentational Style: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs4>
        <presentation-style-selection
          v-bind:defaultStyle="table.presentationStyle"
          v-on:presentation-style-change="setPresentationStyle">
        </presentation-style-selection>
      </v-flex>
    </v-layout>

    <!-- ========== Universe Display Box ========== -->
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Table Universe:</v-subheader>
      </v-flex>
      <v-flex xs10>
        <universe-selection
          v-bind:defaultUniverses="table.universes"
          v-on:select-universes="setUniverses">
        </universe-selection>
      </v-flex>
    </v-layout>

    <!-- ========== Save Button and Dialog ========== -->
    <v-layout row wrap>
      <v-flex xs12 text-xs-right>
        <v-btn :disabled="!valid" @click="showConfirmSaveDialog = true">Save</v-btn>
      </v-flex>
    </v-layout>

    <!-- ======== Confirm Dialog for Save ======== -->
    <confirm-dialog 
      v-bind:show="showConfirmSaveDialog"
      v-bind:width="1000"
      v-on:ok-click="saveOrUpdateTable"
      v-on:cancel-click="showConfirmSaveDialog = false">
      Click 'OK' to save table <b>{{ table.tableId }}</b>
    </confirm-dialog>

    <!-- ========== 'Save Result' Alert Dialog ========== -->
    <alert-dialog v-bind:show="showSaveResultDialog" v-on:ok-click="closeSaveResultDialog()">
      <div v-if="saveTableSuccess">
        Successfully saved table <b>{{ table.tableId}}</b>
      </div>
      <div v-else>
        Could not save table <b>{{ table.tableId}}</b>
        <p>Reason: {{ saveErrorMessage }}</p>
      </div>
    </alert-dialog>

    <!-- ========== 'Error' Alert Dialog ========== -->
    <alert-dialog v-bind:show="showErrorDialog" v-on:ok-click="closeErrorDialog()">{{ errorMessage }}</alert-dialog>

    <!-- ========== 'Loading' Dialog for Saving ========== -->
    <loading-dialog v-bind:show="tableActionInProgress">{{ inProgressMsg }}</loading-dialog>

    <!-- ======== Confirm Dialog for Unsaved Changes ======== -->
    <confirm-dialog 
      v-bind:show="showConfirmUnsavedChangesDialog"
      v-bind:width="1000"
      v-on:ok-click="discardChanges"
      v-on:cancel-click="showConfirmUnsavedChangesDialog = false">
      You have unsaved changes. Click 'OK' to continue and discard your changes. Otherwise click 'CANCEL'.
    </confirm-dialog>

  </v-form>
</template>

<script>
import router from '@/router/index'
import AlertDialog from '@/components/common/AlertDialog'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import LoadingDialog from '@/components/common/LoadingDialog'
import PresentationStyleSelection from '@/components/Tables/PresentationStyleSelection'
import UniverseSelection from '@/components/Tables/UniverseSelection'
import MetadataService from '@/api/metadataService'
import TableService from '@/api/tableService'
import { MODE } from '@/constants/constants.js'

import { mapGetters } from 'vuex'

export default {
  name: 'CreateEditTableBasic',
  components: {
    'alert-dialog': AlertDialog,
    'confirm-dialog': ConfirmDialog,
    'loading-dialog': LoadingDialog,
    'presentation-style-selection': PresentationStyleSelection,
    'universe-selection': UniverseSelection
  },
  props: {
    // This is the mode of the component: EDIT or CREATE
    mode: {
      type: String,
      default: MODE.EDIT
    }
    // ,
    // Used when mode is EDIT
    // program: String,
    // component: String,
    // dataset: String,
    // tableId: String
  },
  data () {
    return {
      // Mode values for reference in the template
      modeEdit: MODE.EDIT,

      // The table v-model for creating and editing. Used by the template to bind fields.
      table: {
        program: undefined,
        component: undefined,
        dataset: undefined,
        tableId: undefined,
        label: undefined,
        presentationStyle: undefined,
        universes: [],
        lastEditedBy: undefined
      },

      // The persisted table retrieved from the database. Will be retrieved in EDIT mode.
     // savedTable: {},

      // Flag for form validity
      valid: false,

      // Flags for showing dialogs related to save/update actions
      showConfirmSaveDialog: false,
      tableActionInProgress: false,
      inProgressMsg: '',
      showSaveResultDialog: false,
      saveTableSuccess: false,
      saveErrorMessage: '',

      // Fields for the component selection
      loadingComponents: false,
      componentLabel: 'Select a Component',
      components: [],

      // Fields for the dataset selection
      loadingDatasets: false,
      datasetLabel: 'Select a Dataset',
      datasets: [],

      // Validation rules for form fields
      selectedProgramRules: [
        v => !!v || 'Please select a Program'
      ],
      selectedComponentRules: [
        v => !!v || 'Please select a Component'
      ],
      selectedDatasetRules: [
        v => !!v || 'Please select a Dataset'
      ],
      selectedTableIdRules: [
        v => !!v || 'Please enter a Table ID'
      ],
      selectedDisplayLabelRules: [
        v => !!v || 'Please enter a Display Label'
      ],

      // flags for error dialog
      showErrorDialog: false,
      errorMessage: '',

      // flags for unsaved changes dialog
      showConfirmUnsavedChangesDialog: false,
      requestedRoute: undefined
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  created () {
    this.init()
  },
  methods: {
    // If the mode is EDIT, then this function will initialize the table data
    // field looking up the Table object from the TableService and setting it.
    init () {
     // if (this.mode === MODE.EDIT) {
        // populate the components and datasets drop downs with just 1 value
       // this.components = [this.component]
       // this.datasets = [this.dataset]

       // this.tableActionInProgress = true
       // this.inProgressMsg = 'Loading Table ' + this.tableId + '. . .'
       // TableService.getTable(this.program, this.component, this.dataset, this.tableId)
       // .then(response => {
          // set the table object
         // this.table.program = this.program
         // this.table.component = this.component
         // this.table.dataset = response.body.datasetString
         // this.table.tableId = response.body.tableString
         // this.table.label = response.body.label
         // this.setPresentationStyle(response.body.style)
         // this.setUniverses(response.body.universes)
         // this.updatedTableToSavedTable()
       // })
       // .catch(errorResponse => {
         // this.showErrorDialog = true
         // this.errorMessage = 'Error Retrieving Table. Click \'OK\' to go back to Tables page.'
       // })
       // .finally(() => {
         // this.tableActionInProgress = false
         // this.inProgressMsg = ''
       // })
     // }
    },

    // This function will sync the saved table values with the table values
   // updatedTableToSavedTable () {
     // this.savedTable.dataset = this.table.dataset
     // this.savedTable.tableId = this.table.tableId
     // this.savedTable.label = this.table.label
     // this.savedTable.presentationStyle = this.table.presentationStyle
     // this.savedTable.universes = this.table.universes || []
   // },

    // This function will sync the updated table values with the saved table values
   // savedTableToUpdatedTable () {
     // this.table.dataset = this.savedTable.dataset
     // this.table.tableId = this.savedTable.tableId
     // this.table.label = this.savedTable.label
     // this.table.presentationStyle = this.savedTable.presentationStyle
     // this.table.universes = this.savedTable.universes || []
   // },

    getComponentList () {
      // only look up components if in CREATE mode
      if (this.mode === MODE.CREATE) {
        // empty components and datasets
        this.table.component = undefined
        this.components = []
        this.table.dataset = undefined
        this.datasets = []

        // get components for program
        if (this.table.program !== undefined) {
          this.loadingComponents = true
          this.componentLabel = 'Loading Components . . .'
          MetadataService.getComponents(this.table.program)
          .then(response => { this.components = response.body })
          .finally(() => {
            this.componentLabel = 'Select a Component'
            this.loadingComponents = false
          })
        }
      }
    },

    getDatasetList () {
      // only look up datasets if in CREATE mode
      if (this.mode === MODE.CREATE) {
        // empty datasets
        this.table.dataset = undefined
        this.datasets = []

        // get datasets for program and component
        if (this.table.program !== undefined && this.table.component !== undefined) {
          this.loadingDatasets = true
          this.datasetLabel = 'Loading Datasets . . .'
          MetadataService.getDatasets(this.table.program, this.table.component)
          .then(response => { this.datasets = response.body })
          .finally(() => {
            this.datasetLabel = 'Select a Dataset'
            this.loadingDatasets = false
          })
        }
      }
    },

    // This is the callback function for when a presentation style
    // is selected from the PresentatinStyleSelection component
    setPresentationStyle (style) {
      this.table.presentationStyle = style
    },

    // This is the callback function for when a universe
    // is selected from the UniverseSelection component
    setUniverses (universes) {
      this.table.universes = universes || []
    },

    // This function will save or Update the table based on the
    // 'action' data field of the component.
    saveOrUpdateTable () {
      this.showConfirmSaveDialog = false
      this.inProgressMsg = 'Saving table ' + this.table.tableId + '. . .'
      this.tableActionInProgress = true
      this.table.lastEditedBy = this.user.id

      // determine the action to perform
     // let saveOrUpdatePromise
     // if (this.mode === MODE.EDIT) {
       // saveOrUpdatePromise = TableService.updateTable(this.table)
     // } else {
       // saveOrUpdatePromise = TableService.saveTable(this.table)
     // }

      // saveOrUpdatePromise.then(response => {
      TableService.saveTable(this.table).then(response => {
        this.saveTableSuccess = true
       // this.updatedTableToSavedTable()
      })
      .catch(errResponse => {
        // show error message
        this.saveTableSuccess = false
        if (errResponse.body && errResponse.body.message) {
          this.saveErrorMessage = errResponse.body.message
        } else {
          this.saveErrorMessage = errResponse.statusText || 'There was an Internal Server Error'
        }
      })
      .finally(() => {
        this.tableActionInProgress = false
        this.inProgressMsg = ''
        this.showSaveResultDialog = true
      })
    },

    // This function is called when the successful save dialog is closed.
    closeSaveResultDialog () {
      this.showSaveResultDialog = false
      if (this.saveTableSuccess && this.mode === MODE.CREATE) {
        router.push({
          name: 'Tables'// 'EditTableBasic',
         // params: {
           // program: this.table.program,
           // component: this.table.component,
           // dataset: this.table.dataset,
           // tableId: this.table.tableId
         // }
        })
      }
    },

    // This function is called when the error dialog is closed.
    // If there is an error looking up the specified table,
    // then the application routes back to the 'Tables' route.
    closeErrorDialog () {
      this.showErrorDialog = false
      router.push({
        name: 'Tables'
      })
    },

    // This function is called to test to see if any
    // unsaved changes have occured on the table fields.
    anyUnsavedChanges () {
      // When in CREATE mode, return true if the table is
      // not empty and the saveTableSuccess flag is false.
      if (this.mode === MODE.CREATE) {
        return !this.isTableEmpty() && !this.saveTableSuccess
      }

      // When in EDIT mode, test the following conditions
     // if (this.table.label !== this.savedTable.label) {
       // return true
     // }

     // if (this.table.presentationStyle !== this.savedTable.presentationStyle) {
       // return true
     // }

     // if (this.table.universes.length !== this.savedTable.universes.length) {
       // return true
     // }

     // for (let i = 0; i < this.table.universes.length; i++) {
       // if (this.table.universes[i] !== this.savedTable.universes[i]) {
         // return true
       // }
     // }

      return false // there are no unsaved changes
    },

    // This function will return true if the table object is empty
    isTableEmpty () {
      return (this.table.program === undefined || this.table.program.trim().length === 0) &&
             (this.table.component === undefined || this.table.component.trim().length === 0) &&
             (this.table.dataset === undefined || this.table.dataset.trim().length === 0) &&
             (this.table.tableId === undefined || this.table.tableId.trim().length === 0) &&
             (this.table.label === undefined || this.table.label.trim().length === 0) &&
             (this.table.presentationStyle === undefined) &&
             (this.table.universes === undefined || this.table.universes.length === 0)
    },

    // This function is called to confirm that the user wants to discard their
    // unsaved changes. It will route the application to the last requested route
    discardChanges () {
      this.showConfirmUnsavedChangesDialog = false
     // this.savedTableToUpdatedTable()
      this.requestedRoute()
    }
  },
 // watch: {
   // '$route' (to, from) {
     // if (to.params.program !== this.table.program ||
         // to.params.component !== this.table.component ||
         // to.params.dataset !== this.table.dataset ||
         // to.params.tableId !== this.table.tableId) {
       // this.init()
     // }
   // }
 // },

  // This function is a navigation guard against leaving the
  // route before changes are either saved or discarded.
  beforeRouteLeave (to, from, next) {
    if (this.anyUnsavedChanges()) {
      this.requestedRoute = next
      this.showConfirmUnsavedChangesDialog = true
    } else {
      // All changes have been saved
      next()
    }
  }
}
</script>
<style scoped>
  span {
    color: #ff0000
  }
  .confirm-save p {
    margin-top:10px;
  }
</style>
