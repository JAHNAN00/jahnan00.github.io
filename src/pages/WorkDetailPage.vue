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

  <component
    :is="customDetailComponent"
    v-if="work && customDetailComponent"
    :work="work"
  />

  <section v-else-if="work && rendered" class="panel article-page">
    <div class="markdown-body" v-html="rendered"></div>
  </section>

  <section v-if="work && hasLinks" class="panel">
    <h2>项目链接</h2>
    <ul class="list">
      <li v-if="work.links.demo">
        演示地址：
        <a :href="work.links.demo" target="_blank" rel="noreferrer">{{ work.links.demo }}</a>
      </li>
      <li v-if="work.links.repo">
        仓库地址：
        <a :href="work.links.repo" target="_blank" rel="noreferrer">{{ work.links.repo }}</a>
      </li>
    </ul>
  </section>

  <section v-if="work && !customDetailComponent && !rendered" class="panel">
    <h2>详情待补充</h2>
    <p>
      请在 <code>src/content/works/{{ work.slug }}.md</code> 中补充作品正文，或为该作品配置自定义详情组件。
    </p>
  </section>

  <FloatingBackButton v-if="work" to="/works" label="返回作品列表" />

  <section v-else class="panel">
    <h1>作品不存在</h1>
    <RouterLink class="card-button" to="/works">返回作品列表</RouterLink>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent, shallowRef, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import FloatingBackButton from "../components/FloatingBackButton.vue";
import { resolveWorkAssetPath } from "../lib/contentAssets";
import { renderMarkdown } from "../lib/markdown";
import {
  getWorkBySlug,
  getWorkCustomDetailLoader,
  getWorkMarkdownBySlug,
} from "../lib/works";

const route = useRoute();

const work = computed(() => getWorkBySlug(decodeURIComponent(String(route.params.slug || ""))));

const rendered = computed(() => {
  if (!work.value) {
    return "";
  }

  const markdown = getWorkMarkdownBySlug(work.value.slug);
  return markdown ? renderMarkdown(markdown, resolveWorkAssetPath) : "";
});

const hasLinks = computed(() => Boolean(work.value?.links?.demo || work.value?.links?.repo));

const customDetailComponent = shallowRef(null);

watchEffect(() => {
  const componentName = work.value?.detailComponent;

  if (!componentName) {
    customDetailComponent.value = null;
    return;
  }

  const loader = getWorkCustomDetailLoader(componentName);
  customDetailComponent.value = loader ? defineAsyncComponent(loader) : null;
});
</script>
