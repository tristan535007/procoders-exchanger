export const currencyOptions = [
  { name: "UAH", value: "1" },
  { name: "USD", value: "2" },
];

export const exchangeRate = [
  { name: "UAH", id: "1", rate: "1" },
  { name: "USD", id: "2", rate: "40", reserved: "5000" },
];

export const rx_live = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

export const errors = Object.freeze({
  needNumberMessage: "You need to enter only positive numbers in both fields!",
  matchSelectMessage: "You can not select same currency!",
  lackVolume: "Overfloated reserve",
  zeroVolume: "You can't exchange 0",
});

export const initPrice = "0";
