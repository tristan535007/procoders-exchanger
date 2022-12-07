import { currencyOptions, errors, exchangeRate } from "@/constants";

export default {
  state: () => ({
    currencyOptions,
    exchangeSelect: currencyOptions[0].value,
    receiveSelect: currencyOptions[1].value,
    receiveData: null,
    error: "",
  }),
  getters: {
    matchedSelect({ exchangeSelect, receiveSelect }) {
      return exchangeSelect !== receiveSelect;
    },
    exchangedData({ exchangeSelect }) {
      return exchangeRate.find((c) => c.id === exchangeSelect);
    },
    receivedData({ receiveSelect }) {
      return exchangeRate.find((c) => c.id === receiveSelect);
    },
    lackVolumeError({ error }) {
      return error === errors.lackVolume ? "border-2 border-rose-500" : "border-white border";
    },
    calculatedRate(state, getters) {
      const { rate, name } = getters.receivedData;
      const { name: exchangeName } = getters.exchangedData;

      if (!rate || !name || !exchangeName) {
        return undefined;
      }
      const prise = getters.exchangedData ? getters.exchangedData.rate / rate : "0";

      return { prise, name, exchangeName };
    },
  },
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
    setExchangeSelect(state, payload) {
      state.exchangeSelect = payload;
    },
    setReceiveSelect(state, payload) {
      state.receiveSelect = payload;
    },
    setReceiveData(state, payload) {
      state.receiveData = payload;
    },
  },
};
