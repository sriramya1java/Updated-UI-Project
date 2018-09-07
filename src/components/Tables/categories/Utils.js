const findRoot = which => {
  let ok = false
  let that = which
  while (!ok) {
    // According to the component name
    // eslint-disable-next-line
    if ('vue-drag-tree' === that.$options._componentTag) {
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
const hasInclude = (from, to) => {
  return from.$parent._uid === to._uid
}

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

/**
 * Exchange two nodes of data
 * @param rootCom Root component（vue-drag-tree.vue）
 * @param from Dragged node component Vnode data
 * @param to Drag and drop node component Vnode data
 */
const exchangeLeftData = (rootCom, from, to) => {
    // If the drag node is the same as the dragged node，return;
  if (from._uid === to._uid) {
    return
  }
  const newFrom = Object.assign({}, from.model)
    // If the two are parent-child relationships. Move the from node to the to node level and drop it to the next one
  if (hasInclude(from, to)) {
      // If "parent" is the topmost node (the outermost data in the node array)
    const tempParent = to.$parent
    const toModel = to.model
    if (tempParent.$options._componentTag === 'vue-drag-tree') {
        // Add the from node to the root array
      tempParent.newData.push(newFrom)
        // Remove the from node information in to;
      toModel.children = toModel.children.filter(
          item => item.id !== newFrom.id
        )
      return
    }

    const toParentModel = tempParent.model
      // First remove the from node information in to;
    toModel.children = toModel.children.filter(item => item.id !== newFrom.id)
      // Add the from node to the to level.
    toParentModel.children = toParentModel.children.concat([newFrom])
    return
  }

    // If it is a linear relationship, but not a father and son
  if (isLinealRelation(from, to)) {
      // const fromParentModel = from.$parent.model
    const toModel = to.model
      // Then the from node is added to the last bit in the to node.
    toModel.children = toModel.children.concat([newFrom])
    return
  }

    // Two nodes (wireless relationship), throw the from node into the to node.
    // const fromParentModel = from.$parent.model
  const toModel = to.model

    // Then the from node is added to the last bit in the to node.
  if (!toModel.children) {
    toModel.children = [newFrom]
  } else {
    toModel.children = toModel.children.concat([newFrom])
  }
}

export { findRoot, exchangeLeftData }
