const state = {
  title: ''
}

const mutations = {
  CHANGE_SURVEY: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSurvey ({ commit }, data) {
    commit('CHANGE_SURVEY', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
