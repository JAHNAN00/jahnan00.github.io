const blogAssetModules = import.meta.glob("../content/blogs/asset/*", {
  eager: true,
  import: "default",
});

const workAssetModules = import.meta.glob("../content/works/asset/*", {
  eager: true,
  import: "default",
});

const buildAssetMap = (modules) =>
  Object.fromEntries(
    Object.entries(modules).map(([path, assetUrl]) => [path.split("/").pop(), assetUrl]),
  );

const blogAssetMap = buildAssetMap(blogAssetModules);
const workAssetMap = buildAssetMap(workAssetModules);

const normalizeAssetPath = (value) => String(value || "").replace(/^\//, "");

export const resolveBlogAssetPath = (value) => {
  const normalized = normalizeAssetPath(value);
  return blogAssetMap[normalized] || value;
};

export const resolveWorkAssetPath = (value) => {
  const normalized = normalizeAssetPath(value);
  return workAssetMap[normalized] || value;
};
