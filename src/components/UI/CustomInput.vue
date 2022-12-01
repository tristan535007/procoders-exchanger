<template>
  <input
    :value="checkedValue"
    @input="$emit('input', $event.target.value)"
    type="text"
    class="p-2.5 bg-transparent rounded-sm placeholder:text-white min-h-[56px]"
  />
</template>

<script>
export default {
  name: "custom-input",
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    checkedValue() {
      return !isNaN(+this.value) ? +this.value.toString() : this.value;
    },
  },
};
</script>
