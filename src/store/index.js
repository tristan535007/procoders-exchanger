import Vue from "vue";
import Vuex from "vuex";
import exchangeModule from "@/store/exchangeModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    exchange: exchangeModule,
  },
});
