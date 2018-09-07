import API_BASE_URL from '../constants/constants.js'
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default {
	getUserAndPrograms () {
		let baseUrl = API_BASE_URL
		Vue.http.get(rootUrl +'/api/user/details').then(response => {
	    	console.log(response.body.programs)
	    	console.log(response.body.id)
	    	commit('UPDATE_SELECTED_COMPONENT', '')
	    	commit('UPDATE_SELECTED_DATASET', '')
	    	commit('SET_DATASETS', [])
		    commit('SET_COMPONENTS', [])
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
