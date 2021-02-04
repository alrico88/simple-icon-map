<template lang="pug">
  #app
    .container-fluid
      .row
        .col-8.vh-100.p-0
          map-component
        .col
          content-input
</template>

<script>
import ContentInputVue from './components/ContentInput.vue';
import MapComponentVue from './components/MapComponent.vue';

export default {
  name: 'App',
  components: {
    ContentInput: ContentInputVue,
    MapComponent: MapComponentVue,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
</style>
