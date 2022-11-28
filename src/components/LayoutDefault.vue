<template>
  <div
    class="flex flex-col justify-between h-screen bg-gradient-to-b from-[#35313D] to-[#131115] text-white"
  >
    <nav-bar />
    <slot/>
    <footer-rate :footer-data="layoutParams" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterRate from "@/components/FooterRate";
export default {
  name: "layout-default",
  components: { FooterRate, NavBar },
  props: {
    layoutParams: {
      type: Object,
      required: true,
    },
  },
};
</script>
