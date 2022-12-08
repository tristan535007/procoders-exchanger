import { currencyOptions } from "@/constants";

export default {
  currencyOptions,
  exchangeSelect: currencyOptions[0].value,
  receiveSelect: currencyOptions[1].value,
  receiveData: null,
  error: "",
};
