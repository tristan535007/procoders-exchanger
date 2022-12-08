<template>
  <div
    class="flex flex-col justify-between h-screen bg-gradient-to-b from-[#35313D] to-[#131115] text-white"
  >
    <nav-bar />
    <router-view />
    <footer-rate />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import FooterRate from "@/components/FooterRate";
export default {
  components: { NavBar, FooterRate },
};
</script>
