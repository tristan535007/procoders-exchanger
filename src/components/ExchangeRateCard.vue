<template>
  <div>
    <div class="uppercase mb-4">exchange rate:</div>
    <div>1 {{ exchangedData.name }} = {{ receivedData.prise + " " + receivedData.name }}</div>
  </div>
</template>

<script>
import { exchangeRate } from "@/constants";
export default {
  props: {
    changeType: {
      type: String,
      required: true,
    },
    receiveType: {
      type: String,
      required: true,
    },
  },
  computed: {
    exchangedData() {
      return exchangeRate.find((option) => option.id === this.changeType);
    },
    receivedData() {
      const { rate, name } = exchangeRate.find((option) => option.id === this.receiveType);
      const prise = this.exchangedData.rate / rate;

      return { prise, name };
    },
  },
};
</script>
