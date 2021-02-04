<template lang="pug">
  .form-group
    .form-row
      .col-sm-4
        b-form-group(label="Latitude column")
          b-form-select(v-model="latitudeCol", :options="columnOptions")
      .col-sm-4
        b-form-group(label="Longitude column")
          b-form-select(v-model="longitudeCol", :options="columnOptions")
      .col-sm-4
        b-form-group(label="Icon column")
          b-form-select(v-model="iconCol", :options="columnOptions")
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapState(['latitude', 'longitude', 'icon']),
    ...mapGetters(['getColumns']),
    columnOptions() {
      return [
        {
          text: '-- No selection --',
          value: null,
        }, ...this.getColumns.map((d) => ({
          text: d,
          value: d,
        })),
      ];
    },
    latitudeCol: {
      get() {
        return this.latitude;
      },
      set(value) {
        this.changeCol({
          column: 'latitude',
          value,
        });
      },
    },
    longitudeCol: {
      get() {
        return this.longitude;
      },
      set(value) {
        this.changeCol({
          column: 'longitude',
          value,
        });
      },
    },
    iconCol: {
      get() {
        return this.icon;
      },
      set(value) {
        this.changeCol({
          column: 'icon',
          value,
        });
      },
    },
  },
  methods: {
    ...mapMutations(['changeCol']),
  },
};
</script>

<style>
</style>
