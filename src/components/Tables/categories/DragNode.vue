<template>
  <div>
  <div :style='styleObj' :draggable='isDraggable' @drag.stop='drag' @dragstart.stop='dragStart' @dragover.stop='dragOver' @dragenter.stop='dragEnter' @dragleave.stop='dragLeave' @drop.stop='drop' @dragend.stop='dragEnd' class='dnd-container' @contextmenu.prevent="handler($event, model)">
    <div :class="[isClicked ? 'is-clicked' : '', isHover ? 'is-hover': '']" @mouseover='mouseOver' @mouseout='mouseOut'>
      <v-icon small :style='styleObj1'>keyboard_tab</v-icon>
      <div :style="{ 'padding-left': (this.depth - 1) * 1.5 + 'rem' }" :id='model.id' class='treeNodeText' @click="toggle1()">
        <!--<span  v-if="this.fromWhere === 'right'" style="font-size: 0.7rem;" @click="toggle"><i :class="this.openFolder && model.children.length > 0 ? 'fa fa-minus' : !this.openFolder && model.children.length > 0 ? 'fa fa-plus' : ''"></i></span>-->
        <v-icon small :style='styleObj2'>subdirectory_arrow_right</v-icon>
        <span  v-if="this.fromWhere === 'right'" style="font-size: 0.7rem;" @click="toggle"><v-icon small v-if="model.children.length > 0 ">{{ this.openFolder ? 'remove' : !this.openFolder ? 'add' : '' }}</v-icon></span>
        <span class="" v-if="showWhat === 'label'" :class="[model.labelOverride ? 'isOveridden' : '', model.hidden ? 'isHidden' : '', model.active ? 'active' : '', model.children.length === 0 ? 'text pl-4' : 'text pl-2']">{{model.labelOverride ? model.labelOverride : model.label}}</span>
        <span class="" v-if="showWhat === 'id'" :class="[model.labelOverride ? 'isOveridden' : '', model.active ? 'active' : '', model.children.length === 0 ? 'text pl-4' : 'text pl-2']">{{model.id ? model.id : model.labelOverride ? model.labelOverride : model.label}}</span>
      </div>
    </div>
    <div class='treeMargin' v-show="openFolder" v-if="childrenVisible || isFolder">
      <item v-for="item2 in model.children" :allowDrag='allowDrag' :allowDrop='allowDrop' :depth='increaseDepth' :model="item2" :key='item2.key' :fromWhere='fromWhere' :autoExpand='autoExpand' :showWhat='showWhat' :defaultText='defaultText'></item>
    </div>
  </div>
    <vue-context ref="menu" v-if="this.fromWhere === 'right'">
      <ul slot-scope="child">
        <li @click="editCategory($event.target.innerText, child.data)">Edit Category Label</li>
        <li @click="resetCategory($event.target.innerText, child.data)" :class="model.labelOverride ? '' : 'disabled'">Reset Category label</li>
        <li @click="deleteCategory($event.target.innerText, child.data)">Remove Category from tree</li>
        <li @click="hideShowCategory($event.target.innerText, child.data)">Hide/SHow category</li>
        <li @click="addNode($event.target.innerText, child.data)">Add category</li>
        <li @click="addChildAbove($event.target.innerText, child.data)">Add category above</li>
      </ul>
    </vue-context>
    <v-dialog v-model="isEdit" max-width="500px" max-height="500px">
      <v-card>
        <v-card-title>
          Edit Categories
        </v-card-title>
        <v-card-text>
          <label align-left>Please enter New label</label>
          <v-text-field v-model="labelOverride"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveEditCategory()">Ok</v-btn>
          <v-btn @click="isEdit = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { findRoot, exchangeLeftData } from './utils.js'
  import { findRootRight, exchangeRightData } from './utilRight.js'
  import VueContext from './context-menu.vue'
  // let id = 1000
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
        openFolder: false,
        isClicked: false, // The current node is clicked
        isHover: false, // The current node is hover
        styleObj: {
          opacity: 1,
          background: '',
          cursor: 'default'
        },
        styleObj1: {
          display: 'none',
          color: ''
        },
        styleObj2: {
          display: 'none',
          color: ''
        },
        showChildren: false,
        from: '',
        show: false,
        isEdit: false,
        labelOverride: '',
        resetLabel: false,
        swapOrChild: 'child',
        dragStartWidth: 0,
        dragLeaveWidth: 0,
        node: {},
        isActive: false
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
        default: 'Grouping Category'
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
      editingCategory () {
        return this.$store.state.categories.editingCategory
      },
      categoriesList1 () {
        return this.$store.state.categories.categoriesList1
      },
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
        this.openFolder = this.autoExpand
        this.isClicked = this.autoExpand
        return this.autoExpand || this.showChildren
      }
    },
    methods: {
      /**
       * Alert the text of the menu item that was clicked on.
       * Console log the data sent from the menu.
       *
       * @param {string} text
       * @param {object} data
       */
      onClick (text, data) {
        alert(`You clicked ${text}!  ${data}! ${this.editingCategory}`)
        // console.log('data=============', data)
        // => { foo: 'bar' }
      },
      editCategory (event, data) {
        // let children = this.categoriesList1[0].children
        // console.log('editing a category--------------', this.showWhat)
        this.node = data
        this.isEdit = true
      },
      addNode (event, data) {
        this.changeType()
      },
      resetCategory (event, data) {
        // let children = this.categoriesList1[0].children
        // this.traverseCategories(children, 'reset')
        data.labelOverride = ''
      },
      deleteCategory (event, child) {
        let parent = this.categoriesList1[0].children
        this.removeFromTree(parent, child.key)
      },
      hideShowCategory (event, data) {
        // let children = this.categoriesList1[0].children
        // this.traverseCategories(children, 'hideShow')
        data.hidden = !data.hidden
      },
      saveEditCategory () {
        // let children = this.categoriesList1[0].children
        // this.traverseCategories(children, 'edit')
        this.isEdit = false
        this.node.labelOverride = this.labelOverride
      },
      handler (e, data) {
        // console.log('data : ', data)
        // if (data.id !== 'Categories' && this.fromWhere === 'right') {
        if (this.fromWhere === 'right') {
          this.toggle1()
          this.$refs.menu.open(e, data)
          // console.log('model++++++++++++++++++++', data)
          // console.log(this.from)
        }
        // console.log('model++++++++++++++++++++', data)
      },
      toggle1: function () {
        let parent = this.categoriesList1[0].children
        this.setActiveClass(parent, this.model.key)
      },
      toggle () {
        if (this.isFolder) {
          this.openFolder = !this.openFolder
        } else {
          this.showChildren = !this.showChildren
        }
        // Call the method in the parent component of the vue-drag-tree to pass the id value of the currently clicked node
        rootTree.emitCurNodeClicked(this.model, this)
        // Record the status of the node being clicked
        this.isClicked = !this.isClicked
        // check if children and openFolder all child on click
        if (this.$children && this.$children.length > 0) {
          // If it has children components.
          let childrenStack = this.$children
          while (childrenStack.length !== 0) {
            let item = childrenStack.shift()
            // same as it's parent
            item.openFolder = this.openFolder
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
        // console.log(this.model.children)
        // console.log(this.model.children.length)
        if (this.currentHighlight) {
          nodeClicked = this.model.id
        }
        if (!this.isFolder) {
          this.$set(this.model, 'children', [])
          this.openFolder = true || this.autoExpand
          this.isClicked = true
        }
        this.addChild()
      },
      mouseOver (e) {
        this.isHover = true
      },
      mouseOut (e) {
        this.isHover = false
      },
      addChild () {
        // products.find(product => product.items.some(item => item.name === 'milk'))
        let d = new Date()
        let seconds = Math.round(d.getTime())
        console.log(seconds)
        if (this.fromWhere === 'right') {
          this.model.children.push({
            label: this.defaultText,
            // id: null,
            children: [],
            hidden: false,
            labelOverride: '',
            key: Math.floor(Math.random() * 1000000000000) + 1,
            active: false
          })
        }
      },
      addChildAbove ($event, data) {
        if (this.fromWhere === 'right') {
          let array = this.categoriesList1[0].children
          let d = new Date()
          let seconds = Math.round(d.getTime())
          let fromElementPos = array.map(function (x) { return x.key }).indexOf(data.key)
          let newNode = {
            label: this.defaultText,
            id: '_GRP_' + seconds,
            children: [],
            hidden: false,
            labelOverride: '',
            key: Math.floor(Math.random() * 1000000000000) + 1,
            active: false
          }
          let resultArray = this.swapArrayElements(array, newNode, fromElementPos)
          // console.log('add node above', $event)
          // console.log('add node above', data)
          // console.log(seconds)
          console.log(resultArray)
        }
      },
      swapArrayElements (a, x, y) {
        if (a.length === 1) return a
        // a.splice(y, 1, a.splice(x, 1, a[y])[0])
        // return a
        a.splice(y, 0, a.splice(x, 1)[0])
        return a
      },
      traverseCategories (children) {
        for (let i = 0; i < children.length; i++) {
          let tableChild = children[i]
          // Do stuff
          if (tableChild.children.length > 0) {
            this.traverseCategories(tableChild.children)
          }
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
        // console.log(e.clientX)
        fromData = this
        rootTree.emitDrag(this.model, this, e)
      },
      dragStart (e) {
        this.$store.commit('categories/SET_START_DRAG_WIDTH', e.clientX)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', 'asdad')
        return true
      },
      dragOver (e) {
        e.preventDefault()
        // this.styleObj.background = 'grey'
        // this.styleObj.cursor = 'copy'
        let dragStartWidth = this.$store.state.categories.startDragWidth
        let dragLeaveWidth = this.dragLeaveWidth
        if (dragLeaveWidth > dragStartWidth) {
          this.styleObj2.display = 'block'
          this.styleObj2.color = 'steelblue'
        } else {
          this.styleObj1.display = 'block'
          this.styleObj1.color = 'steelblue'
        }
        rootTree.emitDragOver(this.model, this, e)
        return true
      },
      dragEnter (e) {
        if (this._uid !== fromData._uid) {
          // this.styleObj.opacity = 0.5
          // this.styleObj.background = 'grey'
        }
        rootTree.emitDragEnter(this.model, this, e)
      },
      dragLeave (e) {
        this.dragLeaveWidth = 0
        if (e && e !== undefined && e.clientX) {
          this.dragLeaveWidth = e.clientX
        }
        // this.styleObj.opacity = 1
        this.styleObj2.display = 'none'
        this.styleObj2.color = ''
        this.styleObj1.display = 'none'
        this.styleObj1.color = ''
        rootTree.emitDragLeave(this.model, this, e)
      },
      drop: function (e) {
        e.preventDefault()
        // this.styleObj.opacity = 1
        this.styleObj2.display = 'none'
        this.styleObj2.color = ''
        this.styleObj1.display = 'none'
        this.styleObj1.color = ''
        // If it is judged that the current node is not allowed to be dropped, return;
        if (!this.allowDrop(this.model, this)) {
          return
        }
        this.dragStartWidth = this.$store.state.categories.startDragWidth
        this.swapOrChild = this.dragLeaveWidth > this.dragStartWidth ? 'child' : 'swap'
        console.log(this.swapOrChild)
        toData = this
        this.from = fromData.fromWhere
        // console.log('from', this.from)
        if (this.from === 'left') {
          exchangeLeftData(rootTree, fromData, toData)
        } else if (this.from === 'right') {
          exchangeRightData(rootTree, fromData, toData, this.categoriesList1[0].children, this.swapOrChild)
        }
        rootTree.emitDrop(this.model, this, e)
      },
      dragEnd (e) {
        rootTree.emitDragEnd(this.model, this, e)
        return // eslint-disable-line no-useless-return
      },
      removeFromTree (children, childKeyToRemove) {
        // Deleted in the parent component
        for (let i = 0; i < children.length; i++) {
          let child = children[i]
          // check if the key is equal then remove i from children
          if (child.key === childKeyToRemove) {
            child = children.splice(i, 1)
          }
          /**
           * check if child had children and call the function
           */
          if (child && child !== null && child !== undefined && child.children !== undefined && child.children.length > 0) {
            this.removeFromTree(child.children, childKeyToRemove)
          }
        }
      },
      setActiveClass (children, childKeyToRemove) {
        for (let i = 0; i < children.length; i++) {
          let child = children[i]
          // check if the key is equal then set the active i from children
          child.active = child.key === childKeyToRemove
          /**
           * check if child had children and call the function
           */
          if (child && child !== null && child !== undefined && child.children !== undefined && child.children.length > 0) {
            this.setActiveClass(child.children, childKeyToRemove)
          }
        }
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
  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  .isOveridden {
    font-style: italic;
  }
  .isHidden {
    pointer-events: none;
    opacity: 0.5;
  }
  .dnd-container {
    background: #fff;
  }
  /* .dnd-container .is-clicked {
    background: #e5e9f2;
  } */
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
    font-size: 14px;
  }
  .treeNodeText {
    height: 28px;
    box-sizing: border-box;
    width: fit-content;
    font-size: 18px;
    color: black;
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
  .active{
    background-color: #e5e9f2;
  }
</style>
