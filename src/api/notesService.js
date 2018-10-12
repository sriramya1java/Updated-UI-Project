import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)

export default {
  getNotesList () {
    return new Promise((resolve, reject) => {
      Vue.http.get('api/summary/notes').then((response) => {
        resolve(response)
      }, (e) => {
        reject(e)
      })
    })
  },
  saveNote (noteObj) {
    console.log(noteObj)
    let programString = noteObj.programString
    let payLoad = noteObj
    if (payLoad) {
      return new Promise((resolve, reject) => {
        Vue.http.post('api/programs/' + programString + '/notes', payLoad).then((response) => {
          resolve(response)
        }, (e) => {
          reject(e)
        })
      })
    }
  },
  getTablesOnNotes (noteObj) {
    return new Promise((resolve, reject) => {
      Vue.http.get('api/programs/' + noteObj.programString + '/notes/' + noteObj.noteString + '/tables/').then((response) => {
        resolve(response)
      }, (e) => {
        reject(e)
      })
    })
  },
  getExistingNote (data) {
    if (data) {
      return new Promise((resolve, reject) => {
        Vue.http.get('api/programs/' + data.programString + '/notes/' + data.noteString).then((response) => {
          resolve(response)
        }, (e) => {
          reject(e)
        })
      })
    }
  },
  deleteNote (data) {
    if (data) {
      return new Promise((resolve, reject) => {
        Vue.http.delete('api/programs/' + data.programString + '/notes/' + data.noteString).then((response) => {
          resolve(response)
        }, (e) => {
          reject(e)
        })
      })
    }
  },
  updateExistingNote (data, payLoad) {
    if (data && payLoad) {
      return new Promise((resolve, reject) => {
        Vue.http.put('api/programs/' + data.programString + '/notes/' + data.noteString, payLoad).then((response) => {
          resolve(response)
        }, (e) => {
          reject(e)
        })
      })
    }
  }
}
