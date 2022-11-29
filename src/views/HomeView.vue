<template>
  <layout-default :layout-params="{ exchangeSelect, receiveSelect }">
    <div class="max-w-[1200px] w-full mx-auto flex items-center flex-col px-5 flex-grow">
      <h1 class="text-2xl">Exchanger</h1>
      <div class="my-24 flex justify-between w-full">
        <div>
          <custom-select
            v-model="exchangeSelect"
            :class="{ 'border-2 border-rose-500': lackVolumeError }"
            class="mr-4"
            :options="currencyOptions"
          />
          <custom-input
            :class="{ 'border-2 border-rose-500': lackVolumeError }"
            v-model="exchangeInput"
            placeholder="Exchange"
          />
        </div>
        <div>
          <custom-select
            v-model="receiveSelect"
            :class="{ 'border-2 border-rose-500': lackVolumeError }"
            class="mr-4"
            :options="currencyOptions"
          />
          <custom-input
            :class="{ 'border-2 border-rose-500': lackVolumeError }"
            v-model="receiveInput"
            placeholder="Receive"
          />
        </div>
      </div>
      <div class="min-h-[25px]">
        <span v-if="error" class="text-red-400">{{ error }}</span>
      </div>
      <custom-button @click="getExchange" :error="error">GO</custom-button>
    </div>
  </layout-default>
</template>

<script>
import { currencyOptions, rx_live, exchangeRate, errors } from "@/constants";
import { CustomInput, CustomSelect, CustomButton, LayoutDefault } from "@/components/UI";

export default {
  name: "HomeView",
  components: { CustomButton, CustomInput, CustomSelect, LayoutDefault },
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
    getExchange() {
      const { receiveData } = this.initialExchangeData;

      this.$router.push({
        name: "SuccessfulExchange",
        params: {
          data: {
            currency: receiveData.name,
            amount: this.receiveInput,
            exchangeSelect: this.exchangeSelect,
            receiveSelect: this.receiveSelect,
          },
        },
      });
    },
    validateInputParams() {
      const { isMatchedSelect, isOkVolume } = this.initialExchangeData;
      const { needNumberMessage, matchSelectMessage, lackVolume } = errors;
      const isOkReceive = rx_live.test(this.receiveInput);
      const isOkExchange = rx_live.test(this.exchangeInput);

      if (isOkExchange && isOkReceive && isMatchedSelect && isOkVolume) {
        this.error = "";
        return;
      }

      this.error = !isMatchedSelect
        ? matchSelectMessage
        : !isOkExchange || !isOkReceive
        ? needNumberMessage
        : lackVolume;
    },
  },
  computed: {
    initialExchangeData() {
      const isMatchedSelect = this.exchangeSelect !== this.receiveSelect;
      const exchangeData = exchangeRate.find((c) => c.id === this.exchangeSelect);
      const receiveData = exchangeRate.find((c) => c.id === this.receiveSelect);
      const isOkVolume = receiveData?.reserved ? +this.receiveInput < +receiveData.reserved : true;

      return {
        isMatchedSelect,
        exchangeData,
        receiveData,
        isOkVolume,
      };
    },
    lackVolumeError() {
      return this.error === errors.lackVolume;
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
