<template>
  <div class="v-context show"
       v-show="show"
       :style="style"
       tabindex="-1"
       @blur="close"
       @click="onClick"
       @contextmenu.capture.prevent
  >
    <slot :data="data"></slot>
  </div>
</template>

<script>
  /* eslint-disable indent,semi */

  export default {
    props: {
      /**
       * Close the menu on click.
       *
       * @type {boolean}
       */
      closeOnClick: {
        type: Boolean,
        default: true
      },
      /**
       * Close the menu automatically on window scroll.
       *
       * @type {boolean}
       */
      closeOnScroll: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      /**
       * Generate the CSS styles for positioning the context menu.
       *
       * @returns {object|null}
       */
      style () {
        return this.show
          ? { top: `${this.top}px`, left: `${this.left}px` }
          : null
      }
    },
    data () {
      return {
        top: null,
        left: null,
        show: false,
        data: null
      }
    },
    mounted () {
      if (this.closeOnScroll) {
        this.addScrollEventListener()
      }
    },
    beforeDestroy () {
      if (this.closeOnScroll) {
        this.removeScrollEventListener()
      }
    },
    methods: {
      /**
       * Add scroll event listener to close context menu.
       */
      addScrollEventListener () {
        window.addEventListener('scroll', this.close)
      },
      /**
       * Close the context menu.
       */
      close () {
        this.top = null
        this.left = null
        this.data = null
        this.show = false
      },
      /**
       * Close the menu if `closeOnClick` is set to true.
       */
      onClick () {
        if (this.closeOnClick) {
          this.close()
        }
      },
      /**
       * Open the context menu.
       *
       * @param {MouseEvent} event
       * @param {array|object|string} data User provided data for the menu
       */
      open (event, data) {
        event.stopPropagation()
        this.$store.commit('categories/SET_EDITING_CATEGORY', data)
        this.data = data
        console.log(event)
        console.log(this.data)
        this.show = true
        this.$nextTick(() => {
          // this.positionMenu(event.clientY, event.clientX)
          this.positionMenu(event)
          this.$el.focus()
        })
      },
      /**
       * Set the context menu top and left positions.
       *
       * @param {number} top
       * @param {number} left
       */
      positionMenu (event) {
        /* const largestHeight = window.innerHeight - this.$el.offsetHeight - 25
        const largestWidth = window.innerWidth - this.$el.offsetWidth - 25
        if (top > largestHeight) {
          top = largestHeight
        }
        if (left > largestWidth) {
          left = largestWidth
        } */
        console.log(this.mouseY(event) + 'px')
        console.log(this.mouseX(event) + 'px')
        this.top = this.mouseY(event) - this.$el.offsetHeight - 21
        this.left = this.mouseX(event) - this.$el.offsetWidth - 52
      },

   mouseX (evt) {
    if (evt.pageX) {
      return evt.pageX;
    } else if (evt.clientX) {
      return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)
    } else {
      return null;
    }
  },

   mouseY (evt) {
    if (evt.pageY) {
      return evt.pageY;
    } else if (evt.clientY) {
      return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    } else {
      return null;
    }
  },
      /**
       * Remove the scroll event listener to close the context menu.
       */
      removeScrollEventListener () {
        window.removeEventListener('scroll', this.close)
      }
    },
    watch: {
      /**
       * Add or remove the scroll event listener when the prop value changes.
       *
       * @param {boolean} value
       * @param {boolean} oldValue
       */
      closeOnScroll (value, oldValue) {
        if (value === oldValue) {
          return
        }
        if (value) {
          this.addScrollEventListener()
        } else {
          this.removeScrollEventListener()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $blue600: grey;
  $gray74: #bdbdbd;
  $gray93: #ededed;
  $gray98: white;
  .v-context {
    background: $gray98;
    border: 1px solid $gray74;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: block;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 200px;
    z-index: 99999;
    ul {
      list-style: none;
      padding: 10px 0;
      margin: 0;
      font-size: 12px;
      font-weight: 600;
      li {
        margin: 0;
        padding: 10px 35px;
        cursor: pointer;
        color: black;
        &:hover {
          background: $blue600;
          color: $gray98;
          width: 100%;
        }
      }
    }
  }
  .show {
    z-index:1000;
    position: absolute;
    border: 1px solid blue;
    padding: 2px;
    display: block;
    margin-bottom: 3px;
  }
</style>

