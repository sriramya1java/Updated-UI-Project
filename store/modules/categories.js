import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)
// initial state
const state = {
  categoriesList: [{'label': '4/1/2010 Census Population', 'id': '1'}, {'label': '4/1/2010 population estimates base', 'id': '2'}, {'label': '7/1/2010 population estimate', 'id': '3'}, {'label': '7/1/2011 population estimate', 'id': '4'}, {'label': '7/1/2012 population estimate', 'id': '5'}, {'label': '7/1/2013 population estimate', 'id': '6'}, {'label': '7/1/2014 population estimate', 'id': '7'}, {'label': '7/1/2015 population estimate', 'id': '8'}, {'label': '7/1/2016 population estimate', 'id': '9'}, {'label': '7/1/2017 population estimate', 'id': '10'}, {'label': '7/1/2018 population estimate', 'id': '11'}, {'label': '7/1/2019 population estimate', 'id': '12'}, {'label': '7/1/2020 population estimate', 'id': '13'}],
  categoriesList1: [ {id: 'Categories', label: 'Categories', children: []} ],
  editingCategory: {},
  startDragWidth: ''
}
// getters
const getters = {
}
// actions
const actions = {
  getCategoriesList ({commit, rootState}, axes) {
    let rootUrl = process.env.ROOT_API
    let programId = rootState.tableBasicMetadata.selectedProgram
    let componentId = rootState.tableBasicMetadata.selectedComponent
    let datasetId = rootState.tableBasicMetadata.selectedDataset
    let dimensionId
    console.log(axes)
    if (axes === 'vertical') {
      console.log(rootState.dimensions.verticalDimensionsSelected[0].id)
      dimensionId = rootState.dimensions.verticalDimensionsSelected[0].id
      console.log(dimensionId)
    } else if (axes === 'horizontal') {
      dimensionId = rootState.dimensions.horizontalDimensionsSelected[0].id
    } else if (axes === 'outside') {
      dimensionId = rootState.dimensions.outsideDimensionsSelected[0].id
    }
    if (dimensionId !== '' && dimensionId !== undefined) {
      Vue.http.get(rootUrl + '/api/programs/' + programId + '/components/' + componentId + '/datasets/' + datasetId + '/dimensions/' + dimensionId + '/categories').then(response => {
        console.log(response.body)
        if (response && response.body.length > 0) {
          let data = response.body
          commit('SET_CATEGORIES', data)
          commit('SET_CATEGORIES_LIST1', [ {id: 'Categories', label: 'Categories', children: []} ])
        } else {
          commit('SET_CATEGORIES', [])
        }
      })
    }
  }
}
// mutations
const mutations = {
  SET_CATEGORIES (state, categoriesList) {
    state.categoriesList = categoriesList
  },
  SET_CATEGORIES_LIST1 (state, categoriesList1) {
    state.categoriesList1 = categoriesList1
  },
  SET_EDITING_CATEGORY (state, editingCategory) {
    state.editingCategory = editingCategory
    console.log('something in state -------------', state.editingCategory)
  },
  SET_CATEGORIES_LIST_CHILDREN (state, array) {
    state.categoriesList1[0].children = array
  },
  SET_START_DRAG_WIDTH (state, startDragwidth) {
    state.startDragWidth = startDragwidth
    console.log('setted in store*********************', state.startDragWidth)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
