import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import WorksPage from "../pages/WorksPage.vue";
import WorkDetailPage from "../pages/WorkDetailPage.vue";
import BlogPage from "../pages/BlogPage.vue";
import BlogDetailPage from "../pages/BlogDetailPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/works", name: "works", component: WorksPage },
    { path: "/works/:slug", name: "work-detail", component: WorkDetailPage },
    { path: "/blog", name: "blog", component: BlogPage },
    { path: "/blog/:slug", name: "blog-detail", component: BlogDetailPage },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundPage },
  ],
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
