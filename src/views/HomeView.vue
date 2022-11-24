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
    {{ error }}
  </div>
</template>

<script>
import { currencyOptions } from "@/constants";
export default {
  name: "HomeView",
  rx_live: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
  needNumberMessage: "You need to enter only positive numbers in both fields!",

  data() {
    return {
      currencyOptions,
      exchangeSelect: currencyOptions[0].value,
      receiveSelect: currencyOptions[1].value,
      exchangeInput: "",
      receiveInput: "",
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
    checkInputsData(message) {
      const isOkReceive = this.$options.rx_live.test(this.receiveInput);
      const isOkExchange = this.$options.rx_live.test(this.exchangeInput);

      if (isOkExchange && isOkReceive) {
        this.error = "";
        return;
      }
      this.error = message;
    },
  },

  watch: {
    receiveInput() {
      this.checkInputsData(this.$options.needNumberMessage);
    },
    exchangeInput() {
      this.checkInputsData(this.$options.needNumberMessage);
    },
  },
};
</script>
