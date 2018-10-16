<template>
  <div class="ml-list">
    <ul>
      <li v-for="c in cities" :key="c.id">
        {{c.city}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      cities: "getCities",
      loading: "getLoadingCities",
      error: "getError"
    })
  }
};
</script>

<style scoped>
.ml-list {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
}
.ml-list ul {
  width: 100%;
  list-style: none;
}

.ml-list li {
  padding: 30px 0;
  margin: 1px;
  border: 1px solid black;
}
</style>
