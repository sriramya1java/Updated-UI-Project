<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>Create New Table</v-toolbar-title>
    </v-toolbar>
    <v-card flat>
      <v-card-text>
        <router-view></router-view>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CreateTable'
}
</script>