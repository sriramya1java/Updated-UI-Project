import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)
// initial state
const state = {
  tablesList: [{'displayLabel': 'TENURE BY VEHICLES AVAILABLE BY AGE OF HOUSEHOLDER', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'lastDeliveredBy': 'Daniel Hsieh', 'lastDelivered': 'September 07, 2018 10:16:54 am', 'readyToDeliver': true, 'changedSinceLastExport': true, 'datasetString': 'ACSDT1Y2016', 'tableString': 'B25045', 'programString': 'ACS', 'componentString': 'ACSDT'}, {'displayLabel': 'Annual Estimates of the Resident Population for Selected Age Groups by Sex for the United States, St...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'lastDeliveredBy': 'Daniel Hsieh', 'lastDelivered': 'September 07, 2018 10:15:51 am', 'readyToDeliver': true, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2015', 'tableString': 'PEPAGESEX', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Annual Estimates of the Resident Population by Sex, Single Year of Age, Race, and Hispanic Origin fo...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'lastDeliveredBy': 'Daniel Hsieh', 'lastDelivered': 'August 23, 2018 11:29:27 am', 'readyToDeliver': false, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2015', 'tableString': 'PEPALL6N', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Annual Estimates of the Resident Population by Sex, Age, Race, and Hispanic Origin for the United St...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'readyToDeliver': false, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2015', 'tableString': 'PEPASR6H', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Annual Estimates of the Resident Population for Selected Age Groups by Sex for the United States, St...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'lastDeliveredBy': 'Matthew Curtiss', 'lastDelivered': 'August 06, 2018 11:32:31 am', 'readyToDeliver': true, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2016', 'tableString': 'PEPAGESEX', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Annual Estimates of the Resident Population by Sex, Single Year of Age, Race Alone or in Combination...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'readyToDeliver': false, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2016', 'tableString': 'PEPALL5N', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Annual Estimates of the Resident Population by Sex, Age, Race, and Hispanic Origin for the United St...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'readyToDeliver': false, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2016', 'tableString': 'PEPASR6H', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Annual Estimates of the Resident Population for Selected Age Groups by Sex for the United States, St...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'lastDeliveredBy': 'David Riley', 'lastDelivered': 'September 06, 2018 02:07:37 pm', 'readyToDeliver': true, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2017', 'tableString': 'PEPAGESEX', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Estimates of Housing Unit Change for the United States and States, and State Rankings: July 1, 2014 ...', 'lastUpdatedBy': 'Matthew Curtiss', 'presentationStyle': 'HIERARCHICAL1', 'readyToDeliver': false, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2017', 'tableString': 'PEPANNCHG', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}, {'displayLabel': 'Annual Estimates of the Resident Population by Sex, Age, Race, and Hispanic Origin for the United St...', 'lastUpdatedBy': 'David Riley', 'lastUpdated': 'August 24, 2018 02:45:22 pm', 'presentationStyle': 'FLAT1', 'readyToDeliver': false, 'changedSinceLastExport': true, 'datasetString': 'PEPCHARAGEGROUPS2017', 'tableString': 'PEPASR6H', 'programString': 'PEP', 'componentString': 'PEPCHARAGEGROUPS'}],
  exportTablesList: []
}
// getters
const getters = {
  tablesList: state => {
    return state.tablesList
  }
}
// actions
const actions = {
  getTables ({commit}) {
    let rootUrl = process.env.ROOT_API
    Vue.http.get(rootUrl + '/api/summary/tables').then(response => {
      console.log(response.body)
      console.log(JSON.stringify(response.body))
      if (response && response.body.length > 0) {
        commit('SET_TABLES_LIST', response.body)
      } else {
        commit('SET_TABLES_LIST', [])
      }
    })
  },
  getExportTablesList ({commit}, exportTablesList) {
    commit('SET_EXPORT_TABLES_LIST', exportTablesList)
  },
  postExportTablesList (context) {
    let rootUrl = process.env.ROOT_API
    let exportData = {
      program: '',
      component: '',
      dataset: '',
      tableIds: []
    }
    console.log(state.exportTablesList[0])
    exportData.program = state.exportTablesList[0].programString
    exportData.component = state.exportTablesList[0].componentString
    exportData.dataset = state.exportTablesList[0].datasetString
    state.exportTablesList.forEach(x => {
      exportData.tableIds.push(x.tableString)
    })
    console.log(exportData)
    return new Promise((resolve, reject) => {
      Vue.http.post(rootUrl + '/api/export', exportData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('response', response)
        resolve(response)
      }, (e) => {
        reject(e)
        console.log('error', e)
      })
    })
  }
}
// mutations
const mutations = {
  SET_TABLES_LIST (state, tablesList) {
    state.tablesList = tablesList
    // console.log(state.tablesList)
  },
  SET_EXPORT_TABLES_LIST (state, exportTablesList) {
    state.exportTablesList = exportTablesList
    console.log(state.exportTablesList)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
