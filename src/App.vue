<template>
  <div id="app">
    <v-app>
      <v-toolbar app>
        <meta2-header></meta2-header>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer app>
        <meta2-footer></meta2-footer>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
  import Meta2Header from '@/components/common/TheHeader'
  import NavBar from '@/components/common/NavBar'
  import Meta2Footer from '@/components/common/TheFooter'
  import BreadCrumbs from '@/components/common/BreadCrumbNav'
  export default {
    name: 'app',
    components: {
      Meta2Footer,
      Meta2Header,
      NavBar,
      BreadCrumbs
    }
  }
</script>
<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 15px;
    margin-top: 30px;
    margin-left: 30px; /* this is not working at this point */
    margin-right: 30px; /* this is not working at this point */
  }
  a {
    color: #42b983;
  }
</style>
<style lang="scss">
  @import '../src/assets/custom-bootstrap.scss';
  @import '../node_modules/font-awesome/scss/font-awesome.scss';

</style>
<style lang="css">
  @import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';
</style>
