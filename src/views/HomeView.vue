<template>
  <div class="max-w-[1200px] w-full mx-auto flex items-center flex-col px-5 flex-grow">
    <h1 class="text-2xl">Exchanger</h1>
    <div class="my-24 flex justify-between w-full">
      <div>
        <custom-select
          :class="lackVolumeError"
          v-model="exchangeSelect"
          class="mr-4"
          :options="currencyOptions"
        />
        <custom-input :class="lackVolumeError" v-model="exchangeInput" placeholder="Exchange" />
      </div>
      <div>
        <custom-select
          :class="lackVolumeError"
          v-model="receiveSelect"
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
    <footer-rate :footer-data="{ receiveSelect, exchangeSelect }" />
  </div>
</template>

<script>
import { currencyOptions, rx_live, exchangeRate, errors, initPrice } from "@/constants";
import { CustomInput, CustomSelect, CustomButton } from "@/components/UI";
import FooterRate from "@/components/FooterRate";

export default {
  name: "HomeView",
  components: { FooterRate, CustomButton, CustomInput, CustomSelect },

  data() {
    return {
      currencyOptions,
      exchangeSelect: currencyOptions[0].value,
      receiveSelect: currencyOptions[1].value,
      exchangeInput: initPrice,
      receiveInput: initPrice,
      error: "",
    };
  },
  methods: {
    getExchange() {
      this.$router.push({
        name: "SuccessfulExchange",
        params: {
          data: {
            currency: this.receivedData.name,
            amount: this.receiveInput,
            exchangeSelect: this.exchangeSelect,
            receiveSelect: this.receiveSelect,
          },
        },
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

      if (isOkExchange && isOkReceive && this.matchedSelect && isOkVolume && !isZero) {
        this.error = "";
      } else if (!this.matchedSelect) {
        this.error = matchSelectMessage;
      } else if (!isOkExchange || !isOkReceive) {
        this.error = needNumberMessage;
      } else if (isZero) {
        this.error = zeroVolume;
      } else {
        this.error = lackVolume;
      }
    },
  },
  computed: {
    matchedSelect() {
      return this.exchangeSelect !== this.receiveSelect;
    },
    exchangedData() {
      return exchangeRate.find((c) => c.id === this.exchangeSelect);
    },
    receivedData() {
      return exchangeRate.find((c) => c.id === this.receiveSelect);
    },
    lackVolumeError() {
      return this.error === errors.lackVolume ? "border-2 border-rose-500" : "border-white border";
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
