<template>
  <footer class="flex justify-between w-full my-7 px-5">
    <exchange-rate-card
      :change-type="footerData.exchangeSelect"
      :receive-type="footerData.receiveSelect"
    />
    <reserved-info-card>
      <div v-if="reservedData.reserved">
        {{ reservedData.reserved + " " + reservedData.name }}
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
  },
};
</script>
