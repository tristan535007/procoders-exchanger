<template>
  <footer class="flex justify-between w-full my-7 px-5">
    <exchange-rate-card
      :change-type="footerData.exchangeSelect"
      :receive-type="footerData.receiveSelect"
    />
    <reserved-info-card>
      <div v-if="reservedData.reserved">
        {{ displayedReservedAmount }}
      </div>
      <div v-else>----</div>
    </reserved-info-card>
  </footer>
</template>

<script>
import ExchangeRateCard from "@/components/ExchangeRateCard";
import ReservedInfoCard from "@/components/ReservedInfoCard";
import { exchangeRate } from "@/constants";
export default {
  components: {
    ExchangeRateCard,
    ReservedInfoCard,
  },
  props: {
    footerData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    reservedData() {
      return exchangeRate.find((d) => d.id === this.footerData.receiveSelect);
    },
    displayedReservedAmount() {
      const { reserved, name } = this.reservedData;
      return this.footerData?.receivedAmount
        ? `${reserved - this.footerData.receivedAmount} ${name}`
        : `${reserved} ${name}`;
    },
  },
};
</script>
