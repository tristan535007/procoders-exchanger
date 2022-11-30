<template>
  <div class="flex flex-col items-center h-full">
    <div class="flex flex-col items-center flex-grow">
      <h1 v-if="data" class="text-green-500 text-2xl my-16 text-center">
        You successfully received {{ data.amount + " " + data.currency }}
      </h1>
      <custom-button class="mt-16" @click="goHomePage"> Go back</custom-button>
    </div>
    <footer-rate
      :footer-data="{ exchangeSelect: data.exchangeSelect, receiveSelect: data.receiveSelect }"
    />
  </div>
</template>

<script>
import { CustomButton } from "@/components/UI";
import FooterRate from "@/components/FooterRate";
export default {
  name: "SuccessfulExchange",
  components: { FooterRate, CustomButton },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  methods: {
    goHomePage() {
      this.$router.push("/");
    },
  },
  created() {
    if (!this.data) {
      this.goHomePage();
    }
  },
};
</script>