import axios from 'axios'
const state = () => ({
  examData: [],
  topicsData: [],
  inviteesData: [],
  questionsData: [],
  usersData: [],
  examFormatData: [],
  examInviteesData: []
})

const mutations = {
  SET_EXAM_DATA (state, data) {
    state.examData = data
  },
  SET_TOPICS_DATA (state, data) {
    state.topicsData = data
  },
  SET_INVITEES_DATA (state, data) {
    state.inviteesData = data
  },
  SET_QUESTIONS_DATA (state, data) {
    state.questionsData = data
  },
  SET_USERS_DATA (state, data) {
    state.usersData = data
  },
  SET_INSTITIUTE_EXAM_FORMATS_DATA (state, data) {
    state.instituteExamFormatsData = data
  },
  SET_EXAM_FORMATS_DATA (state, data) {
    state.examFormatData = data
  },
  SET_EXAM_INVITEES_DATA (state, data) {
    state.examInviteesData = data
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

  fetchInvitees ({ commit }, instituteId) {
    return axios.get(`http://localhost:3000/invitees/users/${instituteId}`).then(res => {
      commit('SET_INVITEES_DATA', res.data)
    })
  },

  fetchQuestions ({ commit }, topicName) {
    return axios.get('http://localhost:3000/questions/getQuestions', {
      params: {
        topic_name: topicName
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

  setSubTopic ({ commit }, payload) {
    return axios.post('http://localhost:3000/subTopics/setSubTopic', payload).then(res => {
      return res
    })
  },

  setExam ({ commit }, payload) {
    return axios.post('http://localhost:3000/exams/setExam', payload).then(res => {
      return res
    })
  },

  setQuestion ({ commit }, payload) {
    return axios.post('http://localhost:3000/questions/addQuestion', payload).then(res => {
      return res
    })
  },

  fetchUsers ({ commit }, instituteId) {
    return axios.get(`http://localhost:3000/users/getUsers/${instituteId}`).then(res => {
      commit('SET_USERS_DATA', res.data)
    })
  },

  addUsers ({ commit }, payload) {
    return axios.post('http://localhost:3000/users/addUser', payload).then(res => {
      return res
    })
  },
  setExamFormat ({ commit }, payload) {
    return axios.post('http://localhost:3000/exam-format/addExamFormat', payload).then(res => {
      return res
    })
  },
  fetchInstituteExamFormats ({ commit }, instituteId) {
    return axios.get('http://localhost:3000/exam-format/getAllInstituteExamFormats', {
      params: {
        instituteId: instituteId
      }
    }).then(res => {
      commit('SET_INSTITIUTE_EXAM_FORMATS_DATA', res.data)
    })
  },
  fetchAllExamFormats ({ commit }, instituteId) {
    return axios.get('http://localhost:3000/exam-format/getAllExamFormats', {
      params: {
        instituteId: instituteId
      }
    }).then(res => {
      commit('SET_EXAM_FORMATS_DATA', res.data)
    })
  },
  publishInstituteExam ({ commit }, examId) {
    return axios.get('http://localhost:3000/publish-exam/publish', {
      params: {
        exam_id: examId
      }
    }).then(res => {
      console.log('exam pusblished successfully')
      return res
    })
  },
  fetchExamInvitees ({ commit }, examId) {
    return axios.get('http://localhost:3000/exams/examInvitees', {
      params: {
        exam_id: examId
      }
    }).then(res => {
      commit('SET_EXAM_INVITEES_DATA', res.data.invitees)
      return res
    })
  },
  setExamInvitees ({ commit }, payload) {
    return axios.post('http://localhost:3000/exams/setInvitees', payload).then(res => {
      return res
    })
  },
  importCommonExamFormatToInstituteExamFormat ({ commit }, payload) {
    console.log('import exam format payload', payload)
    return axios.post('http://localhost:3000/exam-format/importExamFormats', payload).then(res => {
      return res
    })
  }
}

const getters = {
  getExamData: (state) => state.examData,
  getTopicsData: (state) => state.topicsData,
  getInviteesData: (state) => state.inviteesData,
  getUsersData: (state) => state.usersData,
  getQuestionsData: (state) => state.questionsData,
  getInstituteExamFormatsData: (state) => state.instituteExamFormatsData,
  getExamFormatsData: (state) => state.examFormatData,
  getExamInviteesData: (state) => state.examInviteesData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
