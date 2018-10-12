import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../../store/store.js'

Vue.use(VueResource)

// TODO: move these to a constants class
const NOT_AUTHORIZED = 401
const SESSION_EXPIRED = 403

// update apiError store
function handleApiError (errorResponse) {
  if (NOT_AUTHORIZED === errorResponse.status || SESSION_EXPIRED === errorResponse.status) {
    // set the api error in the errorState
    store.dispatch('apiErrors/setError', {
      status: errorResponse.status,
      errorType: errorResponse.body ? errorResponse.body.errorType : undefined,
      message: errorResponse.body ? errorResponse.body.message : undefined
    }, {root: true})
  }
  throw errorResponse
}

export default {
  get (url, queryParams) {
    return Vue.http.get(url, {params: queryParams}).catch(handleApiError)
  },
  post (url, data, queryParams) {
    return Vue.http.post(url, data, {params: queryParams}).catch(handleApiError)
  },
  put (url, data) {
    console.log('about to make put call to', url, data)
    return Vue.http.put(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch(handleApiError)
  },
  delete (url, queryParams) {
    return Vue.http.delete(url, {params: queryParams}).catch(handleApiError)
  }
}
