<template>
  <section class="home-hero">
    <article class="hero-main panel">
      <div class="hero-main-top">
        <img :src="profile.avatar" alt="站点头像" class="hero-avatar" />
        <div>
          <p class="eyebrow">PERSONAL PORTAL</p>
          <h1>{{ profile.nickname }}</h1>
          <p class="hero-title">{{ profile.title }}</p>
          <p class="hero-summary">{{ profile.summary }}</p>
          <div class="hero-actions">
            <RouterLink class="card-button" to="/works">查看作品</RouterLink>
            <RouterLink class="card-button" to="/blog">阅读博客</RouterLink>
          </div>
        </div>
      </div>

      <div class="hero-fact-list">
        <div v-for="fact in profile.facts" :key="fact.label" class="hero-fact-item">
          <span>{{ fact.label }}</span>
          <strong>{{ fact.value }}</strong>
        </div>
      </div>
    </article>

    <aside class="hero-side">
      <section class="panel stat-card stat-card-accent">
        <p class="stat-label">当前方向</p>
        <strong>机器人与嵌入式系统</strong>
        <span>主要在做电控、机构和一些相关开发工作</span>
      </section>

      <section class="panel stat-card">
        <p class="stat-label">近期关键词</p>
        <strong>自动化测试 / 竞赛项目 / 技术沉淀</strong>
        <span>把项目经历、实习见闻和博客记录整理在同一个站点里</span>
      </section>
    </aside>
  </section>

  <section class="home-grid">
    <section class="panel intro-card home-large-card">
      <h2>关于我</h2>
      <p>
        目前处在硕士阶段，平时主要接触机器人、嵌入式开发和自动化测试相关内容，也会把做过的项目和学习记录慢慢整理下来。
      </p>
      <p>
        这个站点主要用来集中展示项目、竞赛经历、技术博客和阶段性总结，既方便整理，也方便了解最近在做什么。
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
      <h2>学习阶段</h2>
      <div v-for="item in profile.education" :key="item" class="timeline-item">
        <span>{{ item }}</span>
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

    <section class="panel home-large-card">
      <h2>经历速览</h2>
      <div class="timeline-item" v-for="item in profile.experience" :key="item">
        <span>{{ item }}</span>
      </div>
    </section>

    <section class="panel home-large-card">
      <h2>竞赛与获奖</h2>
      <div class="chip-list">
        <span v-for="item in profile.achievements" :key="item" class="chip">{{ item }}</span>
      </div>
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import profile from "../content/profile.json";
</script>
