<template>
  <section class="page-head">
    <p class="eyebrow">WORKS</p>
    <div class="page-head-inline">
      <h1>作品集</h1>
      <p>用卡片展示具有一定规模的项目。点击后进入独立详情页，后续可扩展动画/3D 模型。</p>
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
