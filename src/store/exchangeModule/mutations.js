export default {
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
};
