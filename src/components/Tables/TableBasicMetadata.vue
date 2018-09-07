<template>
  <v-form ref="form" v-model="valid">
    <v-layout row wrap>
      <v-flex xs2>
        <v-subheader>Program: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="programs"
          label="Select a Program"
          v-model="selectedProgram"
          v-on:change="getComponentsList"
          :rules="selectedProgramRules"></v-select>
      </v-flex>
       <v-flex xs6>
        <span>(* = required)</span>
      </v-flex>
      <v-flex xs2>
        <v-subheader>Component: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-select
          :items="components"
          label="Select a Component"
          v-model="selectedComponent"
          v-on:change="getDatasetsList"
          :disabled="selectedProgram.length === 0"
          :rules="selectedComponentRules"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-subheader>Dataset: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-select
          :items="datasets"
          label="Select a Dataset"
          :disabled="selectedComponent.length === 0"
          v-model="selectedDataset"
          :rules="selectedDatasetRules"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-subheader>Table ID: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          label="Enter a Table ID"
          v-model="selectedTableId"
          :rules="selectedTableIdRules"></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-subheader>Display Label: <span>*</span></v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          label="Enter a Display Label"
          v-model="selectedDisplayLabel"
          :rules="selectedDisplayLabelRules"></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-subheader>Display Description: </v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-textarea
          label="Enter a description of the table's content."></v-textarea>
      </v-flex>
      <v-flex xs2>
        <v-subheader>Table Universe: </v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          label="Table Universe"
          v-model="selectedTableUniverse"></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-dialog
          v-model="dialog"
          width="1000">
          <v-btn
            slot="activator"
            color="grey lighten-2"
            dark
            icon>
            <v-icon>call_made</v-icon>
          </v-btn>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title>
              Table Universe
              <v-spacer></v-spacer>
              <v-icon @click="dialog = false">close</v-icon>
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="selectedTableUniverse"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat @click="dialog = false">OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="clearTableUniverse()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs2>
        <v-subheader>Presentational Style:</v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-select
          :items="presentationalStyle"
          item-text="label"
          label="Select a Presentational Style"></v-select>
      </v-flex>
      <v-flex xs12 text-xs-right>
        <v-btn :disabled="!valid">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      tableUniverse: [],
      dialog: false,
      validation: false,
      valid: false,
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
      ]
    }
  },
  /* gets the list of programs associated with the user */
  created () {
  },
  methods: {
    ...mapActions({
    /* dispatches an action to get the list of components as soon as the user selects a program */
      getComponentsList: function () {
        this.$store.dispatch('tableBasicMetadata/getComponents')
      },
      /* dispatches an action to get the list of datasets as soon as the user selects a program and component */
      getDatasetsList: function () {
        this.$store.dispatch('tableBasicMetadata/getDatasets')
      },
      clearTableUniverse: function () {
        this.$store.dispatch('updateSelectedTableUniverse', [])
      }
    })
  },
  computed: {
    ...mapGetters({
      programs: 'userAndPrograms/programs',
      components: 'tableBasicMetadata/components',
      datasets: 'tableBasicMetadata/datasets',
      presentationalStyle: 'tableBasicMetadata/presentationalStyle'
    }),
    selectedProgram: {
    /* gets the selected program by the user from the store, usually executes when a user is editing the table. For new table anyway it will be null/empty */
      get () {
        return this.$store.state.tableBasicMetadata.selectedProgram
      },
      /* sets the user selected program from the vue template binding and dispatches an action to commit it to the store, will be used to get the list of components associated with the program */
      set (selectedProgram) {
        this.$store.dispatch('tableBasicMetadata/updateSelectedProgram', selectedProgram)
      }
    },
    selectedComponent: {
    /* gets the selected component by the user from the store, usually executes when a user is editing the table. For new table anyway it will be null/empty */
      get () {
        return this.$store.state.tableBasicMetadata.selectedComponent
      },
      /* sets the user selected component from the vue template binding and dispatches an action to commit it to the store, will be used to get the list of datasets associated with the program and component */
      set (selectedComponent) {
        this.$store.dispatch('tableBasicMetadata/updateSelectedComponent', selectedComponent)
      }
    },
    selectedTableUniverse: {
      get () {
        return this.$store.state.tableBasicMetadata.selectedTableUniverse
      },
      set (selectedTableUniverse) {
        this.$store.dispatch('tableBasicMetadata/updateSelectedTableUniverse', selectedTableUniverse)
      }
    },
    selectedDataset: {
    /* gets the selected dataset by the user from the store, usually executes when a user is editing the table. For new table anyway it will be null/empty */
      get () {
        return this.$store.state.tableBasicMetadata.selectedDataset
      },
      /* sets the user selected component from the vue template binding and dispatches an action to commit it to the store, will be used to get the list of datasets associated with the program and component */
      set (selectedDataset) {
        this.$store.dispatch('tableBasicMetadata/updateSelectedDataset', selectedDataset)
      }
    },
    selectedDisplayLabel: {
      get () {
        return this.$store.state.tableBasicMetadata.selectedDisplayLabel
      },
      set (selectedDisplayLabel) {
        this.$store.dispatch('tableBasicMetadata/updateSelectedDisplayLabel', selectedDisplayLabel)
      }
    },
    selectedTableId: {
      get () {
        return this.$store.state.tableBasicMetadata.selectedTableId
      },
      set (selectedTableId) {
        this.$store.dispatch('tableBasicMetadata/updateSelectedTableId', selectedTableId)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style scoped>
  span {
    color: #ff0000
  }
</style>