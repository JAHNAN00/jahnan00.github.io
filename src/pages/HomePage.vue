<template>
  <section class="home-hero">
    <div class="hero-copy">
      <p class="eyebrow">PERSONAL PORTAL</p>
      <h1>
        <span>探索 · 学习 · 成长</span>
        <span class="hero-title-line">做有价值的事</span>
      </h1>
      <p>{{ profile.summary }}</p>
      <span class="hero-rule"></span>
      <div class="hero-actions">
        <RouterLink class="button-dark" to="/works">了解更多 <span>→</span></RouterLink>
      </div>
    </div>
  </section>

  <section class="profile-band section-wrap">
    <div class="profile-card panel">
      <div class="profile-intro">
        <img :src="profile.avatar" alt="站点头像" class="profile-avatar" />
        <div class="profile-copy">
          <h2>你好，我是 {{ profile.nickname }}</h2>
          <p class="profile-title">{{ profile.title }}</p>
          <p>{{ profile.summary }}</p>
          <RouterLink class="outline-button" to="/blog">关于我 <span>→</span></RouterLink>
        </div>
      </div>

      <div class="ability-list">
        <article v-for="item in abilities" :key="item.title" class="ability-item">
          <span class="line-icon" aria-hidden="true">{{ item.icon }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section-wrap featured-section">
    <div class="section-heading split-heading">
      <div>
        <h2>项目经历</h2>
      </div>
      <RouterLink class="text-link arrow-link" to="/works" aria-label="查看全部项目">
        查看全部
      </RouterLink>
    </div>

    <div class="featured-grid">
      <RouterLink
        v-for="work in featuredWorks"
        :key="work.slug"
        class="featured-work panel"
        :to="`/works/${encodeURIComponent(work.slug)}`"
        :aria-label="`查看项目：${work.title}`"
      >
        <img :src="work.cover" :alt="work.title" loading="lazy" />
        <div>
          <p class="meta">{{ work.year }}</p>
          <h3>{{ work.title }} <span>{{ work.status }}</span></h3>
          <p>{{ work.summary }}</p>
          <div class="chip-list compact">
            <span v-for="tech in work.techStack.slice(0, 3)" :key="`${work.slug}-${tech}`" class="chip">
              {{ tech }}
            </span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="section-wrap insight-section">
    <article class="quote-card">
      <span>“</span>
      <p>代码是工具，思考才是核心。<br />保持学习，保持创造。</p>
    </article>
    <a class="button-dark contact-button" :href="`mailto:${profile.contacts.email}`">联系我 <span>📧</span></a>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import profile from "../content/profile.json";
import { getAllWorks } from "../lib/works";

const abilities = [
  { icon: "</>", title: "代码编写", text: "热爱编程，追求优雅与高效" },
  { icon: "DIY", title: "硬件创客", text: "动手搭建，验证工程想法" },
  { icon: "?", title: "问题解决", text: "逻辑思考，解决实际问题" },
  { icon: "[]", title: "持续学习", text: "保持好奇，不断突破自己" },
];

const featuredWorks = getAllWorks().slice(0, 3);
</script>
