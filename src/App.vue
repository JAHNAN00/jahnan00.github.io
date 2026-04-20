<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="page-shell">
      <RouterView />
    </main>
    <footer class="site-footer">
      <span>© {{ year }} JAHNAN00</span>
      <span>Built with Vue + Vite</span>
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";

const year = new Date().getFullYear();
</script>
