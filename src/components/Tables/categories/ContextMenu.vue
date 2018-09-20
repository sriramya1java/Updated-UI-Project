<template>
  <div id="app" @click="hideContextMenu()" @contextmenu="showContextMenu($event)">
    <div>
      <img class="logo" src="https://vuejs.org/images/logo.png">
      <h1 class="instructions">Click with right-button on body</h1>
    </div>
    <ul id="context-menu">
      <context-menu-item @click="newRegister()">
        New register
      </context-menu-item>
      <context-menu-item @click="remove()">
        Remove
      </context-menu-item>
      <context-menu-item @click="edit()">
        Edit
      </context-menu-item>
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
  html, body, #app {
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: #343338;
    font-family: Roboto, Tahoma, sans-serif;
  }

  .logo {
    height: 100px;
  }

  .instructions {
    color: white;
    display: block;
    font-size: 25px;
  }

  #context-menu {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    z-index: 2147483647;
    background-color: white;
    border: 1px solid #ebebeb;
    border-bottom-width: 0px;
  }

  #context-menu.active {
    display: block;
  }

  .context-menu-icon {
    top: 1px;
    position: relative;
    margin-right: 10px;
  }

  .context-menu-item {
    display: flex;
    cursor: pointer;
    padding: 8px 15px;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
  }

  .context-menu-item:hover {
    background-color: #ebebeb;
  }
</style>

