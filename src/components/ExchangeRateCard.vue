<template>
  <div v-if="calculatedRate">
    <div class="uppercase mb-4">exchange rate:</div>
    <div>
      1 {{ calculatedRate.exchangeName }} = {{ calculatedRate.price + " " + calculatedRate.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["calculatedRate"]),
  },
};
</script>
