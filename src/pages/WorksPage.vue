<template>
  <section class="page-head">
    <p class="eyebrow">WORKS</p>
    <div class="page-head-inline">
      <h1>作品集</h1>
      <p>这里整理了近阶段做过的项目，涵盖背景、实现方式、关键成果与当前状态。</p>
    </div>
  </section>

  <section class="works-grid">
    <article v-for="work in works" :key="work.slug" class="work-card panel">
      <img :src="work.cover" :alt="work.title" class="work-cover" loading="lazy" />
      <div class="work-content">
        <p class="meta">{{ work.year }} · {{ work.status }}</p>
        <h2>{{ work.title }}</h2>
        <p>{{ work.summary }}</p>
        <div class="chip-list compact">
          <span v-for="tech in work.techStack" :key="`${work.slug}-${tech}`" class="chip">{{ tech }}</span>
        </div>
        <div class="card-actions">
          <RouterLink class="card-button" :to="`/works/${encodeURIComponent(work.slug)}`">
            查看详情
          </RouterLink>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { getAllWorks } from "../lib/works";

const works = getAllWorks();
</script>
