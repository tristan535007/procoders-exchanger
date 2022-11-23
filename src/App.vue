<template>
  <div class="h-screen bg-gradient-to-b from-[#35313D] to-[#131115] text-white">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>
