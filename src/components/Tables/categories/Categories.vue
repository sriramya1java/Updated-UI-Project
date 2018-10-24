<template>
<div>
  <v-subheader align-left>Drag and Drop categories to rearrange them.</v-subheader>
  <v-radio-group row :mandatory="true" v-model="showOnCheck" align-left>
    <v-radio label="Category Label" value="label"></v-radio>
    <v-radio label="Category ID" value="id"></v-radio>
  </v-radio-group>
  <div class="text-xs-left">
    <v-btn small v-on:click="expandAll">Expand All</v-btn>
    <v-btn small v-on:click="collapseAll">Collapse All</v-btn>
    <v-btn small v-on:click="moveTableCategories" :disabled="this.categoriesList1[0].children.length > 0">Move all</v-btn>
  </div>
  <div class="main">
    <div class="container" style="width: 100%">
      <div class="treeSelf">
        <vue-drag-tree :data='categoriesList' :allowDrag='allowDrag' ontoggle="true" :allowDrop='allowDropLeft' :showWhat='showOnCheck' :fromWhere='left' :defaultText='"Grouping Category"' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler"></vue-drag-tree>
      </div>
      <div class="treeSelf">
        <vue-drag-tree :data='categoriesList1' :allowDrag='allowDrag' :auto-expand="autoExpand" ontoggle="true" :allowDrop='allowDropRight' :showWhat='showOnCheck' :fromWhere='right' :defaultText='"Grouping Category"' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler"></vue-drag-tree>
      </div>
    </div>
    <div class="main">
      <div class="container" style="width: 100%">
        <div class='showSec'>
          <pre>{{formatData1}}</pre>
        </div>
        <div class='showSec'>
          <pre>{{formatData}}</pre>
        </div>
      </div>
    </div>
  </div>
  <div class="text-xs-right pt-4">
    <v-btn slot="activator">Save</v-btn>
    <v-btn slot="activator">Discard</v-btn>
  </div>
</div>
</template>
<script>
import VueDragTree from './VueDragTree.vue'
export default{
  props: ['axesDimensionsSelected'],
  components: {
    VueDragTree
  },
  data () {
    return {
      en: false,
      dialog: false,
      left: 'left',
      right: 'right',
      autoExpand: true,
      showOnCheck: 'label',
      selectedItem: ''
    }
  },
  computed: {
    categoriesList1: {
      get () {
        return this.$store.state.categories.categoriesList1
      }
    },
    categoriesList: {
      get () {
        this.$store.state.categories.categoriesList.forEach(x => {
          x.children = []
          x.hidden = false
          x.labelOverride = ''
        })
        console.log(this.$store.state.categoriesList)
        // to delete children and key from the list
        /* this.$store.state.categoriesList.forEach(x => {
          delete x.children
          delete x.key
        }) */
        return this.$store.state.categories.categoriesList
      }
    },
    formatData () {
      return JSON.stringify(this.categoriesList, null, 2)
    },
    formatData1 () {
      return JSON.stringify(this.categoriesList1, null, 2)
    }
  },
  created: function () {
    console.log('categories component get created-----------------')
    /* console.log(this.axesDimensionsSelected) */
  },
  methods: {
    moveTableCategories () {
      let array = this.categoriesList
      this.$store.commit('categories/SET_CATEGORIES_LIST_CHILDREN', array)
      let list = this.categoriesList1[0].children
      if (list && list !== undefined) {
        list.forEach(x => {
          x.key = Math.floor(Math.random() * 1000000000000) + 1
        })
      }
    },
    allowDrag (model, component) {
      return true
    },
    allowDropLeft (model, component) {
      return false
    },
    allowDropRight (model, component) {
      return true
    },
    curNodeClicked (model, component) {
      console.log('******************************', this.curNodeClicked)
      console.log('curNodeClicked', model, component)
    },
    dragHandler (model, component, e) {
      // console.log('dragHandler: ', model, component, e)
    },
    dragEnterHandler (model, component, e) {
      // console.log('dragEnterHandler: ', model, component, e)
    },
    dragLeaveHandler (model, component, e) {
      // console.log('dragLeaveHandler: ', model, component, e)
    },
    dragOverHandler (model, component, e) {
      // console.log('dragOverHandler: ', model, component, e)
    },
    dragEndHandler (model, component, e) {
      console.log('dragEndHandler: ', model, component, e)
    },
    dropHandler (model, component, e) {
      console.log('dropHandler: ', model, component, e)
      const list = model.children
      // change the key
      if (list && list !== undefined) {
        list.forEach(x => {
          x.key = Math.floor(Math.random() * 1000000000000) + 1
        })
      }
    },
    collapseAll () {
      this.autoExpand = false
    },
    expandAll () {
      this.autoExpand = true
    }
  },
  watch: {
    showOnCheck (val) {
      console.log(val)
      this.showOnCheck = val
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  font-size: 35px;
  align-items: center;
}
.sentence {
  background: #d3dce6;
  margin-top: 2rem;
  width: 50%;
  padding: 1rem;
  font-size: 25px;
}
.senMain {
  background: white;
  padding: 1rem;
  color: #8492a6;
}
.lang {
  font-size: 20px;
  color: #8492a6;
  font-weight: bold;
}
ul {
  margin-left: 1rem;
}
.container {
  width: 60%;
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
  padding: 0 5rem;
}
.treeSelf {
  border: 3px solid #e5e9f2;
  color: white;
  width: 40%;
  text-align: left;
  padding: 1rem;
  height: 300px;
  overflow:scroll;
}
.showSec {
  border: 3px solid #e5e9f2;
  width: 40%;
  text-align: left;
  padding: 1rem;
  font-size: 15px;
}
.howtouse {
  text-align: center;
  width: 30%;
  background: #e5e9f2;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 50px;
  font-weight: bold;
}
.howtouse > div {
  font-family: 'Tangerine';
  font-size: 5rem;
}
.getstart > div {
  background: #d3dce6;
  padding: 0.5rem 1rem;
}
.getstart > p {
  margin: 0.5rem 0;
}
a {
  color: black;
}
.tree-view-item-key {
  font-size: 20px;
  color: black;
}
.tree-view-item-value {
  font-size: 20px;
  font-weight: bold;
  color: white;
}
</style>
