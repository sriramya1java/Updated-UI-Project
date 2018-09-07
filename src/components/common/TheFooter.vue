<template>
   <v-footer class="pa-3">
     <v-spacer></v-spacer>
     <div>{{ version }}</div>
   </v-footer>
</template>
<script>
  export default {
    name: 'Meta2Footer',
    data () {
      return {
        version: 'V0.0'
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style scoped>
</style>
