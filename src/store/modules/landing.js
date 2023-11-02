import axios from 'axios'
const state = () => ({
  loggedInUser: {}
})

const mutations = {
  SET_LOGGED_IN_USER_DETAILS (state, data) {
    state.loggedInUser = data
  }
}

const actions = {
  signUpUser ({ commit }, payload) {
    return axios.post('http://localhost:3000/institutes/setInstitute', payload).then(res => {
      console.log('signup successful')
      return res
    })
  },
  validateUserLogin ({ commit }, payload) {
    return axios.post('http://localhost:3000/users/login', payload).then(res => {
      console.log('logged in user res', res.data)
      commit('SET_LOGGED_IN_USER_DETAILS', res.data?.user)
      return res
    }).catch(res => {
      console.log('not authorised..', res)
      return res
    })
  },
  logout ({ commit }) {
    return axios.post('http://localhost:3000/users/logout').then(res => {
      return res
    }).catch(res => {
      return res
    })
  }
}

const getters = {
  currentLoggedInUser: (state) => state.loggedInUser
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
