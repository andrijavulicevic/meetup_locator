<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="800px"
  >
    <v-card>
      <v-btn
        fab
        small
        class="top-right-x link-feel"
        @click.prevent="closeEvents">
        <v-icon >close</v-icon>
      </v-btn>

      <v-card-title class="headline">Meetups in {{ city }}</v-card-title>

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

      <v-card-text v-else>
        <v-list>
          <v-list-group
            v-for="event in events"
            :key="event.id"
          >
            <v-list-tile avatar slot="activator">
              <v-list-tile-avatar>
                <v-icon color="primary lighten-1">event</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="text-uppercase">
                  {{ event.name }}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ event.time | date }}<span v-if="event.venue">, {{ event.venue.address_1 }}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile class="event-desc-wrap">
              <v-list-tile-content class="event-desc">
                <div>{{ event.description | removeHTML | limit(500) }}</div>
                <a :href="event.link" target="_blank">See more on Meetup</a>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

import {
  GET_EVENTS,
  GET_LOADING_EVENTS,
  GET_ERROR
} from "../store/getterNames";

export default {
  props: {
    city: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: true
    };
  },
  computed: {
    ...mapGetters({
      events: GET_EVENTS,
      loading: GET_LOADING_EVENTS,
      error: GET_ERROR
    })
  },
  methods: {
    closeEvents() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.event-desc-wrap {
  height: 200px;
  position: relative;
}
.event-desc {
  height: 200px;
  position: absolute;
  top: 0;
}
</style>
