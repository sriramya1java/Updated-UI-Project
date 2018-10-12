import ApiService from './apiService'

// const USER_DETAILS_URI = 'http://cedsci-web3.dev.ditd.census.gov:8080/meta2/api/user/details'
const USER_DETAILS_URI = 'api/user/details'

export default {
  getUserDetails () {
    return ApiService.get(USER_DETAILS_URI)
  }
}
