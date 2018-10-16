<template>
  <div id="app">
    <meetup-locator></meetup-locator>
  </div>
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
