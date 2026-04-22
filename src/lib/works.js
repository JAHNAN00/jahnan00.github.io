import works from "../content/works/works.json";
import { resolveWorkAssetPath } from "./contentAssets";

const detailModules = import.meta.glob("../content/works/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const customDetailModules = import.meta.glob("../content/works/custom/*.vue");

const detailContents = Object.fromEntries(
  Object.entries(detailModules).map(([path, raw]) => [path.split("/").pop().replace(/\.md$/, ""), raw]),
);

const normalizedWorks = works.map((item) => ({
  ...item,
  cover: resolveWorkAssetPath(item.cover),
  detailComponent: item.detailComponent || "",
}));

const getCustomDetailPath = (componentName) => `../content/works/custom/${componentName}.vue`;

export const getAllWorks = () => normalizedWorks;

export const getWorkBySlug = (slug) => normalizedWorks.find((item) => item.slug === slug);

export const getWorkMarkdownBySlug = (slug) => detailContents[slug] || "";

export const getWorkCustomDetailLoader = (componentName) =>
  customDetailModules[getCustomDetailPath(componentName)] || null;
