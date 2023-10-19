import axios from 'axios'
const state = () => ({
  examData: [],
  topicsData: [],
  questionsData: []
})

const mutations = {
  SET_EXAM_DATA (state, data) {
    state.examData = data
  },
  SET_TOPICS_DATA (state, data) {
    state.topicsData = data
  },
  SET_QUESTIONS_DATA (state, data) {
    state.questionsData = data
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
  fetchQuestions ({ commit }, topicId) {
    return axios.get('http://localhost:3000/questions/getQuestions', {
      params: {
        topic_id: topicId
      }
    }).then(res => {
      commit('SET_QUESTIONS_DATA', res.data)
      return res
    })
  },
  setTopic ({ commit }, payload) {
    return axios.post('http://localhost:3000/topics/setTopic', payload).then(res => {
      return res
    })
  },
  setQuestion ({ commit }, payload) {
    return axios.post('http://localhost:3000/questions/addQuestion', payload).then(res => {
      return res
    })
  }
}

const getters = {
  getExamData: (state) => state.examData,
  getTopicsData: (state) => state.topicsData,
  getQuestionsData: (state) => state.questionsData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
