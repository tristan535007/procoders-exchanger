<template>
  <select
    v-model="selectModel"
    class="p-2.5 bg-transparent border-white border rounded-sm min-h-[56px]"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      v-text="option.name"
    />
  </select>
</template>

<script>
export default {
  name: "custom-select",
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    selectModel: {
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
