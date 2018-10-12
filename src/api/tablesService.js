import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)

export default {
  getTablesList () {
    return new Promise((resolve, reject) => {
      Vue.http.get('api/summary/tables').then((response) => {
        resolve(response)
      }, (e) => {
        reject(e)
      })
    })
  }
}
