import axios from 'axios'
const state = () => ({
  examData: [],
  topicsData: [],
  inviteesData: []
})

const mutations = {
  SET_EXAM_DATA (state, data) {
    state.examData = data
  },
  SET_TOPICS_DATA (state, data) {
    state.topicsData = data
  },
  SET_INVITEES_DATA (state, data) {
    console.log(data)
    state.inviteesData = data
  }
}

const actions = {
  fetchExams ({ commit }, instituteId) {
    return axios.get('http://localhost:3000/exams/getExams', {
      params: {
        institute_id: instituteId
      }
    }).then(res => {
      commit('SET_EXAM_DATA', res.data)
      return res
    })
  },
  fetchTopics ({ commit }, instituteId) {
    return axios.get('http://localhost:3000/topics/getTopics', {
      params: {
        institute_id: instituteId
      }
    }).then(res => {
      commit('SET_TOPICS_DATA', res.data)
      return res
    })
  },

  addInvitee ({ commit }, payload) {
    return axios.post('http://localhost:3000/invitees/add', payload).then(res => {
      return res
    }).catch(res => {
      console.log('could not add invitee..', res)
    })
  },

  fetchInvitee ({ commit }, payload) {
    return axios.get('http://localhost:3000/invitees/users').then(res => {
      commit('SET_INVITEES_DATA', res.data)
    })
  }
}

const getters = {
  getExamData: (state) => state.examData,
  getTopicsData: (state) => state.topicsData,
  getInviteesData: (state) => state.inviteesData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
