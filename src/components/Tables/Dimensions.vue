<template>
  <v-container fluid>
    <div v-if="noDimensions">
      <v-alert :value="true" color="error" icon="warning" outline>{{ errorMessage }}</v-alert>
    </div>
    <div v-else>
      <v-alert :value="showalert">Please select atleast one option!!</v-alert>
      <v-layout row wrap align-center>
        <v-flex xs5>
          <div>
            <label>Dimensions:</label><br>
            <select id="dimensionsList" v-model="dimensionsSelected" multiple="multiple" class="dimensions">
              <option v-for="dimensions in dimensionsList" v-bind:value="dimensions" >{{ dimensions.label }}</option>
            </select>
          </div>
        </v-flex>
        <v-flex xs7>
          <v-layout row wrap align-center>
            <v-flex xs2>
              <div>
                <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_rightSelected(dimensionsSelected, dimensionsList, verticalDimensionsList, 'vertical')">
                  <v-icon>chevron_right</v-icon>
                </v-btn><br>
                <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_leftSelected(verticalDimensionsSelected, verticalDimensionsList, dimensionsList, 'vertical')">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs8>
              <div>
                <label>Vertical:</label><br>
                <select id="verticalDimensionsList" v-model="verticalDimensionsSelected" multiple="multiple" class="axes">
                  <option v-for="verticalDimensions in verticalDimensionsList" v-bind:value="verticalDimensions" >{{ verticalDimensions.label }}</option>
                </select>
              </div>
            </v-flex>
            <v-flex xs2>
              <div>
                <v-btn slot="activator" color="grey" dark icon v-on:click="moveVerticalAxisElement(-1)">
                  <v-icon>expand_less</v-icon>
                </v-btn><br>
                <v-btn slot="activator" color="grey" dark icon v-on:click="moveVerticalAxisElement(1)">
                  <v-icon>expand_more</v-icon>
                </v-btn><br>
                <v-dialog v-model=dialog width="1000"  fullscreen transition="dialog-bottom-transition" :disabled="valid = this.verticalDimensionsSelected.length === 0">
                  <v-btn slot="activator" color="grey" dark icon @click="categoriesApiCall('vertical')" :disabled="valid = this.verticalDimensionsSelected.length === 0">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title class="headline grey" primary-title dense>
                      Categories
                      <v-spacer></v-spacer>
                      <v-btn slot="activator" icon @click.native="dialog = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <categories></categories>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center>
            <v-flex xs2>
              <div>
                <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_rightSelected(dimensionsSelected, dimensionsList, horizontalDimensionsList, 'horizontal')">
                  <v-icon>chevron_right</v-icon>
                </v-btn><br>
                <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_leftSelected(horizontalDimensionsSelected, horizontalDimensionsList, dimensionsList, 'horizontal')">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs8>
              <div>
                <label>Horizontal:</label><br>
                <select id="horizontalDimensionsList" v-model="horizontalDimensionsSelected" multiple="multiple" class="axes">
                  <option v-for="horizontalDimensions in horizontalDimensionsList" v-bind:value="horizontalDimensions" >{{ horizontalDimensions.label }}</option>
                </select>
              </div>
            </v-flex>
            <v-flex xs2>
              <div>
                <v-btn slot="activator" color="grey" dark icon v-on:click="moveHorizontalAxisElement(-1)">
                  <v-icon>expand_less</v-icon>
                </v-btn><br>
                <v-btn slot="activator" color="grey" dark icon v-on:click="moveHorizontalAxisElement(1)">
                  <v-icon>expand_more</v-icon>
                </v-btn><br>
                <v-dialog v-model=dialog1 width="1000"  fullscreen transition="dialog-bottom-transition" :disabled="valid = this.horizontalDimensionsSelected.length === 0">
                  <v-btn slot="activator" color="grey" dark icon @click="categoriesApiCall('horizontal')" :disabled="valid = this.horizontalDimensionsSelected.length === 0">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title class="headline grey" primary-title dense>
                      Categories
                      <v-spacer></v-spacer>
                      <v-btn slot="activator" icon @click.native="dialog1 = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <categories></categories>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center>
            <v-flex xs2>
              <div>
                <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_rightSelected(dimensionsSelected, dimensionsList, outsideDimensionsList, 'outside')">
                  <v-icon>chevron_right</v-icon>
                </v-btn><br>
                <v-btn slot="activator" color="grey" dark icon v-on:click="multiselect_leftSelected(outsideDimensionsSelected, outsideDimensionsList, dimensionsList, 'outside')">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs8>
              <div>
                <label>Outside:</label><br>
                <select id="outsideDimensionsList" v-model="outsideDimensionsSelected" multiple="multiple" class="axes">
                  <option v-for="outsideDimensions in outsideDimensionsList" v-bind:value="outsideDimensions" >{{ outsideDimensions.label }}</option>
                </select>
              </div>
            </v-flex>
            <v-flex xs2>
              <div>
                <v-btn slot="activator" color="grey" dark icon v-on:click="moveOutsideAxisElement(-1)">
                  <v-icon>expand_less</v-icon>
                </v-btn><br>
                <v-btn slot="activator" color="grey" dark icon v-on:click="moveOutsideAxisElement(1)">
                  <v-icon>expand_more</v-icon>
                </v-btn><br>
                <v-dialog v-model=dialog2 width="1000"  fullscreen transition="dialog-bottom-transition" :disabled="valid = this.outsideDimensionsSelected.length === 0">
                  <v-btn slot="activator" color="grey" dark icon @click="categoriesApiCall('outside')" :disabled="valid = this.outsideDimensionsSelected.length === 0">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title class="headline grey" primary-title dense>
                      Categories
                      <v-spacer></v-spacer>
                      <v-btn slot="activator" icon @click.native="dialog2 = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <categories></categories>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-flex xs12 text-xs-right>
        <v-btn @click="dimensionsSaveDialog = true">Save</v-btn>
        <v-dialog v-model="dimensionsSaveDialog" width="500">
          <v-card>
            <v-card-text>Do you want to save the table dimensions?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer>
              </v-spacer>
              <v-btn @click="saveTableDimensions">Ok</v-btn>
              <v-btn @click="dimensionsSaveDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-layout row justify-center>
        <v-dialog v-model="dimensionsSaveProgress" persistent content-class="loading-dialog">
          <v-container fill-height>
            <v-layout row justify-center align-center>
              <v-progress-circular indeterminate :size="70" :width="7" color="blue"></v-progress-circular>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>
    </div>
  </v-container>
</template>
<script>
  import Categories from '@/components/Tables/categories/Categories'
  export default {
    name: 'Dimensions',
    components: {
      Categories
    },
    data () {
      return {
        showalert: false,
        dialog: false,
        dialog1: false,
        dialog2: false,
        dimensionsSaveDialog: false,
        dimensionsSaveProgress: false,
        isInitial: true
      }
    },
    computed: {
      errorMessage () {
        console.log(this.$store.state.dimensions.dimensionsErrorMessage)
        return this.$store.state.dimensions.dimensionsErrorMessage
      },
      noDimensions () {
        console.log(this.$store.state.dimensions.noDimensions)
        return this.$store.state.dimensions.noDimensions
      },
      dimensionsList: {
        get () {
          return this.$store.state.dimensions.dimensionsList
        },
        set (dimensionsList) {
          this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
        }
      },
      verticalDimensionsList: {
        get () {
          return this.$store.state.dimensions.verticalDimensionsList
        },
        set (verticalDimensionsList) {
          this.$store.dispatch('dimensions/updateVerticalDimensionsList', verticalDimensionsList)
        }
      },
      horizontalDimensionsList: {
        get () {
          return this.$store.state.dimensions.horizontalDimensionsList
        },
        set (horizontalDimensionsList) {
          this.$store.dispatch('dimensions/updateHorizontalDimensionsList', horizontalDimensionsList)
        }
      },
      outsideDimensionsList: {
        get () {
          return this.$store.state.dimensions.outsideDimensionsList
        },
        set (outsideDimensionsList) {
          this.$store.dispatch('dimensions/updateOutsideDimensionsList', outsideDimensionsList)
        }
      },
      dimensionsSelected: {
        get () {
          return this.$store.state.dimensions.dimensionsSelected
        },
        set (dimensionsSelected) {
          this.$store.dispatch('dimensions/updateDimensionsSelected', dimensionsSelected)
        }
      },
      verticalDimensionsSelected: {
        get () {
          console.log(this.$store.state.dimensions.verticalDimensionsSelected)
          return this.$store.state.dimensions.verticalDimensionsSelected
        },
        set (verticalDimensionsSelected) {
          this.$store.dispatch('dimensions/updateVerticalDimensionsSelected', verticalDimensionsSelected)
        }
      },
      horizontalDimensionsSelected: {
        get () {
          return this.$store.state.dimensions.horizontalDimensionsSelected
        },
        set (horizontalDimensionsSelected) {
          this.$store.dispatch('dimensions/updateHorizontalDimensionsSelected', horizontalDimensionsSelected)
        }
      },
      outsideDimensionsSelected: {
        get () {
          return this.$store.state.dimensions.outsideDimensionsSelected
        },
        set (outsideDimensionsSelected) {
          this.$store.dispatch('dimensions/updateOutsideDimensionsSelected', outsideDimensionsSelected)
        }
      },
      watcher: function () {
        return [this.verticalDimensionsList, this.horizontalDimensionsList, this.outsideDimensionsList]
      }
    },
    watch: {
      watcher (val) {
        if (!this.isInitial) {
          console.log('val: ', val)
          this.$emit('event_child_dimensions', true)
        }
      }
    },
    methods: {
      saveTableDimensions () {
        console.log('clicked dimensions save button')
        this.dimensionsSaveProgress = true
        this.$store.dispatch('dimensions/postDimensionsList')
        this.$emit('event_child_dimensions', false)
        console.log(this.verticalDimensionsList)
        console.log(this.horizontalDimensionsList)
        console.log(this.outsideDimensionsList)
        this.dimensionsSaveProgress = false
        let horizontalHasGCT = this.verticalDimensionsList.some(function (item) { return item.type === 'GCT' })
        let verticalHasGCT = this.horizontalDimensionsList.some(function (item) { return item.type === 'GCT' })
        switch (true) {
          case horizontalHasGCT && verticalHasGCT:
            console.log('presentational style : GCT horizontalHasGCT && verticalHasGCT')
            break
          case horizontalHasGCT && this.verticalDimensionsList.length >= 1:
            console.log('presentational style : GCT horizontalHasGCT && this.verticalDimensionsList.length >= 1')
            break
          case verticalHasGCT && this.horizontalDimensionsList.length >= 1:
            console.log('presentational style : GCT verticalHasGCT && this.horizontalDimensionsList.length >= 1')
            break
          case !horizontalHasGCT && !verticalHasGCT && this.verticalDimensionsList.length >= 1 && this.horizontalDimensionsList.length >= 1:
            console.log('presentational style : Hierarchical')
            break
          case this.horizontalDimensionsList.length === 0 && this.verticalDimensionsList.length >= 1:
            console.log('presentational style : flat')
            break
          case this.horizontalDimensionsList.length >= 1 && this.verticalDimensionsList.length === 0:
            console.log('presentational style : flat')
            break
          default:
            console.log(undefined)
            break
        }
      },
      // methods to move selected dimensions from dimensions list into respective axes list
      multiselect_rightSelected: function (dimensionsSelected, dimensionsList, axesDimensionsList, axes) {
        this.showalert = dimensionsSelected.length === 0
        this.isInitial = false
        dimensionsSelected.forEach(x => {
          const leftIndex = dimensionsList.findIndex(y => y === x)
          dimensionsList.splice(leftIndex, 1)
          const rightIndex = axesDimensionsList.findIndex(z => z === x)
          if (!(rightIndex > -1)) {
            axesDimensionsList.push(x)
          }
        })
        if (axes === 'vertical') {
          this.$store.dispatch('dimensions/updateVerticalDimensionsList', axesDimensionsList)
        } else if (axes === 'horizontal') {
          this.$store.dispatch('dimensions/updateHorizontalDimensionsList', axesDimensionsList)
        } else if (axes === 'outside') {
          this.$store.dispatch('dimensions/updateOutsideDimensionsList', axesDimensionsList)
        }
      },
      // methods to move selected axes dimensions from dimensions list
      multiselect_leftSelected: function (axesDimensionsSelected, axesDimensionsList, dimensionsList, axes) {
        if (axesDimensionsSelected.length === 0) {
          this.showalert = true
        } else {
          this.isInitial = false
          this.showalert = false
          axesDimensionsSelected.forEach(x => {
            const rightIndex = axesDimensionsList.findIndex(y => y === x)
            axesDimensionsList.splice(rightIndex, 1)
            const leftIndex = dimensionsList.findIndex(z => z === x)
            if (!(leftIndex > -1)) {
              dimensionsList.push(x)
            }
          })
          if (axes === 'vertical') {
            this.$store.dispatch('dimensions/updateVerticalDimensionsList', axesDimensionsList)
            this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
            this.$store.dispatch('dimensions/updateVerticalDimensionsSelected', [])
          } else if (axes === 'horizontal') {
            this.$store.dispatch('dimensions/updateHorizontalDimensionsList', axesDimensionsList)
            this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
            this.$store.dispatch('dimensions/updateHorizontalDimensionsSelected', [])
          } else if (axes === 'outside') {
            this.$store.dispatch('dimensions/updateOutsideDimensionsList', axesDimensionsList)
            this.$store.commit('dimensions/SET_DIMENSIONS', dimensionsList)
            this.$store.dispatch('dimensions/updateOutsideDimensionsSelected', [])
          }
        }
      },
      moveVerticalAxisElement: function (positionChange) {
        if (this.verticalDimensionsSelected.length > 1) {
          alert('please select only one dimension')
        } else {
          this.isInitial = false
          let oldIndex = this.verticalDimensionsList.findIndex(y => y.label === this.verticalDimensionsSelected[0].label)
          if (oldIndex > -1) {
            let newIndex = (oldIndex + positionChange)
            if (newIndex < 0) {
              newIndex = 0
            } else if (newIndex >= this.verticalDimensionsList.length) {
              newIndex = this.verticalDimensionsList.length
            }
            let arrayClone = this.verticalDimensionsList.slice()
            arrayClone.splice(oldIndex, 1)
            arrayClone.splice(newIndex, 0, this.verticalDimensionsSelected[0])
            this.verticalDimensionsList = arrayClone
            return this.verticalDimensionsList
          }
          this.$store.dispatch('dimensions/updateVerticalDimensionsList', this.verticalDimensionsList)
          return this.verticalDimensionsList
        }
      },
      moveHorizontalAxisElement: function (positionChange) {
        if (this.horizontalDimensionsSelected.length > 1) {
          alert('please select only one dimension')
        } else {
          this.isInitial = false
          let oldIndex = this.horizontalDimensionsList.findIndex(y => y.label === this.horizontalDimensionsSelected[0].label)
          if (oldIndex > -1) {
            let newIndex = (oldIndex + positionChange)
            if (newIndex < 0) {
              newIndex = 0
            } else if (newIndex >= this.horizontalDimensionsList.length) {
              newIndex = this.horizontalDimensionsList.length
            }
            let arrayClone = this.horizontalDimensionsList.slice()
            arrayClone.splice(oldIndex, 1)
            arrayClone.splice(newIndex, 0, this.horizontalDimensionsSelected[0])
            this.horizontalDimensionsList = arrayClone
            return this.horizontalDimensionsList
          }
          this.$store.dispatch('dimensions/updateHorizontalDimensionsList', this.horizontalDimensionsList)
          return this.horizontalDimensionsList
        }
      },
      moveOutsideAxisElement: function (positionChange) {
        if (this.outsideDimensionsSelected.length > 1) {
          alert('please select only one dimension')
        } else {
          this.isInitial = false
          let oldIndex = this.outsideDimensionsList.findIndex(y => y.label === this.outsideDimensionsSelected[0].label)
          if (oldIndex > -1) {
            let newIndex = (oldIndex + positionChange)
            if (newIndex < 0) {
              newIndex = 0
            } else if (newIndex >= this.outsideDimensionsList.length) {
              newIndex = this.outsideDimensionsList.length
            }
            let arrayClone = this.outsideDimensionsList.slice()
            arrayClone.splice(oldIndex, 1)
            arrayClone.splice(newIndex, 0, this.outsideDimensionsSelected[0])
            this.outsideDimensionsList = arrayClone
            return this.outsideDimensionsList
          }
          this.$store.dispatch('dimensions/updateOutsideDimensionsList', this.outsideDimensionsList)
          return this.outsideDimensionsList
        }
      },
      categoriesApiCall: function (axes) {
        console.log('---------------calling categories API-----------', axes)
        if (this.outsideDimensionsSelected.length === 1 || this.horizontalDimensionsSelected.length === 1 || this.verticalDimensionsSelected.length === 1) {
          this.$store.dispatch('categories/getCategoriesList', axes)
        }
      },
      setInitValue: function (value) {
        this.isInitial = value
      }
    },
    created: function () {
      this.$parent.$on('event_parent', this.setInitValue)
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  select {
    border: 1px solid;
  }
  .dimensions {
    min-height: 600px;
    background:#f8f8f8;
    min-width:400px;
    overflow-x: scroll;
    overflow-y: scroll;
  }
  .axes {
    min-height: 180px;
    background:#f8f8f8;
    min-width:400px;
    overflow-x: scroll;
    overflow-y: scroll;
  }
</style>
