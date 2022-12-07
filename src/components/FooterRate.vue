<template>
  <footer class="flex justify-between w-full my-7 px-5">
    <exchange-rate-card />
    <reserved-info-card>
      <div v-if="receivedData.reserved">
        {{ displayedReservedAmount }}
      </div>
      <div v-else>----</div>
    </reserved-info-card>
  </footer>
</template>

<script>
import ExchangeRateCard from "@/components/ExchangeRateCard";
import ReservedInfoCard from "@/components/ReservedInfoCard";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    ExchangeRateCard,
    ReservedInfoCard,
  },
  computed: {
    ...mapState({
      receiveData: (state) => state.exchange.receiveData,
    }),
    ...mapGetters(["receivedData"]),
    displayedReservedAmount() {
      const { reserved, name } = this.receivedData;
      return this.receiveData
        ? `${reserved - this.receiveData.amount} ${name}`
        : `${reserved} ${name}`;
    },
  },
};
</script>
