import Vue from 'vue';
import Vuex from 'vuex';
import {processCsv, getLatLons} from '@/modules/processor';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    text: '',
    latitude: '',
    longitude: '',
    icon: '',
    parsed: [],
    iconSize: 10,
    delimiter: ',',
    tileUrl:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  },
  getters: {
    getLocations(state) {
      const data = state.parsed;
      const iconCol = state.icon;
      const latCol = state.latitude;
      const lonCol = state.longitude;
      return getLatLons(data, latCol, lonCol, iconCol);
    },
    getColumns(state) {
      return state.parsed.length > 0 ? Object.keys(state.parsed[0]) : [];
    },
  },
  mutations: {
    changeCol(state, {column, value}) {
      state[column] = value;
    },
    changeText(state, newText) {
      state.text = newText;
    },
    changeColumns(state, columns) {
      state.columns = columns;
    },
    changeParsed(state, data) {
      state.parsed = data;
    },
    changeIconSize(state, value) {
      state.iconSize = Number(value);
    },
    changeDelimiter(state, value) {
      state.delimiter = value;
    },
    changeBaseTile(state, payload) {
      state.tileUrl = payload;
    },
  },
  actions: {
    updateContent(context, csvString) {
      context.commit('changeText', csvString);
      context.dispatch('parseData');
    },
    parseData(context) {
      const parsedData = processCsv(context.state.text, context.state.delimiter);
      context.commit('changeParsed', parsedData);
    },
  },
});
