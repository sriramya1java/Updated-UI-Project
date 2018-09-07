<template>
  <div>
    <template v-for='(item,index) in newData'>
      <drag-node :model='item' :allowDrag='allowDrag' :auto-expand="autoExpand" :show-what='showWhat' :fromWhere="fromWhere" :allowDrop='allowDrop' :depth='increaseDepth' :defaultText='defaultText' :key='index'></drag-node>
    </template>
  </div>
</template>

<script>
  import DragNode from './DragNode.vue'
  export default {
    name: 'VueDragTree',
    props: {
      data: Array,
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
        default: 'Add node'
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
      increaseDepth () {
        return this.depth + 1
      },
      newData: {
        // getter
        get () {
          return this.data
        },
        // setter
        set (newValue) {
          // Remove all the values inside the original attribute in order to get a "clean" reference object
          let length = this.data.length
          for (let i = 0; i < length; i++) {
            this.data.shift(i)
          }
          // Then use the object deep copy (return the reference of the target), so the console will not report an error
          this.data = Object.assign(this.data, newValue)
        }
      }
    },
    methods: {
      emitCurNodeClicked (model, component) {
        this.$emit('current-node-clicked', model, component)
      },
      emitDrag (model, component, e) {
        this.$emit('drag', model, component, e)
      },
      emitDragEnter (model, component, e) {
        this.$emit('drag-enter', model, component, e)
      },
      emitDragLeave (model, component, e) {
        this.$emit('drag-leave', model, component, e)
      },
      emitDragOver (model, component, e) {
        this.$emit('drag-over', model, component, e)
      },
      emitDragEnd (model, component, e) {
        this.$emit('drag-end', model, component, e)
      },
      emitDrop (model, component, e) {
        this.$emit('drop', model, component, e)
      }
    },
    components: {
      DragNode
    }
  }
</script>
