<template>
  <div id="app">
    <navbar />
    <div class="container mx-auto px-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>