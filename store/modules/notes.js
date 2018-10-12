import VueResource from 'vue-resource'
import Vue from 'vue'
import notesService from '../../src/api/notesService.js'

Vue.use(VueResource)
// initial state
const state = {
  notesList: [
    {
      'notePreview': 'This is my second (part2) test note for PEPadfasdf asdf asdf',
      'noteTypeString': 'Header',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'October 11, 2018 03:50:48 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'This is my second (part2) test note for PEPadfasdf asdf asdf',
      'hidden': true,
      'noteString': 'DAVE_TEST_PEP_NOTE2a asdfasdfasdf',
      'programString': 'PEP'
    },
    {
      'notePreview': 'this is a test headnote',
      'noteTypeString': 'Header',
      'lastUpdatedBy': 'Daniel Hsieh',
      'lastUpdatedDate': 'October 11, 2018 10:57:30 am',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'this is a test headnote',
      'hidden': true,
      'noteString': 'Headnote',
      'programString': 'PEP'
    },
    {
      'notePreview': 'Whaq a asd adklfad sjlk;fsda ldfs jlk;dsfa ',
      'noteTypeString': 'Header',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'October 11, 2018 03:49:53 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'Whaq a asd adklfad sjlk;fsda ldfs jlk;dsfa ',
      'hidden': true,
      'noteString': 'MATTS NOTE',
      'programString': 'PEP'
    },
    {
      'notePreview': 'Notes:<br />{NL}The estimates are based on the 2010 Census and reflect changes to the April 1, 2010{NL}pop...',
      'noteTypeString': 'Header',
      'lastUpdatedBy': 'META META',
      'lastUpdatedDate': 'October 11, 2018 03:00:27 pm',
      'deletable': false,
      'usedByTableCount': 2,
      'noteContent': 'Notes:<br />\nThe estimates are based on the 2010 Census and reflect changes to the April 1, 2010\npopulation due to the Count Question Resolution program and geographic program revisions.\nMedian age is calculated based on single year of age. For population estimates methodology\nstatements, see <a href=\'http://www.census.gov/programs-surveys/PEP/technical-documentation/methodology.html\'>\nhttp://www.census.gov/programs-surveys/PEP/technical-documentation/methodology.html</a>.',
      'hidden': true,
      'noteString': 'PEP_2015_PEPAGESEX-001',
      'programString': 'PEP'
    },
    {
      'notePreview': 'The 6,222 people in Bedford city, Virginia, which was an independent city as of the 2010 Census, are...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'August 06, 2018 11:28:26 am',
      'deletable': false,
      'usedByTableCount': 2,
      'noteContent': 'The 6,222 people in Bedford city, Virginia, which was an independent city as of the 2010 Census, are not included in the April 1, 2010 Census enumerated population presented in the county estimates. In July 2013, the legal status of Bedford changed from a city to a town and it became dependent within (or part of) Bedford County, Virginia. This population of Bedford town is now included in the April 1, 2010 estimates base and all July 1 estimates for Bedford County. Because it is no longer an independent city, Bedford town is not listed in this table. As a result, the sum of the April 1, 2010 census values for Virginia counties and independent cities does not equal the 2010 Census count for Virginia, and the sum of April 1, 2010 census values for all counties and independent cities in the United States does not equal the 2010 Census count for the United States. Substantial geographic changes to counties can be found on the Census Bureau website at <a href=\'http://www.census.gov/geo/reference/county-changes.html\'>http://www.census.gov/geo/reference/county-changes.html</a>.',
      'hidden': true,
      'noteString': 'PEP_2015_PEPAGESEX-002',
      'programString': 'PEP'
    },
    {
      'notePreview': '{NL}Suggested Citation: <br />{NL}Annual Estimates of the Resident Population for Selected Age Groups by S...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'August 06, 2018 11:28:27 am',
      'deletable': false,
      'usedByTableCount': 2,
      'noteContent': '\nSuggested Citation: <br />\nAnnual Estimates of the Resident Population for Selected Age Groups by Sex for the United States, States, Counties and Puerto Rico Commonwealth and Municipios: April 1, 2010 to July 1, 2015 <br />\nSource: U.S. Census Bureau, Population Division <br />\nRelease Date: June 2017\n',
      'hidden': true,
      'noteString': 'PEP_2015_PEPAGESEX-003',
      'programString': 'PEP'
    },
    {
      'notePreview': 'Notes:<br />{NL}The estimates are based on the 2010 Census and reflect changes to the April 1, 2010{NL}pop...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'June 28, 2018 02:47:52 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'Notes:<br />\nThe estimates are based on the 2010 Census and reflect changes to the April 1, 2010\npopulation due to the Count Question Resolution program and geographic program revisions.\nMedian age is calculated based on single year of age. For population estimates methodology\nstatements, see <a href=\'http://www.census.gov/programs-surveys/popest/technical-documentation/methodology.html\'>\nhttp://www.census.gov/programs-surveys/popest/technical-documentation/methodology.html</a>.',
      'hidden': true,
      'noteString': 'PEP_2016_PEPAGESEX-001',
      'programString': 'PEP'
    },
    {
      'notePreview': 'The 6,222 people in Bedford city, Virginia, which was an independent city as of the 2010 Census, are...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'June 28, 2018 02:47:53 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'The 6,222 people in Bedford city, Virginia, which was an independent city as of the 2010 Census, are not included in the April 1, 2010 Census enumerated population presented in the county estimates. In July 2013, the legal status of Bedford changed from a city to a town and it became dependent within (or part of) Bedford County, Virginia. This population of Bedford town is now included in the April 1, 2010 estimates base and all July 1 estimates for Bedford County. Because it is no longer an independent city, Bedford town is not listed in this table. As a result, the sum of the April 1, 2010 census values for Virginia counties and independent cities does not equal the 2010 Census count for Virginia, and the sum of April 1, 2010 census values for all counties and independent cities in the United States does not equal the 2010 Census count for the United States. Substantial geographic changes to counties can be found on the Census Bureau website at <a href=\'http://www.census.gov/geo/reference/county-changes.html\'>http://www.census.gov/geo/reference/county-changes.html</a>.',
      'hidden': true,
      'noteString': 'PEP_2016_PEPAGESEX-002',
      'programString': 'PEP'
    },
    {
      'notePreview': '{NL}Suggested Citation: <br />{NL}Annual Estimates of the Resident Population for Selected Age Groups by S...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'June 28, 2018 02:47:53 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': '\nSuggested Citation: <br />\nAnnual Estimates of the Resident Population for Selected Age Groups by Sex for the United States, States, Counties and Puerto Rico Commonwealth and Municipios: April 1, 2010 to July 1, 2016 <br />\nSource: U.S. Census Bureau, Population Division <br />\nRelease Date: June 2017\n',
      'hidden': true,
      'noteString': 'PEP_2016_PEPAGESEX-003',
      'programString': 'PEP'
    },
    {
      'notePreview': 'Notes:<br />{NL}The estimates are based on the 2010 Census and reflect changes to the April 1, 2010{NL}pop...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'August 06, 2018 10:42:54 am',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'Notes:<br />\nThe estimates are based on the 2010 Census and reflect changes to the April 1, 2010\npopulation due to the Count Question Resolution program and geographic program revisions.\nMedian age is calculated based on single year of age. For population estimates methodology\nstatements, see <a href=\'http://www.census.gov/programs-surveys/PEP/technical-documentation/methodology.html\'>\nhttp://www.census.gov/programs-surveys/PEP/technical-documentation/methodology.html</a>.',
      'hidden': true,
      'noteString': 'PEP_2017_PEPAGESEX-001',
      'programString': 'PEP'
    },
    {
      'notePreview': 'The 6,222 people in Bedford city, Virginia, which was an independent city as of the 2010 Census, are...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'August 06, 2018 10:42:54 am',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'The 6,222 people in Bedford city, Virginia, which was an independent city as of the 2010 Census, are not included in the April 1, 2010 Census enumerated population presented in the county estimates. In July 2013, the legal status of Bedford changed from a city to a town and it became dependent within (or part of) Bedford County, Virginia. This population of Bedford town is now included in the April 1, 2010 estimates base and all July 1 estimates for Bedford County. Because it is no longer an independent city, Bedford town is not listed in this table. As a result, the sum of the April 1, 2010 census values for Virginia counties and independent cities does not equal the 2010 Census count for Virginia, and the sum of April 1, 2010 census values for all counties and independent cities in the United States does not equal the 2010 Census count for the United States. Substantial geographic changes to counties can be found on the Census Bureau website at <a href=\'http://www.census.gov/geo/reference/county-changes.html\'>http://www.census.gov/geo/reference/county-changes.html</a>.',
      'hidden': true,
      'noteString': 'PEP_2017_PEPAGESEX-002',
      'programString': 'PEP'
    },
    {
      'notePreview': '{NL}Suggested Citation: <br />{NL}Annual Estimates of the Resident Population for Selected Age Groups by S...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'August 06, 2018 10:42:55 am',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': '\nSuggested Citation: <br />\nAnnual Estimates of the Resident Population for Selected Age Groups by Sex for the United States, States, Counties and Puerto Rico Commonwealth and Municipios: April 1, 2010 to July 1, 2017 <br />\nSource: U.S. Census Bureau, Population Division <br />\nRelease Date: June 2017\n',
      'hidden': true,
      'noteString': 'PEP_2017_PEPAGESEX-003',
      'programString': 'PEP'
    },
    {
      'notePreview': 'asdfasdf',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'META META',
      'lastUpdatedDate': 'October 11, 2018 02:59:43 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'asdfasdf',
      'hidden': true,
      'noteString': 'asdfasfd',
      'programString': 'PEP'
    },
    {
      'notePreview': '�El Ni�o�� �  vis-�-vis� �  � H�20 r�sum� 1\r{NL}',
      'noteTypeString': 'Header',
      'lastUpdatedBy': 'Matthew Curtiss',
      'lastUpdatedDate': 'October 11, 2018 04:08:36 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': '�El Ni�o�� �  vis-�-vis� �  � H�20 r�sum� 1\r\n',
      'hidden': true,
      'noteString': 'sdajfakdlsfj;ads fas',
      'programString': 'PEP'
    },
    {
      'notePreview': 'main.js  asdfasdfasdf{NL}{NL}{NL}/* <div class=\'container-fluid\'>{NL}      <meta2-header></meta2-header>{NL}      <...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'META META',
      'lastUpdatedDate': 'October 04, 2018 04:39:42 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'main.js  asdfasdfasdf\n\n\n/* <div class=\'container-fluid\'>\n      <meta2-header></meta2-header>\n      <br>\n      <nav-bar></nav-bar>\n      <bread-crumbs></bread-crumbs>\n      <router-view></router-view>\n      <meta2-footer></meta2-footer>\n    </div> */\n\t\n\t\n\t\n\tNavBar.vue\n\t\n\t\n\t <div>\n    <nav class=\'navbar navbar-expand-lg border rounded\'>\n      <div class=\'collapse navbar-collapse\' id=\'navbarSupportedContent\'>\n        <ul class=\'navbar-nav\'>\n          <li>\n',
      'hidden': true,
      'noteString': 'sdajfakdlsfj;ads fas',
      'programString': 'PEP'
    },
    {
      'notePreview': 'store.js\r{NL}\r{NL}\r{NL}\r{NL}import Vue from vue\r{NL}import Vuex from vuex\r{NL}import VueResource from vue-resourc...',
      'noteTypeString': 'Header',
      'lastUpdatedBy': 'Sri Deevi',
      'lastUpdatedDate': 'October 11, 2018 02:51:50 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'store.js\r\n\r\n\r\n\r\nimport Vue from vue\r\nimport Vuex from vuex\r\nimport VueResource from vue-resource\r\n\r\nVue.use(Vuex)\r\nVue.use(VueResource)\r\n\r\nexport default new Vuex.Store({\r\n\tstate: {\r\n      tablesList: [],\r\n\t  programs: [],\r\n      user: ,\r\n      selectedProgram: ,\r\n      components: [],\r\n      selectedComponent: ,\r\n      datasets: [],\r\n      selectedDataset:,\r\n      baseUrl : /meta2,\r\n',
      'hidden': true,
      'noteString': 'testing dev',
      'programString': 'PEP'
    },
    {
      'notePreview': 'Dimensions.vue\r{NL}\r{NL}\r{NL}<template>\r{NL}<v-container fluid>\r{NL}<v-alert :value=\'showalert\'>Please select atlea...',
      'noteTypeString': 'Footer',
      'lastUpdatedBy': 'META META',
      'lastUpdatedDate': 'October 05, 2018 12:47:28 pm',
      'deletable': false,
      'usedByTableCount': 0,
      'noteContent': 'Dimensions.vue\r\n\r\n\r\n<template>\r\n<v-container fluid>\r\n<v-alert :value=\'showalert\'>',
      'hidden': true,
      'noteString': 'upload file test',
      'programString': 'PEP'
    }
  ]
}
// getters
const getters = {
  notesList: state => {
    return state.notesList
  }
}
// actions
const actions = {
  getNotes ({commit}) {
    notesService.getNotesList().then(response => {
      if (response && response.body.length > 0) {
        commit('SET_NOTES_LIST', response.body)
      }
    }, error => {
      commit('SET_NOTES_LIST', [])
      console.log(error)
    })
  }
}
// mutations
const mutations = {
  SET_NOTES_LIST (state, notesList) {
    state.notesList = notesList
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
