<template>
  <input
    v-model="inputModel"
    type="text"
    class="p-2.5 bg-transparent border-white border rounded-sm placeholder:text-white min-h-[56px]"
  />
</template>

<script>
export default {
  name: "custom-input",
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    modelValue: {
      type: String,
    },
  },
  computed: {
    inputModel: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
