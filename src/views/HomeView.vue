<template>
  <div class="max-w-[1200px] mx-auto flex items-center flex-col">
    <h1 class="text-2xl">Exchanger</h1>
    <div class="my-24 flex justify-between w-full">
      <div>
        <custom-select
          v-model="exchangeSelect"
          class="mr-4"
          :options="currencyOptions"
        />
        <custom-input v-model="exchangeInput" placeholder="Exchange" />
      </div>
      <div>
        <custom-select
          v-model="receiveSelect"
          class="mr-4"
          :options="currencyOptions"
        />
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
import { currencyOptions } from "@/constants";
export default {
  name: "HomeView",
  rx_live: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
  needNumberMessage: "You need to enter only positive numbers in both fields!",
  matchSelectMessage: "You can not select same currency!",

  data() {
    return {
      currencyOptions,
      exchangeSelect: currencyOptions[0].value,
      receiveSelect: currencyOptions[1].value,
      exchangeInput: "0",
      receiveInput: "0",
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
      const isOkReceive = this.$options.rx_live.test(this.receiveInput);
      const isOkExchange = this.$options.rx_live.test(this.exchangeInput);
      const isMatchedSelect = this.exchangeSelect !== this.receiveSelect;

      if (isOkExchange && isOkReceive && isMatchedSelect) {
        this.error = "";
        return;
      }

      this.error = !isMatchedSelect
        ? this.$options.matchSelectMessage
        : this.$options.needNumberMessage;
    },

    onClickBtn() {
      console.log("Changed!");
    },
  },
  watch: {
    exchangeInput() {
      console.log(this.exchangeInput);
    },
    receiveInput() {
      console.log(this.receiveInput);
    },
  },
  updated() {
    this.validateInputParams();
  },
};
</script>
