<template>
  <div v-if="parsedUrlQuery" class="flex flex-col items-center h-full">
    <div class="flex flex-col items-center flex-grow">
      <h1 v-if="foundCurrencyName" class="text-green-500 text-2xl my-16 text-center">
        You successfully received {{ parsedUrlQuery.receivedAmount + " " + foundCurrencyName }}
      </h1>
      <custom-button class="mt-16" @click="goHomePage"> Go back</custom-button>
    </div>
    <footer-rate :footer-data="parsedUrlQuery" />
  </div>
</template>

<script>
import { CustomButton } from "@/components/UI";
import FooterRate from "@/components/FooterRate";
import { currencyOptions } from "@/constants";
export default {
  name: "SuccessfulExchange",
  components: { FooterRate, CustomButton },
  methods: {
    goHomePage() {
      this.$router.push("/");
    },
  },
  computed: {
    parsedUrlQuery() {
      const { receivedAmount, exchangeSelect, receiveSelect } = this.$route.query;
      if (!receivedAmount || !exchangeSelect || !receiveSelect) {
        return null;
      }
      return { receivedAmount, exchangeSelect, receiveSelect };
    },
    foundCurrencyName() {
      const { receiveSelect } = this.parsedUrlQuery;
      return currencyOptions.find((option) => option.value === receiveSelect)?.name || null;
    },
  },
  created() {
    if (!this.parsedUrlQuery) {
      this.goHomePage();
    }
  },
};
</script>
