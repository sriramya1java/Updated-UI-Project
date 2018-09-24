<template>
  <div>
    <ul id="context-menu">
      <li>
        option 1
      </li>
      <li>
        option 2
      </li>
      <li>
        option 3
      </li>
      <li>
        option 4
      </li>
      <li>
        option 5
      </li>
    </ul>
  </div>
</template>
<script>
  import ContextMenuItem from './ContextMenuItem.vue'
  export default {
    name: 'ContextMenu',
    components: {
      'context-menu-item': ContextMenuItem
    },
    data () {
      return {
        contextMenuWidth: null,
        contextMenuHeight: null
      }
    },
    props: {
      icon: ''
    },
    methods: {
      newRegister: () => {
        alert('New register')
      },
      remove: () => {
        alert('Remove')
      },
      edit: () => {
        alert('Edit')
      },
      showContextMenu: function (event) {
        console.log(event.clientX)
        console.log(event.clientY)
        console.log(event.movementX)
        console.log(event.movementY)
        console.log(event.offsetX)
        console.log(event.offsetY)
        console.log(event.pageX)
        console.log(event.pageY)
        console.log(event.screenX)
        console.log(event.screenY)
        console.log(window)
        console.log(window.screen)
        console.log(document)
        console.log(this.contextMenuWidth)
        console.log(this.contextMenuHeight)
        var menu = document.getElementById('context-menu')
        console.log(menu)
        if (!this.contextMenuWidth || !this.contextMenuHeight) {
          menu.style.visibility = 'hidden'
          menu.style.display = 'block'
          this.contextMenuWidth = menu.offsetWidth
          this.contextMenuHeight = menu.offsetHeight
          console.log('menu offset width-------------', menu.offsetWidth)
          console.log('menu offset height-------------', menu.offsetHeight)
          console.log('this.contextMenuWidth-------------', this.contextMenuWidth)
          console.log('this.contextMenuHeight-------------', this.contextMenuHeight)
          menu.removeAttribute('style')
        }
        if ((this.contextMenuWidth + event.pageX) >= window.innerWidth) {
          menu.style.left = (event.pageX - this.contextMenuWidth) - 55 + 'px'
          console.log('this.contextMenuWidth', this.contextMenuWidth)
          console.log('event.pageX--------', event.pageX)
          console.log('menu.style.left-------', menu.style.left)
          console.log('window.innerWidth-------', window.innerWidth)
        } else {
          menu.style.left = event.pageX - 55 + 'px'
          console.log('window.innerWidth-------', window.innerWidth)
          console.log('menu.style.left-------', menu.style.left)
          console.log('event.pageX-------', event.pageX)
        }
        if ((this.contextMenuHeight + event.pageY) >= window.innerHeight) {
          menu.style.top = (event.pageY - this.contextMenuHeight) + 28 + 'px'
          console.log('this.contextMenuHeight', this.contextMenuHeight)
          console.log('event.pageY--------' + event.pageY)
          console.log('menu.style.top-------', menu.style.top)
          console.log('window.innerHeight-------', window.innerHeight)
        } else {
          menu.style.top = this.event.pageY + 28 + 'px'
          console.log('window.innerHeight-------', window.innerHeight)
          console.log('menu.style.top-------', menu.style.top)
          console.log('this.event.pageY---------', this.event.pageY)
        }
        menu.classList.add('active')
        event.preventDefault()
      },
      hideContextMenu: () => {
        document.getElementById('context-menu').classList.remove('active')
      }
    }
  }
</script>
<style scoped>
  #context-menu {
    border: 1px solid black;
  }
</style>

