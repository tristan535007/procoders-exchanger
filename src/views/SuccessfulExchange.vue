<template>
  <div>
    <div>Successfully received message.</div>
    <div v-if="data">{{ data.currency }}</div>
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
  created() {
    if (!this.data) {
       this.$router.push("/");
    }
  },
};
</script>
