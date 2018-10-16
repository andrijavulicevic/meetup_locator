<template>
  <v-layout row justify-center>
    <v-flex md8>
      <h1>Cities</h1>
      
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>

      <v-alert
        v-else-if="error"
        :value="true"
        type="error"
      >
        {{ error }}
      </v-alert>

      <v-list v-else>
        <v-list-tile
          v-for="city in cities"
          :key="city.id"
          avatar
          @click="openEvents(city)"
        >
          <v-list-tile-avatar>
              <v-icon color="grey lighten-1">location_city</v-icon>
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="city.city" class="text-uppercase"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <events-modal
        v-if="showEvents"
        :city="selectedCity"
        @close="showEvents = false"
      ></events-modal>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

import { LOAD_EVENTS } from "../store/actionNames";
import {
  GET_CITIES,
  GET_LOADING_CITIES,
  GET_ERROR
} from "../store/getterNames";

import EventsModal from "./EventsModal";

export default {
  components: {
    EventsModal
  },
  data() {
    return {
      showEvents: false,
      selectedCity: ""
    };
  },
  computed: {
    ...mapGetters({
      cities: GET_CITIES,
      loading: GET_LOADING_CITIES,
      error: GET_ERROR
    })
  },
  methods: {
    openEvents(city) {
      this.selectedCity = city.city;
      const { lat, lon } = city;
      this.$store.dispatch(LOAD_EVENTS, { lat, lon });
      this.showEvents = true;
    }
  }
};
</script>

