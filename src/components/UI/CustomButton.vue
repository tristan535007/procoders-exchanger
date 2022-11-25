<template>
  <button
    @click="$emit('click')"
    class="p-2 my-3 border-transparent border rounded-md min-w-[100px] bg-white text-black"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "custom-button",
  model: {
    event: "click",
  },
};
</script>
