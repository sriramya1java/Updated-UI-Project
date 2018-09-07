import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)
// initial state
const state = {
  programs: ['ACS', 'PEP'],
  user: 'DEEVI001'
}
// getters
const getters = {
  user: state => {
    return state.user
  },
  programs: state => {
    return state.programs
  }
}
// mutations
const mutations = {
  // mutation to set the list of programs associated with the user.
  SET_PROGRAMS (state, programs) {
    state.programs = programs
  },
  // mutation to set the user name who logs in.
  SET_USER (state, user) {
    state.user = user
  }
}
// actions
const actions = {
  getUserAndPrograms ({ commit }) {
    let rootUrl = process.env.ROOT_API
    Vue.http.get(rootUrl + '/api/user/details').then(response => {
      // console.log(response.body.programs)
      // console.log(response.body.id)
      if (response && response.body && response.body.id && response.body.programs.length > 0) {
        commit('SET_PROGRAMS', response.body.programs)
        commit('SET_USER', response.body.id)
      } else {
        commit('SET_PROGRAMS', [])
        commit('SET_USER', '')
      }
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
