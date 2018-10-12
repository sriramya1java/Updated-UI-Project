<template>
  <v-dialog persistent v-bind:width="width" v-model="show" v-if="show">
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="okClick()">{{ okText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AlertDialog',
  props: {
    show: Boolean,
    width: {
      type: Number,
      default: 500
    },
    okText: {
      type: String,
      default: 'OK'
    }
  },
  data () {
    return {}
  },
  methods: {
    // This function will simply emit an 'ok-click' event that the
    // caller can listen for. If the caller is listening for this
    // event, then the caller can choose to do some action as part
    // of handling this event
    okClick () {
      this.$emit('ok-click')
    }
  }
}
</script>
<style></style>
