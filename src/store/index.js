import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'

import { API_URL, API_TOKEN } from '../config/app'

Vue.use(Vuex)

const state = {
  msg: "Helo from Store",
  cities: [],
  loading: false,
  error: null
}
const getters = {
}
const mutations = {
  setCities(state, cities) {
    state.cities = cities
  },
  toggleLoading(state) {
    state.loading = !state.loading
  },
  setError(state, error) {
    state.error = error
  }
}
const actions = {
  loadCities({commit}) {
    commit('toggleLoading')
    jsonp(
      `${API_URL}/2/cities?signed=true&key=${API_TOKEN}&country=rs`,
      null, (err, data) => {
        if (err) {
          commit('setError', err.message)
          commit('toggleLoading')
          commit('setLoaded', false)
        } else {
          commit('setCities', data.results)
          commit('toggleLoading')
        }
      })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
