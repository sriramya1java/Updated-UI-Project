import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)
// initial state
const state = {
  selectedProgram: '',
  components: ['PEPCHARAGEGROUPS', 'POPESTCHARAGEGROUPS'],
  selectedComponent: '',
  datasets: ['PEPCHARAGEGROUPS2015', 'PEPCHARAGEGROUPS2016', 'PEPCHARAGEGROUPS2017'],
  selectedDataset: '',
  selectedTableId: '',
  selectedDisplayLabel: '',
  selectedTableUniverse: [],
  presentationalStyle: [
    {
      'id': 'FLAT1',
      'label': 'Flat'
    },
    {
      'id': 'HIERARCHICAL1',
      'label': 'Hierarchical'
    }
  ]
}
// getters
const getters = {
  components: state => {
    return state.components
  },
  datasets: state => {
    return state.datasets
  },
  presentationalStyle: state => {
    return state.presentationalStyle
  }
}
// actions
const actions = {
  getComponents ({ commit }) {
    let rootUrl = process.env.ROOT_API
    const programId = state.selectedProgram
    console.log(programId)
    commit('SET_DATASETS', [])
    commit('SET_COMPONENTS', [])
    commit('UPDATE_SELECTED_DATASET', '')
    commit('UPDATE_SELECTED_COMPONENT', '')
    Vue.http.get(rootUrl + '/api/programs/' + programId + '/components').then(response => {
      // console.log(response.body)
      if (response && response.body.length > 0) {
        // commit('SET_COMPONENTS', response.body)
        commit('SET_COMPONENTS', ['PEPCHARAGEGROUPS', 'POPESTCHARAGEGROUPS'])
      } else {
        // commit('SET_COMPONENTS', [])
        commit('SET_COMPONENTS', ['PEPCHARAGEGROUPS', 'POPESTCHARAGEGROUPS'])
      }
    }, (error) => {
      console.log(error)
      commit('SET_COMPONENTS', ['PEPCHARAGEGROUPS', 'POPESTCHARAGEGROUPS'])
    })
  },
  getDatasets ({ commit }) {
    let programId = state.selectedProgram
    let componentId = state.selectedComponent
    let rootUrl = process.env.ROOT_API
    // console.log('----------------dynamic program and component to get datasets---------------')
    console.log(programId)
    console.log(componentId)
    commit('SET_DATASETS', [])
    commit('UPDATE_SELECTED_DATASET', '')
    if (componentId !== null && componentId !== '') {
      Vue.http.get(rootUrl + '/api/programs/' + programId + '/components/' + componentId + '/datasets').then(response => {
        // console.log(response.body)
        if (response && response.body.length > 0) {
          // commit('SET_DATASETS', response.body)
          commit('SET_DATASETS', ['PEPCHARAGEGROUPS2015', 'PEPCHARAGEGROUPS2016', 'PEPCHARAGEGROUPS2017'])
        } else {
          // commit('SET_DATASETS', [])
          commit('SET_DATASETS', ['PEPCHARAGEGROUPS2015', 'PEPCHARAGEGROUPS2016', 'PEPCHARAGEGROUPS2017'])
        }
      }, (error) => {
        console.log(error)
        commit('SET_DATASETS', ['PEPCHARAGEGROUPS2015', 'PEPCHARAGEGROUPS2016', 'PEPCHARAGEGROUPS2017'])
      })
    }
  },
 // commits a mutation to update the component dynamically according to the user selection
  updateSelectedComponent ({ commit }, selectedComponent) {
    // console.log('this is action to commit component selected by the user')
    // console.log(selectedComponent)
    commit('UPDATE_SELECTED_COMPONENT', selectedComponent)
  },
   // commits a mutation to update the program dynamically according to the user selection
  updateSelectedProgram ({ commit }, selectedProgram) {
    // console.log('this is action to commit program selected by the user')
    // console.log(selectedProgram)
    commit('UPDATE_SELECTED_PROGRAM', selectedProgram)
  },
    // commits a mutation to update the dataset dynamically according to the user selection
  updateSelectedDataset ({ commit }, selectedDataset) {
    // console.log('this is action to commit dataset selected by the user')
    // console.log(selectedDataset)
    commit('UPDATE_SELECTED_DATASET', selectedDataset)
  },
    // gets the display label entered by the user
  updateSelectedDisplayLabel ({commit}, selectedDisplaylabel) {
    // console.log('action to commit display label entered by the user')
    // console.loig(selectedDisplaylabel)
    commit('UPDATE_DISPLAY_LABEL', selectedDisplaylabel)
  },
 // gets the list or array of table universes and commits a mutation to update the selectedTableUniverse list/array.
  updateSelectedTableUniverse ({ commit }, selectedTableUniverse) {
    // console.log(selectedTableUniverse)
    commit('UPDATE_SELECTED_TABLE_UNIVERSE', selectedTableUniverse)
  },
  updateSelectedTableId ({commit}, selectedTableId) {
    // console.log(selectedTableId)
    commit('UPDATE_SELECTED_TABLE_ID', selectedTableId)
  }
}
// mutations
const mutations = {
  UPDATE_SELECTED_PROGRAM (state, selectedProgram) {
    // console.log('this is the mutation to set the selectedProgram')
    state.selectedProgram = selectedProgram
    // console.log(state.selectedProgram)
  },
  // mutation to update the component selected by the user, this will be used to get the list datasets for dynamic components and programs.
  UPDATE_SELECTED_COMPONENT (state, selectedComponent) {
    // console.log('this is the mutation to set the selectedComponent')
    state.selectedComponent = selectedComponent
    // console.log(state.selectedComponent)
  },
    // mutation to update the dataset selected by the user, this will be used to clear the dataset selection when the user selects different program or component.
  UPDATE_SELECTED_DATASET (state, selectedDataset) {
    // console.log('this is mutation to set the selectedDataset')
    state.selectedDataset = selectedDataset
    // console.log(state.selectedDataset)
  },
  // mutation to set the user selected component.
  SET_COMPONENTS (state, components) {
    state.components = components
  },
  // mutation to set the user selects dataset.
  SET_DATASETS (state, datasets) {
    state.datasets = datasets
  },
  UPDATE_DISPLAY_LABEL (state, selectedDisplayLabel) {
    state.selectedDisplayLabel = selectedDisplayLabel
  },
  UPDATE_SELECTED_TABLE_ID (state, selectedTableId) {
    state.selectedTableId = selectedTableId
  },
  // mutation to clear and set the tableUniverse value.
  UPDATE_SELECTED_TABLE_UNIVERSE (state, selectedTableUniverse) {
    state.selectedTableUniverse = selectedTableUniverse
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
