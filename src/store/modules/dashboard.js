const state = () => ({
  dashboardData: null
})

const mutations = {
  SET_DASHBOARD_DATA (state, data) {
    state.dashboardData = data
  }
}

const actions = {
  fetchDashboardData ({ commit }, payload) {
    // Fetch data or perform some action
    // Example:
    commit('SET_DASHBOARD_DATA', payload)
  }
}

const getters = {
  dashboardData: (state) => state.dashboardData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
