<template>
  <section class="panel featured-work-demo">
    <div class="featured-work-demo__hero">
      <div>
        <p class="eyebrow">CUSTOM DETAIL DEMO</p>
        <h2>{{ work.title }}</h2>
        <p class="featured-work-demo__lead">
          这是一个作品自定义详情组件示例。适合用于你想单独排版、插入时间线、对比卡片、视频占位、交互演示等场景。
        </p>
      </div>

      <img :src="work.cover" :alt="work.title" class="featured-work-demo__cover" />
    </div>

    <div class="featured-work-demo__grid">
      <section class="featured-work-demo__card">
        <h3>适合什么时候用</h3>
        <ul class="list">
          <li>想做比 Markdown 更强的版式控制</li>
          <li>需要插入图表、流程块、时间线或交互组件</li>
          <li>想把某个重点项目做成更像专题页的展示</li>
        </ul>
      </section>

      <section class="featured-work-demo__card">
        <h3>当前作品元数据</h3>
        <ul class="list">
          <li>状态：{{ work.status }}</li>
          <li>年份：{{ work.year }}</li>
          <li>技术栈数量：{{ work.techStack.length }}</li>
        </ul>
      </section>
    </div>

    <section class="featured-work-demo__card">
      <h3>如何启用</h3>
      <pre><code>{
  "slug": "your-work-slug",
  "title": "你的作品名",
  "detailComponent": "FeaturedWorkExample"
}</code></pre>
      <p class="featured-work-demo__hint">
        只要在 <code>src/content/works/works.json</code> 对应作品项里加上
        <code>detailComponent</code>，详情页就会优先渲染这个组件，而不是默认的 Markdown。
      </p>
    </section>
  </section>
</template>

<script setup>
defineProps({
  work: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.featured-work-demo {
  display: grid;
  gap: 18px;
}

.featured-work-demo__hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(220px, 0.9fr);
  gap: 18px;
  align-items: center;
}

.featured-work-demo__lead {
  color: var(--text-soft);
}

.featured-work-demo__cover {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: color-mix(in oklab, var(--accent) 8%, var(--bg-strong));
}

.featured-work-demo__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.featured-work-demo__card {
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px;
  background: color-mix(in oklab, var(--bg-strong) 94%, transparent);
}

.featured-work-demo__hint {
  color: var(--text-soft);
  margin-bottom: 0;
}

@media (max-width: 720px) {
  .featured-work-demo__hero,
  .featured-work-demo__grid {
    grid-template-columns: 1fr;
  }
}
</style>
