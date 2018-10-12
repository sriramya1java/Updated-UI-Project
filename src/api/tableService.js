import ApiService from './apiService'

const TABLES_SUMMARY_URI = 'api/summary/tables'
const PRESENTATION_STYLE_URI = 'api/summary/presentationStyles'

function getTablesURI (program, component, dataset) {
  return `api/programs/${program}/components/${component}/datasets/${dataset}/tables`
}

function getTableURI (program, component, dataset, tableId) {
  return `api/programs/${program}/components/${component}/datasets/${dataset}/tables/${tableId}`
}

function getDimensionsURI (program, component, dataset, tableId) {
  return `api/programs/${program}/components/${component}/datasets/${dataset}/tables/${tableId}/dimensions`
}

function getCategoriesURI (program, component, dataset, tableId, dimensionId, dimensionType) {
  return `api/programs/${program}/components/${component}/datasets/${dataset}/tables/${tableId}/dimensions/${dimensionId}/${dimensionType}/categories`
}

function mapToApiTable (table) {
  return {
    datasetString: table.dataset,
    tableString: table.tableId,
    label: table.label,
    style: table.presentationStyle,
    lastEditedBy: table.lastEditedBy,
    universes: table.universes
  }
}

function mapToApiTableDimensions (tableDimensions) {
  return {
    datasetString: tableDimensions.dataset,
    tableString: tableDimensions.tableId,
    dimensions: tableDimensions.dimensions
  }
}

export default {
  getTableSummaryList () {
    return ApiService.get(TABLES_SUMMARY_URI)
  },
  getPresentationStyles () {
    return ApiService.get(PRESENTATION_STYLE_URI)
  },
  getTable (program, component, dataset, tableId) {
    const tableURI = getTableURI(program, component, dataset, tableId)
    return ApiService.get(tableURI)
  },
  saveTable (table) {
    const tablesURI = getTablesURI(table.program, table.component, table.dataset, table.tableId)
    let apiTable = mapToApiTable(table)
    return ApiService.post(tablesURI, apiTable)
  },
  updateTable (table) {
    const tableURI = getTableURI(table.program, table.component, table.dataset, table.tableId)
    let apiTable = mapToApiTable(table)
    return ApiService.put(tableURI, apiTable)
  },
  getDimensions (program, component, dataset, tableId) {
    const dimensionURI = getDimensionsURI(program, component, dataset, tableId)
    return ApiService.get(dimensionURI)
  },
  saveDimensions (tableDimensions) {
    const dimensionURI = getDimensionsURI(tableDimensions.program, tableDimensions.component, tableDimensions.dataset, tableDimensions.tableId)
    let apiTableDimensions = mapToApiTableDimensions(tableDimensions)
    return ApiService.post(dimensionURI, apiTableDimensions)
  },
  getCategories (program, component, dataset, tableId, dimensionId, dimensionType) {
    const categoriesURI = getCategoriesURI(program, component, dataset, tableId, dimensionId, dimensionType)
    return ApiService.get(categoriesURI)
  }
}
