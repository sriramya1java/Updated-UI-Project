import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import userAndPrograms from './modules/userAndPrograms'
import tables from './modules/tables'
import tableBasicMetadata from './modules/tableBasicMetadata'
import dimensions from './modules/dimensions'
import categories from './modules/categories'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
	modules: {
		userAndPrograms,
		tables,
		tableBasicMetadata,
		dimensions,
		categories
	}
	 /* state: {
      tablesList: [],
	  programs: [],
      user: '',
      selectedProgram: '',
      components: [],
      selectedComponent: '',
      datasets: [],
      selectedDataset: '',
      selectedTableId: '',
      selectedDisplayLabel: '',
      baseUrl : '/meta2',
      // baseUrl: 'http://localhost:8080/meta2',
      selectedTableUniverse: [],
      dimensionsList: [], 
      dimensionsLoad: false,
      verticalDimensionsList: [],
      horizontalDimensionsList: [],
      outsideDimensionsList: [],
      verticalDimensionsSelected: [],
      horizontalDimensionsSelected: [],
      outsideDimensionsSelected: [],
      categoriesList: [],
      categoriesList1: [ {id: '9999', label: 'Categories', children: []} ]
	},
	getters: {
		selectedProgramId () {
			return this.$store.state.selectedProgram
		},
		selectedComponentId () {
			return this.$store.state.selectedComponent
		},
		selectedDatasetId () {
			return this.$store.state.selectedDataset
		},
		selectedDisplayLabel () {
			return this.$store.state.selectedDisplayLabel
		},
		selectedTableId () {
			return this.$store.state.selectedTableId
		}
	},
	// mutations are synchronous transactions
	mutations: {
		SET_TABLES_LIST(state, tablesList) {
			state.tablesList = tablesList
			console.log(state.tablesList)
		},
		// mutation to set the list of programs associated with the user.
		SET_PROGRAMS (state, programs) {
			state.programs = programs
		},
		// mutation to set the user name who logs in.
		SET_USER (state, user) {
			state.user = user
		},
		// mutation to update the program selected by the user, this will be used to get the list components for dynamic programs.
		UPDATE_SELECTED_PROGRAM(state, selectedProgram) {
			console.log('this is the mutation to set the selectedProgram')
			state.selectedProgram = selectedProgram
			console.log(state.selectedProgram)
		},
		// mutation to update the component selected by the user, this will be used to get the list datasets for dynamic components and programs.
		UPDATE_SELECTED_COMPONENT(state, selectedComponent) {
			console.log('this is the mutation to set the selectedComponent')
			state.selectedComponent = selectedComponent
			console.log(state.selectedComponent)
		},
        // mutation to update the dataset selected by the user, this will be used to clear the dataset selection when the user selects different program or component.
		UPDATE_SELECTED_DATASET(state, selectedDataset) {
			console.log('this is mutation to set the selectedDataset')
			state.selectedDataset = selectedDataset
			console.log(state.selectedDataset)
		},
		// mutation to set the user selected component.
		SET_COMPONENTS(state, components) {
			state.components = components
		},
		// mutation to set the user selects dataset.
		SET_DATASETS(state, datasets) {
			state.datasets = datasets
		},
		// mutation to clear and set the tableUniverse value.
		UPDATE_SELECTED_TABLE_UNIVERSE(state, selectedTableUniverse) {
			state.selectedTableUniverse = selectedTableUniverse
		},
		SET_DIMENSIONS(state, dimensionsList) {
			console.log(dimensionsList)
			state.dimensionsList = dimensionsList
			console.log(state.dimensionsList)
		},
		UPDATE_DIMENSIONS_LOAD(state, dimensionsLoad) {
			state.dimensionsLoad = dimensionsLoad
		},
		UPDATE_VERTICAL_DIMENSIONS_LIST(state, verticalDimensionsList) {
			state.verticalDimensionsList = verticalDimensionsList
		},
		UPDATE_HORIZONTAL_DIMENSIONS_LIST(state, horizontalDimensionsList) {
			state.horizontalDimensionsList = horizontalDimensionsList
		},
		UPDATE_OUTSIDE_DIMENSIONS_LIST(state, outsideDimensionsList) {
			state.outsideDimensionsList = outsideDimensionsList
		},
		UPDATE_VERTICAL_DIMENSIONS_SELECTED(state, verticalDimensionsSelected) {
			state.verticalDimensionsSelected = verticalDimensionsSelected
		},
		UPDATE_HORIZONTAL_DIMENSIONS_SELECTED(state, horizontalDimensionsSelected) {
			state.horizontalDimensionsSelected = horizontalDimensionsSelected
		},
		UPDATE_OUTSIDE_DIMENSIONS_SELECTED(state, outsideDimensionsSelected) {
			state.outsideDimensionsSelected = outsideDimensionsSelected
		},
		SET_CATEGORIES(state, categoriesList) {
			state.categoriesList = categoriesList
		},
		SET_CATEGORIES_LIST1(state, categoriesList1) {
			state.categoriesList1 = categoriesList1
		},
		UPDATE_DISPLAY_LABEL(state, selectedDisplayLabel) {
			state.selectedDisplayLabel = selectedDisplayLabel
		},
		UPDATE_SELECTED_TABLE_ID(state, selectedTableId) {
			state.selectedTableId = selectedTableId
		}
	},
	// instead of mutating the state, actions commit mutations
	// actions can contain arbitrary asynchronous operations.
	actions: {
		//gets the list of tables in the program user is associated to.
		getTables ({commit}) {
			let rootUrl = this.state.baseUrl
			Vue.http.get(rootUrl +'/api/summary/tables').then(response => {
				console.log(response.body)
				if (response && response.body.length > 0) {
					commit('SET_TABLES_LIST', response.body)	
				} else {
					commit('SET_TABLES_LIST', [])
				}
			})
		},
		verticalDimensionSelectedUpdated({ commit }, verticalDimensionsSelected) {
			console.log('----------------------------this is action to commit VerticalDimension selected by the user-----------------------')
	    	console.log(verticalDimensionsSelected)
	    	console.log(verticalDimensionsSelected.length)
	    	commit('UPDATE_VERTICAL_DIMENSIONS_SELECTED', verticalDimensionsSelected)
		},
		horizontalDimensionSelectedUpdated({ commit }, horizontalDimensionsSelected) {
			console.log('********************* this is action to commit horizontal Dimension selected by the user*********************')
	    	console.log(horizontalDimensionsSelected)
	    	commit('UPDATE_HORIZONTAL_DIMENSIONS_SELECTED', horizontalDimensionsSelected)
		},
		outsideDimensionSelectedUpdated({ commit }, outsideDimensionsSelected) {
			console.log('############################## this is action to commit OUTSIDE Dimension selected by the user ################')
	    	console.log(outsideDimensionsSelected)
	    	commit('UPDATE_OUTSIDE_DIMENSIONS_SELECTED', outsideDimensionsSelected)
		},
		updateVerticalDimensionsList ({ commit }, verticalDimensionsList) {
			console.log('this is action to commit VerticalDimensionsList selected by the user')
	    	console.log(verticalDimensionsList)
	    	commit('UPDATE_VERTICAL_DIMENSIONS_LIST', verticalDimensionsList)
		},
		updateHorizontalDimensionsList ({ commit }, horizontalDimensionsList) {
			console.log('this is action to commit horizontalDimensionsList selected by the user')
	    	console.log(horizontalDimensionsList)
	    	commit('UPDATE_HORIZONTAL_DIMENSIONS_LIST', horizontalDimensionsList)
		},
		updateOutsideDimensionsList ({ commit }, outsideDimensionsList) {
			console.log('this is action to commit outsideDimensionsList selected by the user')
	    	console.log(outsideDimensionsList)
	    	commit('UPDATE_OUTSIDE_DIMENSIONS_LIST', outsideDimensionsList)
		},
		// gets the list of programs and the userName of the user. commits two mutations for both username and programs list
		getUserAndPrograms ({ commit }) {
			let rootUrl = this.state.baseUrl
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
	  
	    },
	    // commits a mutation to update the component dynamically according to the user selection
	    updateSelectedComponent ({ commit }, selectedComponent) {
	    	console.log('this is action to commit component selected by the user')
	    	console.log(selectedComponent)
	    	commit('UPDATE_SELECTED_COMPONENT', selectedComponent)
	    	
	    },
	   // commits a mutation to update the program dynamically according to the user selection
	    updateSelectedProgram ({ commit }, selectedProgram) {
	    	console.log('this is action to commit program selected by the user')
	    	console.log(selectedProgram)
	    	commit('UPDATE_SELECTED_PROGRAM', selectedProgram)
	    },
	    // commits a mutation to update the dataset dynamically according to the user selection
	    updateSelectedDataset ({ commit }, selectedDataset) {
	    	console.log('this is action to commit dataset selected by the user')
	    	console.log(selectedDataset)
	    	commit('UPDATE_SELECTED_DATASET', selectedDataset)
	    },
	    //gets the display label entered by the user
	    updateSelectedDisplayLabel ({commit}, selectedDisplaylabel) {
	    	console.log('action to commit display label entered by the user')
	    	console.loig(selectedDisplaylabel)
	    	commit('UPDATE_DISPLAY_LABEL', selectedDisplaylabel)
	    },
	    // gets the list of components using the dynamic selectedProgram value and commits a mutation to update the components list.
	    getComponents ({ commit }) {
	    	let programId = this.state.selectedProgram
	    	let rootUrl = this.state.baseUrl
	    	console.log(programId)
	    	commit('SET_DATASETS', [])
	    	commit('SET_COMPONENTS', [])
	    	commit('UPDATE_SELECTED_DATASET', '')
	    	commit('UPDATE_SELECTED_COMPONENT', '')
	    	Vue.http.get(rootUrl +'/api/programs/'+ programId +'/components').then(response => {
	        	console.log(response.body)
	        	if (response && response.body.length > 0) {
	        		commit('SET_COMPONENTS', response.body)	
				} else {
					commit('SET_COMPONENTS', [])
				}
	        })
	    	
	    },
	    // gets the list or array of table universes and commits a mutation to update the selectedTableUniverse list/array.
	    updateSelectedTableUniverse ({ commit }, selectedTableUniverse) {
	    	console.log(selectedTableUniverse)
	    	commit('UPDATE_SELECTED_TABLE_UNIVERSE', selectedTableUniverse)	    	
	    },
	    updateSelectedTableId ({commit}, selectedTableId) {
	    	console.log(selectedTableId)
	    	commit('UPDATE_SELECTED_TABLE_ID', selectedTableId)
	    },
	    //gets all the categories list
	    getCategoriesList ({commit}, axes) {
	    	let rootUrl = this.state.baseUrl
	    	let programId = this.state.selectedProgram
	    	let componentId = this.state.selectedComponent
	    	let datasetId = this.state.selectedDataset
	    	let dimensionId
	    	console.log(axes)
	    	if(axes === 'vertical') { 
	    		console.log(this.state.verticalDimensionsSelected[0].id)
	    		dimensionId = this.state.verticalDimensionsSelected[0].id
	    		console.log(dimensionId)
	    		} else if(axes === 'horizontal') {
	    			dimensionId = this.state.horizontalDimensionsSelected[0].id
	    		} else if(axes === 'outside') {
	    			dimensionId = this.state.outsideDimensionsSelected[0].id
	    		}
	    	if(dimensionId !== '' && dimensionId !== undefined) {
	    		Vue.http.get(rootUrl +'/api/programs/'+ programId +'/components/'+ componentId +'/datasets/'+ datasetId +'/dimensions/'+ dimensionId +'/categories').then(response => {
	    			console.log(response.body)
	    			if(response && response.body.length > 0) {
	    				let data = response.body
	    				/* data.forEach(function (arrayItem) {
	    					arrayItem.children = []
	    					console.log(arrayItem)
	    					console.log(data)
	    				}) */
	    				/* commit('SET_CATEGORIES', data)
	    				commit('SET_CATEGORIES_LIST1', [ {id: '9999', label: 'Categories', children: []} ])
	    			} else {
	    				commit('SET_CATEGORIES', [])
	    			}
	    		})
	    	}
	    },
	    //gets all the dimensions List
	    getDimensionsList ({commit}) {
	    	let programId = this.state.selectedProgram
	    	let componentId = this.state.selectedComponent
	    	let datasetId = this.state.selectedDataset
	    	let rootUrl = this.state.baseUrl
	    	console.log('---------------api call for the list of dimensions---------')
	    	console.log(programId)
	    	console.log(componentId)
	    	console.log(datasetId)
	    	if(programId !== '' && componentId !== '' && datasetId !== '') {
	    	Vue.http.get(rootUrl +'/api/programs/'+ programId +'/components/'+ componentId +'/datasets/'+ datasetId +'/dimensions').then(response => {
	    		console.log(response.body)
	    		if(response && response.body.length > 0) {
	    			commit('SET_DIMENSIONS', response.body)
	    		} else {
	    			commit('SET_DIMENSIONS', [])
	    		}
	    	})
	      }
	    },
	    updateDimensionsLoad ({commit}, dimensionsLoad) {
	    	if(this.state.selectedProgram !== '' && this.state.selectedComponent !== '' && this.state.selectedDataset !== '') {
	    		commit('UPDATE_DIMENSIONS_LOAD', true)
	    	} else {
	    		commit('UPDATE_DIMENSIONS_LOAD', false)
	    	}
	    },
	    // gets the list of datasets using the dynamic selectedProgram and selectedComponent value and commits a mutation to the update the dataset list.
	    getDatasets ({ commit }) {
	    	let programId = this.state.selectedProgram
	    	let componentId = this.state.selectedComponent
	    	let rootUrl = this.state.baseUrl
	    	console.log('----------------dynamic program and component to get datasets---------------')
	    	console.log(programId)
	    	console.log(componentId)
	    	commit('SET_DATASETS', [])
	    	commit('UPDATE_SELECTED_DATASET', '')
	    	if (componentId !== null && componentId !== '') {
	    		Vue.http.get(rootUrl +'/api/programs/'+ programId +'/components/'+ componentId +'/datasets').then(response => {
		        	console.log(response.body)
		        	if (response && response.body.length > 0) {
		        		commit('SET_DATASETS', response.body)
					} else {
						commit('SET_DATASETS', [])
					}
		        })
	    	}
	    }
	} */
})


