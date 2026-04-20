<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/">
        <img src="/site-avatar.jpg" alt="站点头像" class="brand-avatar" />
        <span>JAHNAN00</span>
      </RouterLink>
      <nav class="main-nav">
        <RouterLink to="/" active-class="is-active">首页</RouterLink>
        <RouterLink to="/works" active-class="is-active">作品</RouterLink>
        <RouterLink to="/blog" active-class="is-active">博客</RouterLink>
      </nav>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ThemeToggle from "./ThemeToggle.vue";
</script>
