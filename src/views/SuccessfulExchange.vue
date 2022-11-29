<template>
  <layout-default
    :layout-params="{ exchangeSelect: data.exchangeSelect, receiveSelect: data.receiveSelect }"
  >
    <div class="flex flex-col items-center flex-grow">
      <h1 v-if="data" class="text-green-500 text-2xl my-16">
        You successfully received {{ data.amount + " " + data.currency }}
      </h1>
      <custom-button class="mt-16" @click="goHomePage"> Go back</custom-button>
    </div>
  </layout-default>
</template>

<script>
import { CustomButton, LayoutDefault } from "@/components/UI";
export default {
  name: "SuccessfulExchange",
  components: { CustomButton,LayoutDefault },
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