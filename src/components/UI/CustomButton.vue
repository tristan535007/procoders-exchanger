<template>
  <button
    :disabled="checkedErrors"
    @click="$emit('click')"
    :class="{ 'border-2 border-rose-500': checkedErrors }"
    class="p-2 my-3 border-transparent border rounded-md min-w-[100px] bg-white text-black uppercase"
  >
    <span :class="{ 'text-rose-500': checkedErrors }">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "custom-button",
  model: {
    event: "click",
  },
  props: {
    error: {
      type: String,
      default: "",
    },
  },
  computed: {
    checkedErrors() {
      return this.error.length > 0;
    },
  },
};
</script>
