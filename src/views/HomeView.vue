<template>
  <div class="max-w-[1200px] mx-auto flex items-center flex-col">
    <h1 class="text-2xl">Exchanger</h1>
    <div class="my-24 flex justify-between w-full">
      <div>
        <custom-select v-model="exchangeSelect" class="mr-4" :options="currencyOptions" />
        <custom-input v-model="exchangeInput" placeholder="Exchange" />
      </div>
      <div>
        <custom-select v-model="receiveSelect" class="mr-4" :options="currencyOptions" />
        <custom-input v-model="receiveInput" placeholder="Receive" />
      </div>
    </div>
    <div class="min-h-[25px]">
      <span v-if="error" class="text-red-400">{{ error }}</span>
    </div>
    <custom-button @click="onClickBtn">GO</custom-button>
  </div>
</template>

<script>
import {
  currencyOptions,
  rx_live,
  needNumberMessage,
  matchSelectMessage,
  exchangeRate,
} from "@/constants";
export default {
  name: "HomeView",
  initPrice: "0",

  data() {
    return {
      currencyOptions,
      exchangeSelect: currencyOptions[0].value,
      receiveSelect: currencyOptions[1].value,
      exchangeInput: this.$options.initPrice,
      receiveInput: this.$options.initPrice,
      error: "",
    };
  },
  methods: {
    // goNextP() {
    //   this.$router.push({
    //     name: "SuccessfulExchange",
    //     params: {
    //       data: {
    //         currency: "USD",
    //         amount: "140",
    //       },
    //     },
    //   });
    // },
    validateInputParams() {
      const isOkReceive = rx_live.test(this.receiveInput);
      const isOkExchange = rx_live.test(this.exchangeInput);
      const isMatchedSelect = this.exchangeSelect !== this.receiveSelect;

      if (isOkExchange && isOkReceive && isMatchedSelect) {
        this.error = "";
        return;
      }

      this.error = !isMatchedSelect ? matchSelectMessage : needNumberMessage;
    },

    onClickBtn() {
      console.log("Changed!");
    },
  },
  computed: {
    initialExchangeData() {
      const isMatchedSelect = this.exchangeSelect !== this.receiveSelect;
      const exchangeData = exchangeRate.find((c) => c.id === this.exchangeSelect);
      const receiveData = exchangeRate.find((c) => c.id === this.receiveSelect);

      return {
        isMatchedSelect,
        exchangeData,
        receiveData,
      };
    },
  },
  watch: {
    exchangeInput() {
      const { isMatchedSelect, exchangeData, receiveData } = this.initialExchangeData;

      if (!isNaN(+this.exchangeInput) && isMatchedSelect) {
        if (exchangeData.rate > receiveData.rate) {
          this.receiveInput = (this.exchangeInput * exchangeData.rate).toString();
          return;
        }
        this.receiveInput = (this.exchangeInput / receiveData.rate).toString();
      }
    },
    receiveInput() {
      const { isMatchedSelect, exchangeData, receiveData } = this.initialExchangeData;

      if (!isNaN(+this.receiveInput) && isMatchedSelect) {
        if (receiveData.rate > exchangeData.rate) {
          this.exchangeInput = (this.receiveInput * receiveData.rate).toString();
          return;
        }
        this.exchangeInput = (this.receiveInput / exchangeData.rate).toString();
      }
    },
    exchangeSelect() {
      this.exchangeInput = this.$options.initPrice;
    },
    receiveSelect() {
      this.receiveInput = this.$options.initPrice;
    },
  },
  updated() {
    this.validateInputParams();
  },
};
</script>
