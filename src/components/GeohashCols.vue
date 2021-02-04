<template lang="pug">
  .form-group
    label Geohash column
    select.form-control(v-model="geohashCol")
      option(value="") -- No selection --
      option(v-for="col of getColumns", :value="col") {{ col }}
</template>

<script>
import {mapState, mapGetters} from 'vuex';
export default {
  computed: {
    ...mapState(['geohash']),
    ...mapGetters(['getColumns']),
    geohashCol: {
      get() {
        return this.geohash;
      },
      set(value) {
        this.$store.commit('changeCol', {
          column: 'geohash',
          value,
        });
      },
    },
  },
};
</script>

<style>
</style>
