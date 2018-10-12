<template>
  <v-dialog persistent v-bind:width="width" v-model="display" v-if="display">
    <v-card>
      <v-card-text>
        <slot></slot>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const LOADING_TIMEOUT = 750

export default {
  name: 'LoadingDialog',
  props: {
    show: Boolean,
    width: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      display: false,
      showLoadingPromise: undefined
    }
  },
  created () {
    this.showHideLoading()
  },
  methods: {
    // This function will delay the display of the loading message
    // for the amount of time specified by the LOADING_TIMEOUT.
    // If a request to cancel the loading display has not come in
    // prior to the timeout period, then the loading message shows.
    // Otherwise, the timeout is canceled. Essentially, we only want
    // to show the loading message if the actions are taking longer
    // than the LOADING_TIMEOUT to complete.
    showHideLoading () {
      if (this.show) {
        let self = this
        this.showLoadingPromise = setTimeout(
          () => {
            self.display = true
            this.showLoadingPromise = undefined
          }, LOADING_TIMEOUT
        )
      } else {
        if (this.showLoadingPromise !== undefined) {
          clearTimeout(this.showLoadingPromise)
          this.showLoadingPromise = undefined
        }
        this.display = false
      }
    }
  },
  watch: {
    show (isShow) {
      this.showHideLoading()
    }
  }
}
</script>
<style></style>