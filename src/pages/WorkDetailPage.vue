<template>
  <section v-if="work" class="panel detail-head">
    <p class="eyebrow">WORK DETAIL</p>
    <h1>{{ work.title }}</h1>
    <p class="meta">{{ work.year }} · {{ work.status }}</p>
    <p>{{ work.summary }}</p>
    <div class="chip-list compact">
      <span v-for="tech in work.techStack" :key="tech" class="chip">{{ tech }}</span>
    </div>
  </section>

  <section v-if="work" class="panel animation-slot">
    <h2>动画/3D 扩展位</h2>
    <p>这里预留后续独立动画或三维模型交互模块的挂载区域。</p>
  </section>

  <section v-if="work" class="panel">
    <h2>项目亮点</h2>
    <ul class="list">
      <li v-for="point in work.highlights" :key="point">{{ point }}</li>
    </ul>
  </section>

  <section v-if="work" class="panel">
    <h2>详细说明</h2>
    <article v-for="section in work.sections" :key="section.title" class="article-block">
      <h3>{{ section.title }}</h3>
      <p>{{ section.content }}</p>
    </article>
  </section>

  <section v-if="work" class="panel">
    <h2>项目链接</h2>
    <ul class="list">
      <li>
        演示地址：
        <span v-if="work.links.demo">{{ work.links.demo }}</span>
        <span v-else>（占位）</span>
      </li>
      <li>
        仓库地址：
        <span v-if="work.links.repo">{{ work.links.repo }}</span>
        <span v-else>（占位）</span>
      </li>
    </ul>
  </section>

  <FloatingBackButton v-if="work" to="/works" label="返回作品列表" />

  <section v-else class="panel">
    <h1>作品不存在</h1>
    <RouterLink class="card-button" to="/works">返回作品列表</RouterLink>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import FloatingBackButton from "../components/FloatingBackButton.vue";
import { getWorkBySlug } from "../lib/works";

const route = useRoute();

const work = computed(() => getWorkBySlug(decodeURIComponent(String(route.params.slug || ""))));
</script>
