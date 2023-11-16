import axios from 'axios'
const state = () => ({
  loggedInUser: {},
  allInstitutes: [],
  toastDetails: {},
  isShowToast: false
})

console.log(state.allInstitutes)
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
      console.log('signup successful')
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
      console.log('institutes res', res.data)
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
  },
  setToastDetails ({ commit }, toastDetails) {
    commit('SET_TOAST_DETAILS', toastDetails)
  },
  setIsShowToast ({ commit }, isShowToast) {
    commit('SET_IS_SHOW_TOAST', isShowToast)
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
