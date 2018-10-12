import ApiService from './apiService'

// const UNIVERSE_URI = '/api/universes'

function getComponentsURI (program) {
  return `api/programs/${program}/components`
}
function getDatasetsURI (program, component) {
  return `api/programs/${program}/components/${component}/datasets`
}

function getDimensionsURI (program, component, dataset) {
  return `api/programs/${program}/components/${component}/datasets/${dataset}/dimensions`
}

function getCategoriesURI (program, component, dataset, dimensionId) {
  return `api/programs/${program}/components/${component}/datasets/${dataset}/dimensions/${dimensionId}/categories`
}

export default {
  getComponents (program) {
    let componentURI = getComponentsURI(program)
    return ApiService.get(componentURI)
  },
  getDatasets (program, component) {
    let datasetURI = getDatasetsURI(program, component)
    return ApiService.get(datasetURI)
  },
  getUniverses () {
    // return ApiService.get(UNIVERSE_URI)
    // This is a hardcoded text used as a place holder until the Universe API is available
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve({body: [{universeString: 'AIAN_US', universeLabel: 'American Indian and Alaska Native alone population in the United States'},
                 {universeString: 'ASIAN_US', universeLabel: 'Asian alone population in the United States'},
                 {universeString: 'NHPI_US', universeLabel: 'Native Hawaiian and other Pacific Islander alone population in the United States'},
                 {universeString: 'SOR_US', universeLabel: 'Some other race alone population in the United States'},
                 {universeString: '2RACE_US', universeLabel: 'Two or more races population in the United States'},
                 {universeString: 'WHITE_NOHISP_US', universeLabel: 'White alone, not Hispanic or Latino population in the United States'},
                 {universeString: 'HISP_US', universeLabel: 'Hispanic or Latino population in the United States'},
                 {universeString: 'WHITE_PR', universeLabel: 'White alone population in Puerto Rico'},
                 {universeString: 'BLACK_PR', universeLabel: 'Black or African American alone population in Puerto Rico'},
                 {universeString: 'AIAN_PR', universeLabel: 'American Indian and Alaska Native alone population in Puerto Rico'},
                 {universeString: 'ASIAN_PR', universeLabel: 'Asian alone population in Puerto Rico'},
                 {universeString: 'NHPI_PR', universeLabel: 'Native Hawaiian and other Pacific Islander alone population in Puerto Rico'},
                 {universeString: 'SOR_PR', universeLabel: 'Some other race population in Puerto Rico'},
                 {universeString: '2RACE_PR', universeLabel: 'Two or more races population in Puerto Rico'},
                 {universeString: 'WHITE_NOHISP_PR', universeLabel: 'White alone, not Hispanic or Latino population in Puerto Rico'},
                 {universeString: 'HISP_PR', universeLabel: 'Hispanic or Latino population in Puerto Rico'},
                 {universeString: 'POP_05_OVER_US', universeLabel: 'Population 5 years and over in the United States'}
            ]})
          }, 2000
        )
      }
    )
  },
  getDimensions (program, component, dataset) {
    let dimensionURI = getDimensionsURI(program, component, dataset)
    return ApiService.get(dimensionURI)
  },
  getCategories (program, component, dataset, dimensionId) {
    let categoriesURI = getCategoriesURI(program, component, dataset, dimensionId)
    return ApiService.get(categoriesURI)
  }
}
