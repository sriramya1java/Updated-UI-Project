<template>
  <v-layout row wrap>
    <!-- ========== Universe Drop Down ========== -->
    <v-flex xs8>
    <v-select 
      :items="tableUniverses"
      v-model="tableUniverses"
      multiple
      label="Table Universe"
      no-data-text="No Universes have been selected">
    </v-select>
    </v-flex>
    <v-flex xs2>
    <v-btn slot="activator" color="grey lighten-2" dark icon @click="loadUniverses()">
      <v-icon>call_made</v-icon>
    </v-btn>
    <v-btn slot="activator" color="grey lighten-2" dark icon @click="clearTableUniverse()">
      <v-icon>close</v-icon>
    </v-btn>
    </v-flex>

    <!-- ========== Universe Dialog ========== -->
    <v-dialog v-model="showUniverseDialog" width="1000" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Select a Table Universe
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false">close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-select 
            :items="allUniverses"
            :label="label"
            item-text="universeLabel"
            item-value="universeString"
            :loading="loading"
            v-model="selectedUniverse"
            no-data-text="No Universes have been found">
          </v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="cancelDialog()">Cancel</v-btn>
          <v-btn color="primary" flat @click="selectUniverses()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
import MetadataService from '@/api/metadataService'

export default {
  name: 'UniverseSelection',
  props: {
    defaultUniverses: Array
  },
  data () {
    return {
      tableUniverses: [],
      showUniverseDialog: false,
      loading: false,
      label: 'Select a Table Universe',
      allUniverses: [],
      selectedUniverse: undefined
    }
  },
  created () {
    this.tableUniverses = this.defaultUniverses
  },
  methods: {
    // This function will load all of the universes
    loadUniverses () {
      // launch the dialog
      this.showUniverseDialog = true

      // then retrieve all universes
      this.loading = true
      this.label = 'Loading Universes . . .'
      MetadataService.getUniverses()
      .then(response => { this.allUniverses = response.body })
      .finally(() => {
        this.label = 'Select a Table Universe'
        this.loading = false
      })
    },

    // This function will set the Table Universe to the selected Universe, if one is set.
    // Otherwise, it will simply close the dialog
    selectUniverses () {
      if (this.selectedUniverse) {
        this.setTableUniverse([this.selectedUniverse])
      } else {
        this.cancelDialog()
      }
    },

    // This function will close out the dialog as well as reset the selectedUniverse to undefined
    cancelDialog () {
      this.showUniverseDialog = false
      this.selectedUniverse = undefined
    },

    // This function will close the dialog box and emit an event notifying the parent
    // component of the universe selections; passing the selected universes
    setTableUniverse (universes) {
      this.showUniverseDialog = false
      this.tableUniverses = universes
      this.$emit('select-universes', universes)
    },

    // This function will clear out the table universes, and emit an event
    // notifying the parent component to clear out their selected universes.
    clearTableUniverse () {
      this.tableUniverses = []
      this.$emit('select-universes', [])
    }
  },
  watch: {
    defaultUniverses (universes) {
      this.tableUniverses = universes
    }
  }
}
</script>
<style scoped></style>
