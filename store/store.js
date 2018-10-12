import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import userAndPrograms from './modules/userAndPrograms'
import tables from './modules/tables'
import notes from './modules/notes'
import tableBasicMetadata from './modules/tableBasicMetadata'
import dimensions from './modules/dimensions'
import categories from './modules/categories'
import createEditTable from './modules/createEditTable'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  modules: {
    userAndPrograms,
    tables,
    notes,
    tableBasicMetadata,
    dimensions,
    categories,
    createEditTable
  }
})
