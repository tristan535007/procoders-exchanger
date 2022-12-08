<template>
  <div class="max-w-[1200px] w-full mx-auto flex items-center flex-col px-5 flex-grow">
    <h1 class="text-2xl">Exchanger</h1>
    <div class="my-24 flex justify-between w-full">
      <div>
        <custom-select
          :class="lackVolumeError"
          v-model="exchangeSelect"
          @input="setExchangeSelect"
          class="mr-4"
          :options="currencyOptions"
        />
        <custom-input :class="lackVolumeError" v-model="exchangeInput" placeholder="Exchange" />
      </div>
      <div>
        <custom-select
          :class="lackVolumeError"
          v-model="receiveSelect"
          @input="setReceiveSelect"
          class="mr-4"
          :options="currencyOptions"
        />
        <custom-input :class="lackVolumeError" v-model="receiveInput" placeholder="Receive" />
      </div>
    </div>
    <div class="min-h-[25px]">
      <span v-if="error" class="text-red-400">{{ error }}</span>
    </div>
    <custom-button @click="getExchange" :error="error">GO</custom-button>
  </div>
</template>

<script>
import { rx_live, errors, initPrice } from "@/constants";
import { CustomInput, CustomSelect, CustomButton } from "@/components/UI";
import { mapGetters, mapState } from "vuex";

export default {
  name: "HomeView",
  components: { CustomButton, CustomInput, CustomSelect },

  data() {
    return {
      exchangeInput: initPrice,
      receiveInput: initPrice,
    };
  },
  methods: {
    setExchangeSelect(v) {
      this.$store.commit("setExchangeSelect", v);
    },
    setReceiveSelect(v) {
      this.$store.commit("setReceiveSelect", v);
    },
    getExchange() {
      this.$store.commit("setReceiveData", {
        amount: this.receiveInput,
        currency: this.receivedData?.name,
      });
      this.$router.push({
        name: "SuccessfulExchange",
      });
    },
    validateInputParams() {
      const { needNumberMessage, matchSelectMessage, lackVolume, zeroVolume } = errors;
      const isOkReceive = rx_live.test(this.receiveInput);
      const isOkExchange = rx_live.test(this.exchangeInput);
      const isOkVolume = this.receivedData?.reserved
        ? +this.receiveInput < +this.receivedData.reserved
        : true;
      const isZero = this.exchangeInput === "0" || this.receiveInput === "0";
      let errorMessage = "";

      if (isOkExchange && isOkReceive && this.matchedSelect && isOkVolume && !isZero) {
        errorMessage = "";
      } else if (!this.matchedSelect) {
        errorMessage = matchSelectMessage;
      } else if (!isOkExchange || !isOkReceive) {
        errorMessage = needNumberMessage;
      } else if (isZero) {
        errorMessage = zeroVolume;
      } else {
        errorMessage = lackVolume;
      }

      this.$store.commit("setError", errorMessage);
    },
  },
  computed: {
    ...mapState({
      currencyOptions: (state) => state.exchange.currencyOptions,
      exchangeSelect: (state) => state.exchange.exchangeSelect,
      receiveSelect: (state) => state.exchange.receiveSelect,
      error: (state) => state.exchange.error,
    }),
    ...mapGetters(["matchedSelect", "exchangedData", "receivedData", "lackVolumeError"]),
    exchangeVal: {
      get: () => this.exchangeSelect,
      set: (val) => this.$store.commit("setExchangeSelect", val),
    },
  },
  watch: {
    exchangeInput() {
      const { rate: recRate } = this.receivedData;
      const { rate: excRate } = this.exchangedData;

      if (!isNaN(+this.exchangeInput) && this.matchedSelect) {
        if (+excRate > +recRate) {
          this.receiveInput = (this.exchangeInput * excRate).toString();
          return;
        }
        this.receiveInput = (this.exchangeInput / recRate).toString();
      }
    },
    receiveInput() {
      const { rate: recRate } = this.receivedData;
      const { rate: excRate } = this.exchangedData;

      if (!isNaN(+this.receiveInput) && this.matchedSelect) {
        if (+recRate > +excRate) {
          this.exchangeInput = (this.receiveInput * recRate).toString();

          return;
        }
        this.exchangeInput = (this.receiveInput / excRate).toString();
      }
    },
    exchangeSelect() {
      this.exchangeInput = initPrice;
    },
    receiveSelect() {
      this.receiveInput = initPrice;
    },
  },
  updated() {
    this.validateInputParams();
  },
  beforeMount() {
    this.validateInputParams();
  },
};
</script>
