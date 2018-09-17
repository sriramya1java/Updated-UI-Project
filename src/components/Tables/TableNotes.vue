<template>
  <v-form>
    <v-layout row text-center>
      <v-flex xs2>
        <v-subheader inset>Header Notes:</v-subheader>
      </v-flex>
      <v-flex xs4 sm4 offset-sm0>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              avatar
              @click="">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs1 text-center>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_right</v-icon>
        </v-btn><br>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4 sm4 offset-sm0>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              avatar
              @click="">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs1>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_right</v-icon>
        </v-btn><br>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
      </v-flex>
      <v-flex xs2>
        <v-subheader inset>Footer Notes:</v-subheader>
      </v-flex>
      <v-flex xs4 sm4 offset-sm0>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile
              v-for="item in footerItems"
              :key="item.title"
              avatar
              @click="">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs1>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_right</v-icon>
        </v-btn><br>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4 sm4 offset-sm0>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile
              v-for="item in footerItems"
              :key="item.title"
              avatar
              @click="">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs1>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_right</v-icon>
        </v-btn><br>
        <v-btn
          slot="activator"
          color="grey lighten-2"
          dark
          icon
          @click="">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 text-right class="pt-4">
        <v-btn>Save as Draft</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
  export default {
    name: 'TableNotes',
    data () {
      return {
        items: [
          { icon: 'note', iconClass: 'grey lighten-1 white--text', title: 'Header Note1' },
          { icon: 'note', iconClass: 'grey lighten-1 white--text', title: 'Header Note2' },
          { icon: 'note', iconClass: 'grey lighten-1 white--text', title: 'Header Note3' }
        ],
        footerItems: [
          { icon: 'note', iconClass: 'grey lighten-1 white--text', title: 'Footer Note1' },
          { icon: 'note', iconClass: 'grey lighten-1 white--text', title: 'Footer Note2' },
          { icon: 'note', iconClass: 'grey lighten-1 white--text', title: 'Footer Note3' }
        ]
      }
    },
    methods: {
      emit: function () {
        this.$emit('event_child_tableNotes', true)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->