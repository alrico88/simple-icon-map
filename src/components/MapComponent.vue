<template lang="pug">
  l-map(:options="{height: '100%'}")
    l-tile-layer(:url="tileUrl")
    l-marker(
      v-for="coord of getLocations",
      :lat-lng="coord.latLng"
    )
      l-icon(
        :icon-url="coord.icon",
        :icon-size="iconSizeArray"
      )
</template>

<script>
import {LMap, LMarker, LIcon, LTileLayer} from 'vue2-leaflet';

import {mapGetters, mapState} from 'vuex';

export default {
  name: 'MapComponent',
  components: {
    LMap,
    LMarker,
    LIcon,
    LTileLayer,
  },
  computed: {
    ...mapState(['tileUrl', 'iconSize']),
    ...mapGetters(['getLocations']),
    iconSizeArray() {
      return [this.iconSize, this.iconSize];
    },
  },
};
</script>

<style scoped>

</style>
