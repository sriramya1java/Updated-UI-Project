<template>
  <!--<div class="hello">
    <h5>{{ msg }}, your id is {{ id }}</h5>
    <h1 v-if="id === 'new'">This is create note page</h1>
    <h1 v-else>this is edit note page</h1>
  </div>-->
    <v-container fluid>
      <v-layout row wrap>
      <v-flex xs2>
        Upload File:
      </v-flex>
      <v-flex xs4>
        <v-text-field label="Select Image" v-model='imageName' prepend-icon='attach_file'></v-text-field>
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="file_extension"
          @change="onFilePicked"
        >
      </v-flex>
        <v-btn @click='pickFile'>upload</v-btn>
      </v-layout>
    </v-container>
</template>

<script>
  import router from '../../router/index'
  export default {
    name: 'CreateEditNote',
    data () {
      return {
        debug: false,
        id: 0,
        msg: 'META2',
        title: 'Image Upload',
        dialog: false,
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    created () {
      this.id = this.$route.params.noteString
      // console.log(this.id)
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
          this.imageName = files[0].name
          if (this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
            console.log(this.imageFile)
            console.log(File)
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      }
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
</style>
