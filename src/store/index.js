import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'

import { API_URL, API_TOKEN } from '../config/app'

Vue.use(Vuex)

const state = {
  msg: "Helo from Store",
  cities: [],
  loadingCities: false,
  error: null,
  events: [],
  loadingEvents: false
}
const getters = {
  getCities: state => state.cities,
  getLoadingCities: state => state.loadingCities,
  getError: state => state.error,
  getEvents: state => state.events,
  getLoadingEvents: state => state.loadingEvents
}
const mutations = {
  setCities(state, cities) {
    state.cities = cities
  },
  toggleLoadingCities(state) {
    state.loadingCities = !state.loadingCities
  },
  setError(state, error) {
    state.error = error
  },
  setEvents(state, events) {
    state.events = events
  },
  toggleLoadingEvents(state) {
    state.loadingEvents = !state.loadingEvents
  }
}
const actions = {
  loadCities({ commit }) {
    commit('toggleLoadingCities')
    commit('setError', null)
    jsonp(
      `${API_URL}/2/cities?signed=true&key=${API_TOKEN}&country=rs`,
      null, (err, data) => {
        if (err) {
          commit('setError', err.message)
          commit('toggleLoadingCities')
        } else {
          commit('setCities', data.results)
          commit('toggleLoadingCities')
        }
      })
  },
  loadEvents({ commit }, { lat, lon }) {
    commit('toggleLoadingEvents')
    commit('setError', null)
    jsonp(
      `${API_URL}/find/upcoming_events?signed=true&key=${API_TOKEN}&lat=${lat}&lon=${lon}`,
      null, (err, data) => {
        if (err) {
          commit('setError', err.message)
          commit('toggleLoadingEvents')
        } else {
          commit('setEvents', data.results)
          commit('toggleLoadingEvents')
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
