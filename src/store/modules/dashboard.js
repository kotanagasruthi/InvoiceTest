import axios from 'axios'
const state = () => ({
  examData: [],
  topicsData: []
})

const mutations = {
  SET_EXAM_DATA (state, data) {
    state.examData = data
  },
  SET_TOPICS_DATA (state, data) {
    state.topicsData = data
  }
}

const actions = {
  fetchExams ({ commit }) {
    return axios.get('http://localhost:3000/exams/getExams').then(res => {
      commit('SET_EXAM_DATA', res.data)
      return res
    })
  },
  fetchTopics ({ commit }) {
    return axios.get('http://localhost:3000/topics/getTopics').then(res => {
      commit('SET_TOPICS_DATA', res.data)
      return res
    })
  }
}

const getters = {
  getExamData: (state) => state.examData,
  getTopicsData: (state) => state.topicsData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
