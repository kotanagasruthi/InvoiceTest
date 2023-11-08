import axios from 'axios'
const state = () => ({
  loggedInUser: {},
  allInstitutes: {}

})

console.log(state.allInstitutes)
const mutations = {
  SET_LOGGED_IN_USER_DETAILS (state, data) {
    state.loggedInUser = data
  },
  SET_ALL_INSTITUTES (state, data) {
    state.allInstitutes = data
  }
}

const actions = {
  signUpUser ({ commit }, payload) {
    return axios.post('http://localhost:3000/institutes/setInstitute', payload).then(res => {
      console.log('signup successful')
      return res
    })
  },

  getInstitutes ({ commit }) {
    return axios.get('http://localhost:3000/institutes/getInstitutes').then(res => {
      commit('SET_ALL_INSTITUTES', res.data)
      console.log(res.data)
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
  currentLoggedInUser: (state) => state.loggedInUser,
  allAvailableInstitutes: (state) => state.allInstitutes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
