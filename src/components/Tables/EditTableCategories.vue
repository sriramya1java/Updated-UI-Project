<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 class="text-md-center">
        <h1>Available Categories</h1>
        <div class="treeSelf">
          <ul v-for="categories in this.categoriesList">
            <li>{{ categories.label }}</li>
          </ul>
        </div>
      </v-flex>
      <v-flex xs6>
        <select multiple="multiple" class="treeSelf">
          <option v-for="categories in this.categoriesList"
                  :allowDrag='allowDrag'
                  :allowDrop='allowDropLeft'
                  :showWhat='showOnCheck'
                  @current-node-clicked='curNodeClicked'
                  @drag="dragHandler"
                  @drag-enter="dragEnterHandler"
                  @drag-leave="dragLeaveHandler"
                  @drag-over="dragOverHandler"
                  @drag-end="dragEndHandler"
                  @drop="dropHandler">{{ categories.label }}</option>
        </select>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default {
    name: 'EditTableCategories',
    data () {
      return {
        showOnCheck: 'label'
      }
    },
    computed: {
      categoriesList: {
        get () {
          this.$store.state.categories.categoriesList.forEach(x => {
            x.children = []
            x.hidden = false
            x.labelOverride = ''
          })
          // console.log(this.$store.state.categoriesList)
          // to delete children and key from the list
          /* this.$store.state.categoriesList.forEach(x => {
            delete x.children
            delete x.key
          }) */
          return this.$store.state.categories.categoriesList
        }
      }
    },
    methods: {
      allowDrag (model) {
        return true
      },
      allowDropLeft (model) {
        return false
      },
      curNodeClicked (model) {
        console.log('******************************', this.curNodeClicked)
        console.log('curNodeClicked', model)
      },
      dragHandler (model, e) {
        // console.log('dragHandler: ', model, component, e)
      },
      dragEnterHandler (model, e) {
        // console.log('dragEnterHandler: ', model, component, e)
      },
      dragLeaveHandler (model, e) {
        // console.log('dragLeaveHandler: ', model, component, e)
      },
      dragOverHandler (model, e) {
        // console.log('dragOverHandler: ', model, component, e)
      },
      dragEndHandler (model, e) {
        console.log('dragEndHandler: ', model, e)
      },
      dropHandler (model, e) {
        console.log('dropHandler: ', model, e)
        const list = model.children
        // change the key
        if (list && list !== undefined) {
          list.forEach(x => {
            x.key = Math.floor(Math.random() * 1000000000000) + 1
          })
        }
      }
    }
  }
</script>
<style scoped>
  .main {
    flex-direction: column;
    font-size: 35px;
    align-items: center;
  }
  .container {
    margin-top: 2rem;
    justify-content: space-between;
    padding: 0 5rem;
  }
  .treeSelf {
    border: 3px solid #e5e9f2;
    width: 70%;
    text-align: left;
    padding: 1rem;
    height: 400px;
    overflow:scroll;
  }
  li, option {
    padding: 3px;
  }
</style>

