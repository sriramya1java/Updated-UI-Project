<template>
  <!-- <div class="hello">
    <h5>{{ msg }}, your id is {{ id }}</h5>
    <h1 v-if="id === 'new'">This is create table page</h1>
    <h1 v-else>this is edit table page</h1>
  </div> -->
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Table Metadata
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs color="grey" dark slider-color="white" class="pt-4 text-transform-none">
      <v-tab ripple :disabled="this.meta_basic_tab">
        Basics
      </v-tab>
      <v-tab ripple :disabled="this.meta_header_footer_tab">
        Headnotes/Footnotes
      </v-tab>
      <v-tab ripple :disabled="this.meta_dimensions_tab">
        Dimensions
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <table-basic-metadata v-on:event_child_basic="eventChildBasic"></table-basic-metadata>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text><table-notes v-on:event_child_tableNotes="eventChildTableNotes"></table-notes></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <dimensions v-on:click="eventParent" v-on:event_child_dimensions="eventChildDimensions"></dimensions>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
  import router from '../../router/index'
  import TableBasicMetadata from './TableBasicMetadata.vue'
  import TableNotes from './TableNotes.vue'
  import Dimensions from './Dimensions.vue'
  /* import { mapGetters } from 'vuex' */
  export default {
    name: 'CreateEditTable',
    components: {
      TableBasicMetadata,
      TableNotes,
      Dimensions
    },
    data () {
      return {
        debug: false,
        id: 0,
        msg: 'META2',
        validation: false,
        meta_basic_tab: false,
        meta_header_footer_tab: false,
        meta_dimensions_tab: false,
        isChanged: false
      }
    },
    watch: {
      '$route' (to, from) {
        this.id = to.params.id
      }
    },
    created () {
      this.id = this.$route.params.tableString
      // console.log(this.id)
      this.$on('event_parent', function (id) {
        console.log('Event from parent component emitted', id)
      })
    },
    beforeRouteLeave (to, from, next) {
      console.log(to)
      console.log(from)
      if (!this.isChanged) {
        next()
      } else {
        if (confirm('save Project?')) {
          next()
          console.log(next())
        } else {
          next(false)
        }
      }
    },
    methods: {
      eventParent: function () {
        this.$emit('event_parent', 'initial')
      },
      navigate () {
        router.go(-1)
      },
      onTabChange () {
        /* // Case when route was used once or more
        this.$router.push({ path: '/' }).then(
        () => {
          this.$router.push({ path: '/edittable/new' })
        }) */
        this.$store.commit('dimensions/SET_DIMENSIONS', [])
        this.$store.commit('dimensions/UPDATE_VERTICAL_DIMENSIONS_LIST', [])
        this.$store.commit('dimensions/UPDATE_HORIZONTAL_DIMENSIONS_LIST', [])
        this.$store.commit('dimensions/UPDATE_OUTSIDE_DIMENSIONS_LIST', [])
        this.$store.commit('dimensions/UPDATE_DIMENSIONS_SELECTED', [])
        this.$store.commit('dimensions/UPDATE_VERTICAL_DIMENSIONS_SELECTED', [])
        this.$store.commit('dimensions/UPDATE_HORIZONTAL_DIMENSIONS_SELECTED', [])
        this.$store.commit('dimensions/UPDATE_OUTSIDE_DIMENSIONS_SELECTED', [])
        // this.$store.dispatch('dimensions/getDimensionsList')
        this.$store.commit('dimensions/SET_DIMENSIONS', [{
          'editable': true,
          'label': 'Age Group',
          'id': 'AGEGROUP',
          'type': 'SIMPLE'
        }, {'editable': true, 'label': 'Date', 'id': 'DATE_', 'type': 'SIMPLE'}, {
          'editable': true,
          'label': 'Description of DATE values',
          'id': 'DATE_DESC',
          'type': 'SIMPLE'
        }, {'editable': true, 'label': 'Hispanic Origin', 'id': 'HISP', 'type': 'SIMPLE'}, {
          'editable': true,
          'label': 'Race',
          'id': 'RACE',
          'type': 'SIMPLE'
        }, {'editable': true, 'label': 'Sex', 'id': 'SEX', 'type': 'SIMPLE'}, {
          'editable': true,
          'label': 'Universe',
          'id': 'UNIVERSE',
          'type': 'SIMPLE'
        }, {'editable': true, 'label': 'Measure', 'id': 'MEASURE', 'type': 'MEASURE'}, {
          'editable': false,
          'label': 'Gct',
          'id': 'GCT',
          'type': 'GCT'
        }])
      },
      /**
       * @description To disable and enable all the tab
       * @param val
       */
      enableAndDisableAlltabs (val) {
        this.meta_basic_tab = val
        this.meta_header_footer_tab = val
        this.meta_dimensions_tab = val
        this.isChanged = val
      },
      eventChildBasic: function (val) {
        console.log('eventChildBasic from child component emitted', val)
        this.enableAndDisableAlltabs(val)
      },
      eventChildDimensions: function (val) {
        console.log('eventChildDimensions from child component emitted', val)
        this.enableAndDisableAlltabs(val)
      },
      eventChildTableNotes: function (val) {
        console.log('eventChildTableNotes from child component emitted', val)
        this.enableAndDisableAlltabs(val)
      }
    },
    computed: {
      dimensionsList () {
        // console.log('------------gets the list of dimensions')
        // console.log(this.$store.state.dimensionsList)
        return this.$store.state.dimensions.dimensionsList
      },
      disableNotesTab () {
        return this.$store.state.createEditTable.disableNotesTab
      },
      disableDimensionsTab () {
        return this.$store.state.createEditTable.disableDimensionsTab
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style scoped>
  text-transform-none {
    text-transform: none !important;
  }
</style>
