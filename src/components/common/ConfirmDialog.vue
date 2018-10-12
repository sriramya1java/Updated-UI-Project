<template>
  <v-dialog persistent v-bind:width="width" v-model="show" v-if="show">
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="okClick()">{{ okText }}</v-btn>
        <v-btn @click="cancelClick()">{{ cancelText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    show: Boolean,
    width: {
      type: Number,
      default: 500
    },
    okText: {
      type: String,
      default: 'OK'
    },
    cancelText: {
      type: String,
      default: 'CANCEL'
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
    },
    // This function will simply emit a 'cancel-click' event that
    // the caller can listen for. If the caller is listening for
    // this event, then the caller can choose to do some action as
    // part of handling this event
    cancelClick () {
      this.$emit('cancel-click')
    }
  }
}
</script>
<style></style>
