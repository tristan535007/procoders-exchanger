import { errors, exchangeRate } from "@/constants";

export default {
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
    const price = getters.exchangedData ? getters.exchangedData.rate / rate : "0";

    return { price, name, exchangeName };
  },
};
