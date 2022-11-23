<template>
  <div>
    <div>Home page</div>
    <button @click="goNextP">Go</button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goNextP() {
      this.$router.push({
        name: "SuccessfulExchange",
        params: {
          data: {
            currency: "USD",
            amount: "140",
          },
        },
      });
    },
  },
};
</script>
