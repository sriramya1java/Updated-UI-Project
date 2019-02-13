import store from '../../../../store/store'
import _ from 'lodash'

var $store = store
const findRootRight = which => {
  let ok = false
  let that = which
  while (!ok) {
    // According to the component name
    if (that.$options._componentTag === 'vue-drag-tree') {
      ok = true
      // Exchange both data
      break
    }
    that = that.$parent
  }
  return that
}

/**
 * Whether the two nodes are inclusive
 * That is: the relationship between the immediate father and the child
 */
const hasInclude = (from, to) => { return from.$parent._uid === to._uid }

/**
 * Is the two nodes linear?
 * That is: from is a subset of to, but not a parent-child relationship?
 */
const isLinealRelation = (from, to) => {
  let parent = from.$parent

  // Judgement is completed, no matter what the result
  let ok = false
  // Is a linear relationship？
  let status = false
  while (!ok) {
    if (parent._uid === to._uid) {
      ok = true
      status = true
      continue
    }
    if (
      !parent.$options._componentTag ||
      parent.$options._componentTag === 'vue-drag-tree'
    ) {
      // If it is detected here, it should be over.
      ok = true
      break
    }
    parent = parent.$parent
  }

  return status
}

// Flattens all the children objects into an array that are present in the hierarchy.
const flat = (array) => {
  let result = []
  array.forEach(function (a) {
    result.push(a)
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children))
    }
  })
  return result
}

// Checks if the element is present in the given array.
const childIsPresent = (array, toObject) => {
  let arrayFlat = flat(array)
  if (arrayFlat.some(function (element) { return element === toObject })) return true
  else return false
}

/**
 * Exchange two nodes of data
 * @param rootCom Root component（vue-drag-tree.vue）
 * @param from Dragged node component Vnode data
 * @param to Drag and drop node component Vnode data
 * @param array
 * @param action
 */
const exchangeRightData = (rootCom, from, to, array, action) => {
  console.log('action : ', action)
  // If the drag node is the same as the dragged node，return;
  if (from._uid === to._uid) {
    return
  }

  const newFrom = Object.assign({}, from.model)
  const isSubset = childIsPresent(newFrom.children, to.model)
  // If the to node is in the children hierarchy of from node. return;
  if (isSubset) {
    return
  }
  /**
   * checking if the parent is exist in the array if exists it means its from children else parent
   */
  const fromParentModel = from.$parent.model
  const parentIndex = array.map(function (x) { return x.key }).indexOf(fromParentModel.key)
  let parentI = getIndex(array, fromParentModel.key, 'child')
  console.log('parentIndex : ' + parentIndex)
  console.log('parentI : ' + parentI)
  // If the two are parent-child relationships. Move the from node to the to node level and drop it to the next one
  if (hasInclude(from, to)) {
    // If "parent" is the topmost node (the outermost data in the node array)
    console.log('parent is the top most node')
    const tempParent = to.$parent
    const toModel = to.model
    if (tempParent.$options._componentTag === 'vue-drag-tree') {
      console.log('parent is the top most node in component tag')
      // Add the from node to the root array
      // tempParent.newData.push(newFrom)
      // Remove the from node information in to;
      // toModel.children = toModel.children.filter(item => item.key !== newFrom.key)
      return
    }

    const toParentModel = tempParent.model
    // First remove the from node information in to;
    toModel.children = toModel.children.filter(item => item.key !== newFrom.key)
    // Add the from node to the to level.
    console.log(typeof (toParentModel.children))
    console.log(typeof (toParentModel))
    console.log(toParentModel.children)
    toParentModel.children = toParentModel.children.concat([newFrom])
    const fromIndex = toParentModel.children.map(function (x) { return x.key }).indexOf(newFrom.key)
    toParentModel.children = swapArrayElements(toParentModel.children, fromIndex, 0)
    return
  }

  // If it is a linear relationship, but not a father and son
  if (isLinealRelation(from, to)) {
    const toModel = to.model
    // const fromParentModel = from.$parent.model
    fromParentModel.children = fromParentModel.children.filter(item => item.key !== newFrom.key)
    // Then the from node is added to the last bit in the to node.
    toModel.children = toModel.children.concat([newFrom])
    const fromIndex = toModel.children.map(function (x) { return x.key }).indexOf(newFrom.key)
    toModel.children = swapArrayElements(toModel.children, fromIndex, 0)
    return
  }
  // Two nodes (wireless relationship), throw the from node into the to node.
  // const fromParentModel = from.$parent.model
  const toModel = to.model
  // First remove from from its parent node information;
  if (from.$parent.$options._componentTag === 'vue-drag-tree') {
    /**
     * Find the parent component (data source header) of the vue-drag-tree and modify the data here.
     */
    from.$parent.newData = from.$parent.newData.filter(
      item => item.key !== newFrom.key
    )
  } else {
    /**
     * checking if the parent is exist in the array if exists it means its from children
     */
    if (action === 'swap' && fromParentModel.children !== undefined && fromParentModel.children.length > 0 && parentI === 'gchild') {
      parentI = 'child'
      const fromIndex = fromParentModel.children.map(function (x) { return x.key }).indexOf(newFrom.key)
      // var objectFoundFrom = array[fromElementPos]
      const toIndex = fromParentModel.children.map(function (x) { return x.key }).indexOf(toModel.key)
      // var objectFoundTo = array[toElementPos]
      const toElementPos1 = to.$parent.model.children.map(function (x) { return x.key }).indexOf(toModel.key)
      console.log(toElementPos1)
      if (toIndex > -1) {
        const resultArray = swapArrayElements(fromParentModel.children, fromIndex, toIndex)
        const setChildArr = setChild(array, resultArray, fromParentModel.key)
        $store.commit('categories/SET_CATEGORIES_LIST_CHILDREN', setChildArr)
      } else if (toElementPos1 > -1) {
        const resultArray1 = to.$parent.model.children.splice(toElementPos1, 0, newFrom)
        const resultArray2 = fromParentModel.children.splice(fromIndex, 1)
        const setChildArr1 = setChild(array, resultArray1, to.$parent.model.key)
        const setChildArr2 = setChild(setChildArr1, resultArray2, fromParentModel.key)
        $store.commit('categories/SET_CATEGORIES_LIST_CHILDREN', setChildArr2)
      }
    } else if (action === 'child') {
      fromParentModel.children = fromParentModel.children.filter(
        item => item.key !== newFrom.key
      )
    } /* else if (action === 'swap' && fromParentModel.children !== undefined && fromParentModel.children.length > 0 && parentIndex === -1 && (parentI === 'gchild')) {
      const fromIndex = fromParentModel.children.map(function (x) { return x.key }).indexOf(newFrom.key)
        // var objectFoundFrom = array[fromElementPos]
      const toIndex = fromParentModel.children.map(function (x) { return x.key }).indexOf(toModel.key)
        // var objectFoundTo = array[toElementPos]
      const resultArray = swapArrayElements(fromParentModel.children, fromIndex, toIndex)
      const setChildArr = setChild(array, resultArray, fromParentModel.key)
      $store.commit('categories/SET_CATEGORIES_LIST_CHILDREN', setChildArr)
    } */
  }
  // Then the from node is added to the last bit in the to node.
  if (!toModel.children) {
    toModel.children = [newFrom]
    /**
     * checking if the parent is exist in the array if not exists it means its from main parent
     */
  } else if (action === 'swap' && parentIndex === -1 && parentI === 'gchild') {
    var fromElementPos = array.map(function (x) { return x.key }).indexOf(newFrom.key)
    // var objectFoundFrom = array[fromElementPos]
    var toElementPos = array.map(function (x) { return x.key }).indexOf(toModel.key)
    // var objectFoundTo = array[toElementPos]
    var resultArray = swapArrayElements(array, fromElementPos, toElementPos)
    console.log(resultArray)
    $store.commit('categories/SET_CATEGORIES_LIST_CHILDREN', resultArray)
  } else if (action === 'child') {
    toModel.children = toModel.children.concat([newFrom])
    const fromIndex = toModel.children.map(function (x) { return x.key }).indexOf(newFrom.key)
    toModel.children = swapArrayElements(toModel.children, fromIndex, 0)
  }
}

var swapArrayElements = function (a, x, y) {
  if (a.length === 1) return a
  // a.splice(y, 1, a.splice(x, 1, a[y])[0])
  // return a
  a.splice(y, 0, a.splice(x, 1)[0])
  return a
}

var getIndex = function (items, id, from) {
  let found
  let result = []
  if (items !== undefined && items !== null) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].key === id) {
        result.push(items[i])
      } else if (_.isArray(items[i].children)) {
        found = getIndex(id, items[i].children, 'gchild')
        if (found !== undefined && found !== null && found.length) {
          result = result.concat(found)
          from = 'gchild'
        }
      }
    }
  }
  return from
}

var setChild = function (children, replaceArr, key) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    // check if the key is equal then remove i from children
    let idx = children.map(function (x) { return x.key }).indexOf(key)
    if (idx > -1) {
      child = replaceArr
    }
    /**
     * check if child had children and call the function
     */
    if (child && child !== null && child !== undefined && child.children !== undefined && child.children.length > 0) {
      setChild(child.children, replaceArr, key)
    }
  }

  return children
}

export { findRootRight, exchangeRightData }
