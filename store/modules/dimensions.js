import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)
// initial state
/* function initialStatus () {
  return {
    dimensionsList: [{'editable': true, 'label': 'Age Group', 'id': 'AGEGROUP', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Date', 'id': 'DATE_', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Description of DATE values', 'id': 'DATE_DESC', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Hispanic Origin', 'id': 'HISP', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Race', 'id': 'RACE', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Sex', 'id': 'SEX', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Universe', 'id': 'UNIVERSE', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Measure', 'id': 'MEASURE', 'type': 'MEASURE'}, {'editable': false, 'label': 'Gct', 'id': 'GCT', 'type': 'GCT'}],
    verticalDimensionsList: [],
    horizontalDimensionsList: [],
    outsideDimensionsList: [],
    dimensionsSelected: [],
    verticalDimensionsSelected: [],
    outsideDimensionsSelected: [],
    horizontalDimensionsSelected: [],
    noDimensions: false
  }
} */

// initial state
const state = {
  // initialState: initialState(),
  // dimensionsList: initialState().dimensionsList,
  // verticalDimensionsList: initialState().verticalDimensionsList,
  // horizontalDimensionsList: initialState().horizontalDimensionsList,
  // outsideDimensionsList: initialState().outsideDimensionsList,
  // dimensionsSelected: initialState().dimensionsSelected,
  // verticalDimensionsSelected: initialState().verticalDimensionsSelected,
  // outsideDimensionsSelected: initialState().outsideDimensionsSelected,
  // horizontalDimensionsSelected: initialState().horizontalDimensionsSelected
  dimensionsList: [{'editable': true, 'label': 'Age Group', 'id': 'AGEGROUP', 'type': 'GEO'}, {'editable': true, 'label': 'Date', 'id': 'DATE_', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Description of DATE values', 'id': 'DATE_DESC', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Hispanic Origin', 'id': 'HISP', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Race', 'id': 'RACE', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Sex', 'id': 'SEX', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Universe', 'id': 'UNIVERSE', 'type': 'SIMPLE'}, {'editable': true, 'label': 'Measure', 'id': 'MEASURE', 'type': 'MEASURE'}, {'editable': false, 'label': 'Gct', 'id': 'GCT', 'type': 'GCT'}],
  verticalDimensionsList: [],
  horizontalDimensionsList: [],
  outsideDimensionsList: [],
  dimensionsSelected: [],
  verticalDimensionsSelected: [],
  outsideDimensionsSelected: [],
  horizontalDimensionsSelected: [],
  noDimensions: false,
  dimensionsErrorMessage: ''
}
// getters
const getters = {
}
// actions
const actions = {
  getDimensionsList ({commit, rootState}) {
    let programId = rootState.tableBasicMetadata.tableObj.selectedProgram
    console.log(rootState.tableBasicMetadata)
    let componentId = rootState.tableBasicMetadata.tableObj.selectedComponent
    let datasetId = rootState.tableBasicMetadata.tableObj.selectedDataset
    console.log('---------------api call for the list of dimensions---------')
    console.log(programId)
    console.log(componentId)
    console.log(datasetId)
    if (programId !== '' && componentId !== '' && datasetId !== '') {
      return new Promise((resolve, reject) => {
        Vue.http.get('api/programs/' + programId + '/components/' + componentId + '/datasets/' + datasetId + '/dimensions').then(response => {
          commit('NO_DIMENSIONS', false)
          console.log(response)
          resolve(response)
          if (response && response.body.length > 0 && response.status === 200) {
            commit('SET_DIMENSIONS', response.body)
          } else {
            commit('SET_DIMENSIONS', [])
            commit('NO_DIMENSIONS', false)
          }
        }, (e) => {
          commit('NO_DIMENSIONS', true)
          // reject(e)
          if (e.body && e.body.message !== 'Internal Server Error') {
            console.log(e)
            console.log(e.body)
            commit('SET_ERROR_MESSAGE', e.body.message)
          } else {
            console.log(e.statusText)
            commit('SET_ERROR_MESSAGE', 'There is an error retrieving the dimensions')
          }
          commit('SET_DIMENSIONS', state.dimensionsList)
        })
      })
    }
  },
  postDimensionsList ({commit, rootState}) {
    let dimensionsObj = {
      program: '',
      component: '',
      dataset: '',
      tableId: '',
      horizontal: [],
      vertical: [],
      outside: []
    }
    dimensionsObj.program = rootState.tableBasicMetadata.tableObj.selectedProgram
    dimensionsObj.component = rootState.tableBasicMetadata.tableObj.selectedComponent
    dimensionsObj.dataset = rootState.tableBasicMetadata.tableObj.selectedDataset
    dimensionsObj.tableId = rootState.tableBasicMetadata.tableObj.selectedTableId
    console.log(state.verticalDimensionsList)
    console.log(state.horizontalDimensionsList)
    console.log(state.outsideDimensionsList)
    state.verticalDimensionsList.forEach(function (obj) { obj.orderOnAxis = state.verticalDimensionsList.indexOf(obj) })
    state.horizontalDimensionsList.forEach(function (obj) { obj.orderOnAxis = state.horizontalDimensionsList.indexOf(obj) })
    state.outsideDimensionsList.forEach(function (obj) { obj.orderOnAxis = state.outsideDimensionsList.indexOf(obj) })
    dimensionsObj.horizontal = state.verticalDimensionsList
    dimensionsObj.vertical = state.horizontalDimensionsList
    dimensionsObj.outside = state.outsideDimensionsList
    console.log(dimensionsObj)
  },
  updateVerticalDimensionsList ({commit}, verticalDimensionsList) {
    commit('UPDATE_VERTICAL_DIMENSIONS_LIST', verticalDimensionsList)
  },
  updateHorizontalDimensionsList ({commit}, horizontalDimensionsList) {
    commit('UPDATE_HORIZONTAL_DIMENSIONS_LIST', horizontalDimensionsList)
  },
  updateOutsideDimensionsList ({commit}, outsideDimensionsList) {
    commit('UPDATE_OUTSIDE_DIMENSIONS_LIST', outsideDimensionsList)
  },
  updateDimensionsSelected ({commit}, dimensionsSelected) {
    commit('UPDATE_DIMENSIONS_SELECTED', dimensionsSelected)
  },
  updateVerticalDimensionsSelected ({commit}, verticalDimensionsSelected) {
    commit('UPDATE_VERTICAL_DIMENSIONS_SELECTED', verticalDimensionsSelected)
  },
  updateHorizontalDimensionsSelected ({commit}, horizontalDimensionsSelected) {
    commit('UPDATE_HORIZONTAL_DIMENSIONS_SELECTED', horizontalDimensionsSelected)
  },
  updateOutsideDimensionsSelected ({commit}, outsideDimensionsSelected) {
    commit('UPDATE_OUTSIDE_DIMENSIONS_SELECTED', outsideDimensionsSelected)
  }
}
// mutations
const mutations = {
  SET_DIMENSIONS (state, dimensionsList) {
    console.log(dimensionsList)
    state.dimensionsList = dimensionsList
    console.log(state.dimensionsList)
  },
  UPDATE_VERTICAL_DIMENSIONS_LIST (state, verticalDimensionsList) {
    state.verticalDimensionsList = verticalDimensionsList
  },
  UPDATE_HORIZONTAL_DIMENSIONS_LIST (state, horizontalDimensionsList) {
    state.horizontalDimensionsList = horizontalDimensionsList
  },
  UPDATE_OUTSIDE_DIMENSIONS_LIST (state, outsideDimensionsList) {
    state.outsideDimensionsList = outsideDimensionsList
  },
  UPDATE_DIMENSIONS_SELECTED (state, dimensionsSelected) {
    state.dimensionsSelected = dimensionsSelected
  },
  UPDATE_VERTICAL_DIMENSIONS_SELECTED (state, verticalDimensionsSelected) {
    state.verticalDimensionsSelected = verticalDimensionsSelected
  },
  UPDATE_HORIZONTAL_DIMENSIONS_SELECTED (state, horizontalDimensionsSelected) {
    state.horizontalDimensionsSelected = horizontalDimensionsSelected
  },
  UPDATE_OUTSIDE_DIMENSIONS_SELECTED (state, outsideDimensionsSelected) {
    state.outsideDimensionsSelected = outsideDimensionsSelected
  },
  NO_DIMENSIONS (state, noDimensions) {
    state.noDimensions = noDimensions
    console.log(state.noDimensions)
  },
  SET_ERROR_MESSAGE (state, statusText) {
    state.dimensionsErrorMessage = statusText
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
