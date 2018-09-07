<template>
   <v-tabs color="grey" dark slider-color="white">
     <v-tab ripple to="/">
       Tables
     </v-tab>
     <v-tab ripple to="/updatedNotesList">
       Notes
     </v-tab>
   </v-tabs>
</template>
<script>
  import router from '../../router/index'
  export default {
    name: 'NavBar',
    data () {
      return {
        pathVal: ''
      }
    },
    methods: {
      getTablesList: function () {
        this.$router.push({ path: '/' })
      },
      getNotesList: function () {
        this.$router.push({ path: '/updatedNotesList' })
      },
      navigate () {
        router.go(-1)
      }
    },
    computed: {
      crumbs () {
        this.pathVal = this.$route.name
        if (this.pathVal === 'editnote') {
          this.pathVal = 'UpdatedNotesList'
        } else if (this.pathVal === 'edittable') {
          this.pathVal = 'UpdateTablesList'
        }
        console.log(this.pathVal)
      }
    },
    watch: {
      crumbs () {
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style scoped>
</style>
