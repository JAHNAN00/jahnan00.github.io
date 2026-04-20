<template>
  <section class="page-head">
    <p class="eyebrow">BLOG</p>
    <div class="page-head-inline">
      <h1>博客</h1>
      <p>保留原有按标签/分类整理的思路，并提供快速筛选。</p>
    </div>
  </section>

  <section class="panel search-panel">
    <form class="search-form" @submit.prevent>
      <div class="search-bar-wrap">
        <span class="search-icon" aria-hidden="true"></span>
        <div class="search-input-wrap">
        <input v-model.trim="draftKeyword" type="search" placeholder="搜索标题或摘要" />
        </div>
      </div>
    </form>
  </section>

  <section class="panel filter-panel filter-panel-soft">
    <details class="collapsible-filter-bar">
      <summary>
        <span class="filter-bar-main">按标签和分类筛选</span>
      </summary>

      <div class="filter-expanded-content">
        <div class="filter-block">
          <p class="filter-title">标签</p>
          <div class="soft-chip-list">
            <button
              class="soft-chip"
              :class="{ active: !activeTag }"
              type="button"
              @click="activeTag = ''"
            >
              全部
            </button>
            <button
              v-for="tag in tagOptions"
              :key="tag"
              class="soft-chip"
              :class="{ active: activeTag === tag }"
              type="button"
              @click="activeTag = tag"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <div class="filter-block">
          <p class="filter-title">分类</p>
          <div class="soft-chip-list">
            <button
              class="soft-chip"
              :class="{ active: !activeCategory }"
              type="button"
              @click="activeCategory = ''"
            >
              全部
            </button>
            <button
              v-for="category in categoryOptions"
              :key="category"
              class="soft-chip"
              :class="{ active: activeCategory === category }"
              type="button"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </details>
  </section>

  <section class="blog-list">
    <article v-for="post in filteredPosts" :key="post.slug" class="panel blog-card">
      <RouterLink
        class="blog-card-link"
        :to="`/blog/${encodeURIComponent(post.slug)}`"
        :aria-label="`查看文章：${post.title}`"
      />
      <div class="blog-card-top">
        <p class="meta">{{ formatDate(post.date) }}</p>
        <span v-if="post.sticky" class="sticky-badge" aria-label="置顶文章">
          <span class="pin-icon" aria-hidden="true"></span>
          置顶
        </span>
      </div>
      <h2>
        <span class="blog-title-text">{{ post.title }}</span>
      </h2>
      <p>{{ post.excerpt }}</p>
      <div class="meta-group">
        <span v-for="tag in post.tags" :key="`${post.slug}-${tag}`" class="chip">#{{ tag }}</span>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { getAllPosts } from "../lib/blog";

const posts = getAllPosts();

const activeTag = ref("");
const activeCategory = ref("");
const draftKeyword = ref("");
const keyword = ref("");

const tagOptions = [...new Set(posts.flatMap((post) => post.tags))].sort();
const categoryOptions = [...new Set(posts.flatMap((post) => post.categories))].sort();

watch(draftKeyword, (value) => {
  keyword.value = value;
});

const filteredPosts = computed(() =>
  posts.filter((post) => {
    if (activeTag.value && !post.tags.includes(activeTag.value)) {
      return false;
    }
    if (activeCategory.value && !post.categories.includes(activeCategory.value)) {
      return false;
    }
    if (keyword.value) {
      const needle = keyword.value.toLowerCase();
      return (
        post.title.toLowerCase().includes(needle) || post.excerpt.toLowerCase().includes(needle)
      );
    }
    return true;
  }),
);

const formatDate = (value) => (value ? value.toString().slice(0, 10) : "未设置日期");
</script>
