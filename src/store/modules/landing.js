import axios from 'axios'
axios.defaults.withCredentials = true
const state = () => ({
  loggedInUser: {},
  allInstitutes: [],
  toastDetails: {},
  isShowToast: false
})

const mutations = {
  SET_LOGGED_IN_USER_DETAILS (state, data) {
    state.loggedInUser = data
  },
  SET_ALL_INSTITUTES (state, data) {
    state.allInstitutes = data
  },
  SET_IS_SHOW_TOAST (state, isToast) {
    state.isShowToast = isToast
  },
  SET_TOAST_DETAILS (state, details) {
    state.toastDetails = details
  }
}

const actions = {
  signUpUser ({ commit }, payload) {
    return axios.post('http://localhost:3000/institutes/setInstitute', payload).then(res => {
      return res
    })
  },

  getInstitutes ({ commit }, instituteId) {
    return axios.get('http://localhost:3000/institutes/getInstitutes', {
      params: {
        institute_id: instituteId
      }
    }).then(res => {
      commit('SET_ALL_INSTITUTES', res.data)
      return res
    })
  },
  validateUserLogin ({ commit }, payload) {
    return axios.post('http://localhost:3000/users/login', payload).then(loginRes => {
      commit('SET_LOGGED_IN_USER_DETAILS', loginRes.data?.user)
    }).catch(res => {
      return res
    })
  },
  logout ({ commit }) {
    return axios.post('http://localhost:3000/users/logout').then(res => {
      return res
    }).catch(res => {
      return res
    })
  },
  setToastDetails ({ commit }, toastDetails) {
    commit('SET_TOAST_DETAILS', toastDetails)
  },
  setIsShowToast ({ commit }, isShowToast) {
    commit('SET_IS_SHOW_TOAST', isShowToast)
  },
  fetchCurrentLoggedInUser ({ commit }) {
    return axios.get('http://localhost:3000/users/current-user')
      .then(response => {
        if (response.data?.user) {
          commit('SET_LOGGED_IN_USER_DETAILS', response.data.user)
          return response
        } else {
          console.log('res', response)
        }
      })
      .catch(error => {
        return error
      })
  }
}

const getters = {
  currentLoggedInUser: (state) => state.loggedInUser,
  allAvailableInstitutes: (state) => state.allInstitutes,
  getToastDetails: (state) => state.toastDetails,
  getIsShowToast: (state) => state.isShowToast
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
