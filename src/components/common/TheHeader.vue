<template>
  <v-layout>
    <v-toolbar fixed height="80px">
      <img src="../../assets/meta2logo.png">
      <v-toolbar-title>
        <v-btn
        color="dark"
        flat
        value="table"
        to="/">
        <span>Tables</span>
      </v-btn>
      <v-btn
        color="dark"
        flat
        value="table"
        to="/notes">
        <span>Notes</span>
      </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat dense>
      <label
        color="dark"
        flat
        value="person">
        Welcome: {{ user }}
        <v-icon>person</v-icon>
      </label>
      </v-btn>
      <v-btn flat dense href="./logout">
      <a href="./logout" onclick="return confirm('Do you want to logout?')">Logout</a>
      <v-icon>logout</v-icon>
      </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-layout>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Meta2Header',
    data () {
      return {
        logoutMsg: ''
      }
    },
    methods: {
    },
    created: function () {
      this.$store.dispatch('userAndPrograms/getUserAndPrograms')
      // console.log(process.env.ROOT_API)
    },
    computed: {
      ...mapGetters({
        user: 'userAndPrograms/user'
      })
    }
}
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style scoped>
  img {
    height: 50px;
    width: 300px;
  }
</style>
