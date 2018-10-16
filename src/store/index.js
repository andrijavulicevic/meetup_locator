import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'

import * as action from './actionNames'
import * as getter from './getterNames'

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
  [getter.GET_CITIES]: state => state.cities,
  [getter.GET_LOADING_CITIES]: state => state.loadingCities,
  [getter.GET_ERROR]: state => state.error,
  [getter.GET_EVENTS]: state => state.events,
  [getter.GET_LOADING_EVENTS]: state => state.loadingEvents
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
  [action.LOAD_CITIES] ({ commit }) {
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
  [action.LOAD_EVENTS] ({ commit }, { lat, lon }) {
    commit('toggleLoadingEvents')
    commit('setError', null)
    jsonp(
      `${API_URL}/find/upcoming_events?signed=true&key=${API_TOKEN}&lat=${lat}&lon=${lon}&radius=20`,
      null, (err, data) => {
        if (err) {
          commit('setError', err.message)
          commit('toggleLoadingEvents')
        } else {
          commit('setEvents', data.data.events)
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
