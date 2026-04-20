<template>
  <section class="home-hero">
    <article class="hero-main panel">
      <p class="eyebrow">PERSONAL PORTAL</p>
      <h1>{{ profile.nickname }}</h1>
      <p class="hero-title">{{ profile.title }}</p>
      <p class="hero-summary">{{ profile.summary }}</p>
      <div class="hero-actions">
        <RouterLink class="card-button" to="/works">查看作品</RouterLink>
        <RouterLink class="card-button" to="/blog">阅读博客</RouterLink>
      </div>
    </article>

    <aside class="hero-side">
      <section class="panel stat-card stat-card-accent">
        <p class="stat-label">当前方向</p>
        <strong>综合个人门户重构</strong>
        <span>主页、作品、博客三位一体</span>
      </section>

      <section class="panel stat-card">
        <p class="stat-label">站点气质</p>
        <strong>简约 / 工程感 / 可扩展</strong>
        <span>预留作品动画与 3D 展示空间</span>
      </section>
    </aside>
  </section>

  <section class="home-grid">
    <section class="panel intro-card home-large-card">
      <h2>关于我</h2>
      <p>
        我希望这个站点不仅是博客，也是一张可持续演进的个人名片：能展示正在做的项目，能沉淀技术文章，也能体现长期兴趣与风格。
      </p>
      <p>
        这里后续可以继续补充更具体的个人经历、方向选择、代表项目与个人表达。
      </p>
    </section>

    <section class="panel">
      <h2>技术栈</h2>
      <div class="chip-list">
        <span v-for="item in profile.techStack" :key="item" class="chip">{{ item }}</span>
      </div>
    </section>

    <section class="panel">
      <h2>兴趣方向</h2>
      <div class="chip-list">
        <span v-for="item in profile.interests" :key="item" class="chip">{{ item }}</span>
      </div>
    </section>

    <section class="panel home-timeline">
      <h2>这个网站会放什么</h2>
      <div class="timeline-item">
        <strong>首页</strong>
        <span>个人介绍、技术标签、风格化展示</span>
      </div>
      <div class="timeline-item">
        <strong>作品</strong>
        <span>卡片化项目集合，支持独立详情与后续动画扩展</span>
      </div>
      <div class="timeline-item">
        <strong>博客</strong>
        <span>保留持续输出与按标签、分类整理的内容能力</span>
      </div>
    </section>

    <section class="panel contact-panel">
      <h2>联系我</h2>
      <ul class="contact-list">
        <li>
          <strong>GitHub：</strong>
          <a :href="profile.contacts.github" target="_blank" rel="noreferrer">{{ profile.contacts.github }}</a>
        </li>
        <li>
          <strong>Email：</strong>
          <span>{{ profile.contacts.email }}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import profile from "../content/profile.json";
</script>
