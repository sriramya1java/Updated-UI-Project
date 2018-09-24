<template>
  <div>
  <div :style='styleObj' :draggable='isDraggable' @drag.stop='drag' @dragstart.stop='dragStart' @dragover.stop='dragOver' @dragenter.stop='dragEnter' @dragleave.stop='dragLeave' @drop.stop='drop' @dragend.stop='dragEnd' class='dnd-container' @contextmenu.prevent="$refs.menu.open($event, model)">
    <div :class="[isClicked ? 'is-clicked' : '', isHover ? 'is-hover': '']" @mouseover='mouseOver' @mouseout='mouseOut' @dblclick="changeType">
      <div :style="{ 'padding-left': (this.depth - 1) * 1.5 + 'rem' }" :id='model.id' class='treeNodeText'>
        <span  v-if="this.fromWhere === 'right'" style="font-size: 0.7rem;" @click="toggle"><i :class="this.open && model.children.length > 0 ? 'fa fa-minus' : !this.open && model.children.length > 0 ? 'fa fa-plus' : ''"></i></span>
        <span class='text pl-2' v-if="showWhat === 'label'">{{model.label}}</span>
        <span class='text pl-2' v-if="showWhat === 'id'">{{model.id}}</span>
      </div>
    </div>
    <div class='treeMargin' v-show="open" v-if="childrenVisible || isFolder">
      <item v-for="item2 in model.children" :allowDrag='allowDrag' :allowDrop='allowDrop' :depth='increaseDepth' :model="item2" :key='item2.key' :fromWhere='fromWhere' :autoExpand='autoExpand' :showWhat='showWhat' :defaultText='defaultText'>
      </item>
    </div>
  </div>
    <vue-context ref="menu">
      <ul slot-scope="child">
        <li @click="onClick($event.target.innerText, child.data)">Option 1</li>
        <li @click="onClick($event.target.innerText, child.data)">Option 2</li>
      </ul>
    </vue-context>
  </div>
</template>

<script>
  import { findRoot, exchangeLeftData } from './utils.js'
  import { findRootRight, exchangeRightData } from './utilRight.js'
  import VueContext from './context-menu.vue'
  let id = 1000
  let fromData = null
  let toData = null
  let nodeClicked = undefined // eslint-disable-line no-undef-init
  let rootTree = null
  export default {
    name: 'DragNode',
    components: {
      VueContext
    },
    data () {
      return {
        open: false,
        isClicked: false, // The current node is clicked
        isHover: false, // The current node is hover
        styleObj: {
          opacity: 1
        },
        showChildren: false,
        from: '',
        show: false
      }
    },
    props: {
      model: Object,
      allowDrag: {
        type: Function,
        default: () => true
      },
      allowDrop: {
        type: Function,
        default: () => true
      },
      defaultText: {
        // Default text displayed when adding a node．
        type: String,
        default: 'Add Node'
      },
      depth: {
        type: Number,
        default: 0
      },
      fromWhere: {
        // Default text displayed when adding a node．
        type: String,
        default: this.fromWhere
      },
      autoExpand: {
        default: this.autoExpand
      },
      showWhat: {
        default: this.showWhat
      }
    },
    computed: {
      isFolder () {
        return (this.model.children && this.model.children.length)
      },
      increaseDepth () {
        return this.depth + 1
      },
      isDraggable () {
        return this.allowDrag(this.model, this)
      },
      childrenVisible () {
        this.open = this.autoExpand
        this.isClicked = this.autoExpand
        return this.autoExpand || this.showChildren
      }
    },
    methods: {
      toggle () {
        if (this.isFolder) {
          this.open = !this.open
        } else {
          this.showChildren = !this.showChildren
        }
        // Call the method in the parent component of the vue-drag-tree to pass the id value of the currently clicked node
        rootTree.emitCurNodeClicked(this.model, this)
        // Record the status of the node being clicked
        this.isClicked = !this.isClicked
        // check if children and open all child on click
        if (this.$children && this.$children.length > 0) {
          // If it has children components.
          let childrenStack = this.$children
          while (childrenStack.length !== 0) {
            let item = childrenStack.shift()
            // same as it's parent
            item.open = this.open
            if (item.$children && item.$children.length > 0) {
              childrenStack = childrenStack.concat(item.$children)
            }
          }
        }
        // User needs node highlighting
        // Click on the current node for the first time. The current node is highlighted, traversing the style of resetting other nodes
        if (nodeClicked !== this.model.id) {
          let treeParent = rootTree.$parent
          // Traverse to reset the highlight style of all tree components
          let nodeStack = [treeParent.$children[0]]
          while (nodeStack.length !== 0) {
            let item = nodeStack.shift()
            item.isClicked = false
            if (item.$children && item.$children.length > 0) {
              nodeStack = nodeStack.concat(item.$children)
            }
          }
          // Then set the style of the current node to highlight
          this.isClicked = true
          // Set the node to the current node
          nodeClicked = this.model.id
        }
      },
      changeType () {
        // The user needs to highlight --> to record the currently clicked node
        if (this.currentHighlight) {
          nodeClicked = this.model.id
        }
        if (!this.isFolder) {
          this.$set(this.model, 'children', [])
          this.addChild()
          this.open = true || this.autoExpand
          this.isClicked = true
        }
      },
      mouseOver (e) {
        this.isHover = true
      },
      mouseOut (e) {
        this.isHover = false
      },
      addChild () {
        if (this.fromWhere === 'right') {
          this.model.children.push({
            label: this.defaultText,
            id: id++
          })
        }
      },
      removeChild (id) {
        // Get the model.children of the parent component
        let parent_model_children = this.$parent.model.children // eslint-disable-line camelcase
        // Deleted in the parent component model.children
        for (let index in parent_model_children) { // eslint-disable-line camelcase
          // Find the deleted id
          if (parent_model_children[index].id === id) {
            parent_model_children = parent_model_children.splice(index, 1) // eslint-disable-line camelcase
            break
          }
        }
      },
      drag (e) {
        fromData = this
        rootTree.emitDrag(this.model, this, e)
      },
      dragStart (e) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', 'asdad')
        return true
      },
      dragOver (e) {
        e.preventDefault()
        rootTree.emitDragOver(this.model, this, e)
        return true
      },
      dragEnter (e) {
        if (this._uid !== fromData._uid) {
          this.styleObj.opacity = 0.5
        }
        rootTree.emitDragEnter(this.model, this, e)
      },
      dragLeave (e) {
        this.styleObj.opacity = 1
        rootTree.emitDragLeave(this.model, this, e)
      },
      drop: function (e) {
        e.preventDefault()
        this.styleObj.opacity = 1
        // If it is judged that the current node is not allowed to be dropped, return;
        if (!this.allowDrop(this.model, this)) {
          return
        }
        toData = this
        this.from = fromData.fromWhere
        console.log('from', this.from)
        if (this.from === 'left') {
          exchangeLeftData(rootTree, fromData, toData)
        } else if (this.from === 'right') {
          exchangeRightData(rootTree, fromData, toData)
        }
        rootTree.emitDrop(this.model, this, e)
      },
      dragEnd (e) {
        rootTree.emitDragEnd(this.model, this, e)
        return // eslint-disable-line no-useless-return
      }
    },
    beforeCreate () {
      this.$options.components.item = require('./DragNode.vue').default
    },
    created () {
      rootTree = this.from === 'left' ? findRoot(this) : findRootRight(this)
    }
  }
</script>

<style>
  .dnd-container {
    background: #fff;
  }
  .dnd-container .is-clicked {
    /* background: #e5e9f2; */
  }
  .dnd-container .is-hover {
    background: #e5e9f2;
    cursor: pointer;
  }
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  .text {
    font-size: 12px;
  }
  .treeNodeText {
    height: 28px;
    box-sizing: border-box;
    width: fit-content;
    font-size: 18px;
    color: #324057;
    display: flex;
    align-items: center;
  }
  .changeTree {
    width: 1rem;
    color: #324057;
  }
  .vue-drag-node-icon {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 10px;
    margin-right: 8px;
    border-left: 4px solid grey;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 0 solid yellow;
    transition: transform 0.3s ease-in-out;
  }
  .nodeClicked {
    transform: rotate(90deg);
  }
</style>
