<template>
  <div class="flex flex-col items-center">
    <h1 v-if="data" class="text-green-500 text-2xl my-16">
      You successfully received {{ data.amount + " " + data.currency }}
    </h1>
    <custom-button class="mt-16" @click="goHomePage"> Go back</custom-button>
  </div>
</template>

<script>
export default {
  name: "SuccessfulExchange",
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
