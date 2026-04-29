<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/">
        <span>JAHNAN00</span>
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="site-navigation"
        aria-label="展开导航菜单"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="site-navigation" class="main-nav" :class="{ 'is-open': isMenuOpen }">
        <RouterLink to="/" active-class="is-active">首页</RouterLink>
        <RouterLink to="/works" active-class="is-active">作品</RouterLink>
        <RouterLink to="/blog" active-class="is-active">博客</RouterLink>
        <a :href="contactHref">联系我</a>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import ThemeToggle from "./ThemeToggle.vue";
import profile from "../content/profile.json";

const route = useRoute();
const isMenuOpen = ref(false);
const contactHref = `mailto:${profile.contacts.email}`;

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);
</script>
