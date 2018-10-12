<template>
  <v-select
    :items="presentationStyles"
    item-text="label"
    item-value="id"
    :label="label"
    :loading="loading"
    v-model="presentationStyle"
    v-on:change="change"
    :rules="selectedPresentationalStyleRules">
  </v-select>
</template>

<script>
import TableService from '@/api/tableService'

export default {
  name: 'PresentationStyleSelection',
  props: {
    defaultStyle: String
  },
  data () {
    return {
      presentationStyle: undefined,
      presentationStyles: [],
      loading: false,
      label: 'Select a Presentation Style',
      selectedPresentationalStyleRules: [
        v => !!v || 'Please select a Presentation Style'
      ]
    }
  },
  created () {
    // load and initialize the presentation styles
    this.presentationStyle = this.defaultStyle
    this.loading = true
    this.label = 'Loading Presentation Styles . . .'
    TableService.getPresentationStyles()
    .then(response => { this.presentationStyles = response.body })
    .finally(() => {
      this.label = 'Select a Presentation Style'
      this.loading = false
    })
  },
  methods: {
    // This function will emit an event notifying the parent of a
    // presentation style change; passing the new presentation style
    change () {
      this.$emit('presentation-style-change', this.presentationStyle)
    }
  },
  watch: {
    defaultStyle (style) {
      this.presentationStyle = style
    }
  }
}
</script>
<style></style>