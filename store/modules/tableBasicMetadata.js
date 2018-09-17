import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)
// initial state
const state = {
  tableObj: {
    selectedProgram: '',
    selectedComponent: '',
    selectedDataset: '',
    selectedTableId: '',
    selectedDisplayLabel: '',
    selectedTableUniverse: [],
    selectedDisplayDescription: '',
    selectedPresentationalStyle: ''
  },
  components: ['PEPCHARAGEGROUPS', 'POPESTCHARAGEGROUPS'],
  datasets: ['PEPCHARAGEGROUPS2015', 'PEPCHARAGEGROUPS2016', 'PEPCHARAGEGROUPS2017'],
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
 /* getComponents ({ commit }) {
    const programId = state.tableObj.selectedProgram
    console.log(programId)
    commit('SET_DATASETS', [])
    commit('SET_COMPONENTS', [])
    commit('UPDATE_SELECTED_DATASET', '')
    commit('UPDATE_SELECTED_COMPONENT', '')
    Vue.http.get('api/programs/' + programId + '/components').then(response => {
      // console.log(response.body)
      if (response && response.body.length > 0) {
        commit('SET_COMPONENTS', response.body)
      } else {
        commit('SET_COMPONENTS', [])
      }
    })
  },
  getDatasets ({ commit }) {
    let programId = state.tableObj.selectedProgram
    let componentId = state.tableObj.selectedComponent
    // console.log('----------------dynamic program and component to get datasets---------------')
    console.log(programId)
    console.log(componentId)
    commit('SET_DATASETS', [])
    commit('UPDATE_SELECTED_DATASET', '')
    if (componentId !== null && componentId !== '') {
      Vue.http.get('api/programs/' + programId + '/components/' + componentId + '/datasets').then(response => {
        // console.log(response.body)
        if (response && response.body.length > 0) {
          commit('SET_DATASETS', response.body)
        } else {
          commit('SET_DATASETS', [])
        }
      })
    }
  }, */
  saveTable ({ commit, rootState }) {
    console.log(state.tableObj)
    if (state.tableObj) {
      let program = state.tableObj.selectedProgram
      let component = state.tableObj.selectedComponent
      let dataset = state.tableObj.selectedDataset
      let saveTableObj = {
        datasetString: '',
        tableString: '',
        universes: [],
        description: '',
        style: '',
        label: '',
        lastEditedBy: ''
      }
      saveTableObj.datasetString = state.tableObj.selectedDataset
      saveTableObj.tableString = state.tableObj.selectedTableId
      saveTableObj.universes = state.tableObj.selectedTableUniverse
      saveTableObj.description = state.tableObj.selectedDisplayDescription
      saveTableObj.style = state.tableObj.selectedPresentationalStyle.id
      saveTableObj.label = state.tableObj.selectedDisplayLabel
      saveTableObj.lastEditedBy = rootState.userAndPrograms.user
      return new Promise((resolve, reject) => {
        Vue.http.post('api/programs/' + program + '/components/' + component + '/datasets/' + dataset + '/tables/', saveTableObj).then((response) => {
          // console.log(response)
          resolve(response)
        }, (e) => {
          reject(e)
          // console.log(e)
        })
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
  },
  updateSelectedDisplayDescription ({commit}, selectedDisplayDescription) {
    // console.log(selectedTableId)
    commit('UPDATE_SELECTED_DISPLAY_DESCRIPTION', selectedDisplayDescription)
  },
  updateSelectedPresentationalStyle ({commit}, selectedPresentationalStyle) {
    // console.log(selectedTableId)
    commit('UPDATE_SELECTED_PRESENTATIONAL_STYLE', selectedPresentationalStyle)
  }
}
// mutations
const mutations = {
  UPDATE_SELECTED_PROGRAM (state, selectedProgram) {
    // console.log('this is the mutation to set the selectedProgram')
    state.tableObj.selectedProgram = selectedProgram
    // console.log(state.selectedProgram)
  },
  // mutation to update the component selected by the user, this will be used to get the list datasets for dynamic components and programs.
  UPDATE_SELECTED_COMPONENT (state, selectedComponent) {
    // console.log('this is the mutation to set the selectedComponent')
    state.tableObj.selectedComponent = selectedComponent
    // console.log(state.selectedComponent)
  },
  // mutation to update the dataset selected by the user, this will be used to clear the dataset selection when the user selects different program or component.
  UPDATE_SELECTED_DATASET (state, selectedDataset) {
    // console.log('this is mutation to set the selectedDataset')
    state.tableObj.selectedDataset = selectedDataset
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
    state.tableObj.selectedDisplayLabel = selectedDisplayLabel
  },
  UPDATE_SELECTED_TABLE_ID (state, selectedTableId) {
    state.tableObj.selectedTableId = selectedTableId
  },
  // mutation to clear and set the tableUniverse value.
  UPDATE_SELECTED_TABLE_UNIVERSE (state, selectedTableUniverse) {
    state.tableObj.selectedTableUniverse = selectedTableUniverse
  },
  UPDATE_SELECTED_DISPLAY_DESCRIPTION (state, selectedDisplayDescription) {
    state.tableObj.selectedDisplayDescription = selectedDisplayDescription
  },
  UPDATE_SELECTED_PRESENTATIONAL_STYLE (state, selectedPresentationalStyle) {
    /* if(selectedPresentationalStyle === 'HIERARCHICAL1') {
      state.tableObj.selectedPresentationalStyle = {
            'id': 'HIERARCHICAL1',
            'label': 'Hierarchical'
          }
    } else if(selectedPresentationalStyle === 'FLAT1') {
      state.tableObj.selectedPresentationalStyle = {
            'id': 'FLAT1',
            'label': 'Flat'
          }
    } else {
      state.tableObj.selectedPresentationalStyle = {}
    }
  } */
    state.tableObj.selectedPresentationalStyle = selectedPresentationalStyle
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
