<template>
  <v-app id="inspire">
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center align-start>
              <transition enter-active-class="animated bounceInRight">
                <meetup-locator></meetup-locator>
              </transition>
            </v-layout>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MeetupLocator from "./components/MeetupLocator";
export default {
  name: "app",
  components: {
    MeetupLocator
  },
  created() {
    this.$store.dispatch("loadCities");
  }
};
</script>

<style>
.top-right-x {
  position: absolute !important;
  top: 10px;
  right: 10px;
  font-weight: bold;
  z-index: 1;
}
.relative {
  position: relative;
}
</style>
