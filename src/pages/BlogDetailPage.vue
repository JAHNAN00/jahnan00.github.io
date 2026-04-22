<template>
  <article v-if="post" class="panel article-page">
    <p class="meta">{{ post.date || "未设置日期" }}</p>
    <h1>{{ post.title }}</h1>

    <div class="meta-group">
      <span v-for="tag in post.tags" :key="`tag-${tag}`" class="chip">#{{ tag }}</span>
      <span v-for="category in post.categories" :key="`category-${category}`" class="chip">
        {{ category }}
      </span>
    </div>

    <div class="markdown-body" v-html="rendered"></div>
  </article>

  <FloatingBackButton v-if="post" to="/blog" label="返回博客列表" />

  <section v-else class="panel">
    <h1>文章不存在</h1>
    <RouterLink class="card-button" to="/blog">返回博客列表</RouterLink>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import FloatingBackButton from "../components/FloatingBackButton.vue";
import { resolveBlogAssetPath } from "../lib/contentAssets";
import { getPostBySlug } from "../lib/blog";
import { renderMarkdown } from "../lib/markdown";

const route = useRoute();

const post = computed(() => getPostBySlug(decodeURIComponent(String(route.params.slug || ""))));
const rendered = computed(() =>
  post.value ? renderMarkdown(post.value.content, resolveBlogAssetPath) : "",
);
</script>
