const state = {
  disableNotesTab: true,
  disableDimensionsTab: true
}
const actions = {}
const mutations = {
  SET_DISABLE_NOTES_TAB(state, disableNotesTab) {
    state.disableNotesTab = disableNotesTab
  },
  SET_DISABLE_DIMENSIONS_TAB(state, disableDimensionsTab) {
    state.disableDimensionsTab = disableDimensionsTab
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
