<template>
  <!-- <div class="hello">
    <h5>{{ msg }}, your id is {{ id }}</h5>
    <h1 v-if="id === 'new'">This is create note page</h1>
    <h1 v-else>this is edit note page</h1>
  </div> -->
  <v-container fluid>
    <div v-if="!gotError">
      <v-toolbar dense>
        <v-toolbar-title>
          Note
        </v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-layout row wrap  pt-2>
              <v-flex xs2>
                <v-subheader>Program: <span>*</span></v-subheader>
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="programs"
                  label="Select a Program"
                  :rules="selectedProgramRules"
                  v-model="noteObj.programString"
                  :disabled="isEditing"></v-select>
              </v-flex>
              <v-flex xs6>
                <span>(* = required)</span>
              </v-flex>
              <v-flex xs2>
                <v-subheader>Note Title: <span>*</span></v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  label="Enter a Note Title"
                  :rules="selectedNoteTitleRules"
                  v-model="noteObj.noteString"
                  :disabled="isEditing"></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-subheader>Contents:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-textarea
                  label="Contents"
                  v-model="noteObj.content"></v-textarea>
              </v-flex>
              <v-flex xs2>
                <v-subheader>Upload File:</v-subheader>
              </v-flex>
              <v-flex xs4>
                <v-text-field label="Select File" v-model='fileName' prepend-icon='attach_file'></v-text-field>
                <input type="file" style="display: none" ref="image" accept="text/plain" @change="onFilePicked">
              </v-flex>
              <v-flex xs6 text-xs-left>
                <v-btn @click='pickFile'>upload</v-btn>
              </v-flex>
              <v-flex xs2>
                <v-subheader>Position: <span>*</span></v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-radio-group row v-model="noteObj.type" :rules="selectedTypeRules">
                  <v-radio label="Header" value="H"></v-radio>
                  <v-radio label="Footer" value="F"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn :disabled="!valid" @click="saveNote()">Save</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </div>
    <div v-if="gotError">
      <v-alert :value="true" type="error">Error in retrieving Notes. Please try again after some time.</v-alert>
    </div>
    <v-dialog v-model="isSaved" width="400">
      <v-card>
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isSaved = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <note-table-references class="pt-4" :data="this.$route.params"></note-table-references>
  </v-container>
</template>

<script>
  import router from '../../router/index'
  import notesService from '../../api/notesService'
  import { mapGetters } from 'vuex'
  import NoteTableReferences from './NoteTableReferences'
  export default {
    name: 'CreateEditNote',
    components: { NoteTableReferences },
    data () {
      return {
        isEditing: false,
        gotError: false,
        isSaved: false,
        message: 'sucess',
        noteObj: {
          programString: '',
          noteString: '',
          content: '',
          type: '',
          hidden: 'true',
          lastEditedBy: ''
        },
        dialog: false,
        fileName: '',
        debug: false,
        id: 0,
        msg: 'META2',
        valid: false,
        selectedProgramRules: [
          v => !!v || 'Please select a Program'
        ],
        selectedNoteTitleRules: [
          v => !!v || 'Please enter a note title'
        ],
        selectedTypeRules: [
          v => !!v || 'Please choose a type'
        ]
      }
    },
    created () {
      this.noteObj.lastEditedBy = this.user
      if (this.$route.params.noteString === 'new' && this.$route.params.programString === 'new') {
        this.isEditing = false
        this.noteObj.programString = ''
        this.noteObj.noteString = ''
        this.noteObj.content = ''
        this.noteObj.type = ''
        // console.log(this.noteObj)
      }
      if (this.$route.params.noteString !== 'new' && this.$route.params.programString !== 'new' && this.$route.params.noteString !== 'undefined' && this.$route.params.programString !== 'undefined') {
        this.isEditing = true
        /* notesService.getExistingNote(this.$route.params).then((response) => {
          // console.log(response)
          if (response.body) {
            response.body = {
              'notePreview': 'Notes:<br />{NL}The estimates are based on the 2010 Census and reflect changes to the April 1, 2010{NL}pop...',
              'noteTypeString': 'Footer',
              'lastUpdatedBy': 'Matthew Curtiss',
              'lastUpdatedDate': 'June 28, 2018 02:47:52 pm',
              'deletable': false,
              'usedByTableCount': 0,
              'noteContent': 'Notes:<br />\nThe estimates are based on the 2010 Census and reflect changes to the April 1, 2010\npopulation due to the Count Question Resolution program and geographic program revisions.\nMedian age is calculated based on single year of age. For population estimates methodology\nstatements, see <a href=\'http://www.census.gov/programs-surveys/popest/technical-documentation/methodology.html\'>\nhttp://www.census.gov/programs-surveys/popest/technical-documentation/methodology.html</a>.',
              'hidden': true,
              'noteString': 'PEP_2016_PEPAGESEX-001',
              'programString': 'PEP'
            }
            this.noteObj.programString = response.body.programString
            this.noteObj.noteString = response.body.noteString
            this.noteObj.content = response.body.content
            this.noteObj.type = response.body.type
          }
        }, (error) => {
          console.log(error)
          this.gotError = true
        }) */
        let response = {
          'notePreview': 'Notes:<br />{NL}The estimates are based on the 2010 Census and reflect changes to the April 1, 2010{NL}pop...',
          'noteTypeString': 'Footer',
          'lastUpdatedBy': 'Matthew Curtiss',
          'lastUpdatedDate': 'June 28, 2018 02:47:52 pm',
          'deletable': false,
          'usedByTableCount': 0,
          'noteContent': 'Notes:<br />\nThe estimates are based on the 2010 Census and reflect changes to the April 1, 2010\npopulation due to the Count Question Resolution program and geographic program revisions.\nMedian age is calculated based on single year of age. For population estimates methodology\nstatements, see <a href=\'http://www.census.gov/programs-surveys/popest/technical-documentation/methodology.html\'>\nhttp://www.census.gov/programs-surveys/popest/technical-documentation/methodology.html</a>.',
          'hidden': true,
          'noteString': 'PEP_2016_PEPAGESEX-001',
          'programString': 'PEP'
        }
        this.noteObj.programString = response.programString
        this.noteObj.noteString = response.noteString
        this.noteObj.content = response.noteContent
        this.noteObj.type = response.noteTypeString
      }
    },
    methods: {
      navigate () {
        router.go(-1)
      },
      pickFile () {
        this.$refs.image.click()
      },
      onFilePicked (e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.fileName = files[0].name
          if (this.fileName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsText(files[0])
          fr.addEventListener('load', () => {
            this.noteObj.content = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.fileName = ''
        }
      },
      saveNote () {
        if (this.isEditing === false) {
          this.isSaved = true
          notesService.saveNote(this.noteObj).then((response) => {
            this.message = 'sucessfully saved the note'
            this.$store.dispatch('notes/getNotes')
            console.log(this.noteObj)
          }, (e) => {
            console.log(e)
            this.message = e.body.message
          })
        } else {
          this.isSaved = true
          notesService.updateExistingNote(this.$route.params, this.noteObj).then((response) => {
            this.message = 'sucessfully updated the note'
            this.$store.dispatch('notes/getNotes')
          }, (e) => {
            console.log(e)
            this.message = e.body.message
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        programs: 'userAndPrograms/programs',
        user: 'userAndPrograms/user'
      })
    }
  }
</script>
<!-- Add "scoped" attribute to limit css to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  span {
    color: #ff0000
  }
</style>
