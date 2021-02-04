<template lang="pug">
  .row
    .col.pt-3
      h2 Simple Icon
        span.smalltext.ml-2 By Alberto Rico
          a.ml-2(href="https://github.com/alrico88/Simple-Heatmap", target="_blank")
            i.fa.fa-github-square
    .w-100
    .col
      form.form
        .form-group
          .row.align-items-center
            .col-5
              label.mb-0 Paste the content as CSV or DSV
            .col-7.text-right
              ul.list-inline.mb-0
                li.list-inline-item Delimiter:
                li.list-inline-item
                  .btn-group
                    button.btn.btn-sm.btn-light(:class="{'active': delimiter === ','}", @click.prevent="changeDelimiter(',')") Comma
                    button.btn.btn-sm.btn-light(:class="{'active': delimiter === ';'}", @click.prevent="changeDelimiter(';')") Semicolon
          .row.mt-2
            .col
              b-form-group
                b-textarea(v-model="textarea", rows="15")
        lat-lng-cols
        .form-group
          label.mb-1 Map style
          select.form-control.mb-1(v-model="mapStyle")
            option(value="colourful") Colourful
            option(value="light") Light
            option(value="dark") Dark
        b-form-group(label="Icon size")
          b-form-input(type="range", min="2", max="100", v-model="iconSizeRange")
        b-form-group
          b-form-checkbox(v-model="showLabels") Show map labels
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import LatLngCols from './LatLngCols.vue';
import GeohashCols from './GeohashCols.vue';

export default {
  components: {
    LatLngCols,
    GeohashCols,
  },
  data() {
    return {
      mapStyle: 'colourful',
      tileUrls: {
        light: {
          labels: 'light_all',
          noLabels: 'light_nolabels',
        },
        dark: {
          labels: 'dark_all',
          noLabels: 'dark_nolabels',
        },
        colourful: {
          labels: 'voyager',
          noLabels: 'voyager_nolabels',
        },
      },
      showLabels: true,
    };
  },
  computed: {
    ...mapState([
      'text',
      'delimiter',
      'iconSize',
    ]),
    ...mapGetters(['getColumns']),
    textarea: {
      get() {
        return this.text;
      },
      set(value) {
        this.$store.dispatch('updateContent', value);
      },
    },
    mapOptions() {
      const hasLabels = this.showLabels ? 'labels' : 'noLabels';
      const newTile = this.tileUrls[this.mapStyle][hasLabels];
      return `https://{s}.basemaps.cartocdn.com/rastertiles/${newTile}/{z}/{x}/{y}{r}.png`;
    },
    iconSizeRange: {
      get() {
        return this.iconSize;
      },
      set(value) {
        this.$store.commit('changeIconSize', value);
      },
    },
  },
  watch: {
    mapOptions(tileUrl) {
      this.$store.commit('changeBaseTile', tileUrl);
    },
  },
  methods: {
    changeDelimiter(newDelimiter) {
      this.$store.commit('changeDelimiter', newDelimiter);
      this.$store.dispatch('parseData');
    },
  },
};
</script>

<style scoped>
.smalltext {
  font-size: 14pt;
}
</style>
