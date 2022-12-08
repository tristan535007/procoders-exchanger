<template>
  <div v-if="receiveData" class="flex flex-col items-center h-full">
    <div class="flex flex-col items-center flex-grow">
      <h1 class="text-green-500 text-2xl my-16 text-center">
        You successfully received {{ receiveData.amount + " " + receiveData.currency }}
      </h1>
      <custom-button class="mt-16" @click="goHomePage"> Go back</custom-button>
    </div>
  </div>
</template>

<script>
import { CustomButton } from "@/components/UI";
import { mapState } from "vuex";
export default {
  name: "SuccessfulExchange",
  components: { CustomButton },
  methods: {
    goHomePage() {
      this.$store.commit("setReceiveData", null);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState({
      receiveData: (state) => state.exchange.receiveData,
    }),
  },
  created() {
    if (!this.receiveData) {
      this.goHomePage();
    }
  },
};
</script>
