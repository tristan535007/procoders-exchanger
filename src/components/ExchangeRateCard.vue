<template>
  <div v-if="receivedData && exchangedData">
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
      const exchangeUnit = exchangeRate.find((option) => option.id === this.receiveType);

      if (!exchangeUnit) {
        return undefined;
      }

      const { rate, name } = exchangeUnit;
      const prise = this.exchangedData ? this.exchangedData.rate / rate : "0";

      return { prise, name };
    },
  },
};
</script>
