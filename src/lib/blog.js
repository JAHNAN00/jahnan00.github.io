const modules = import.meta.glob("../content/blogs/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const parseScalar = (value) => {
  const trimmed = value.trim();

  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed;
};

const parseFrontMatter = (raw) => {
  if (!raw.startsWith("---\n")) {
    return { data: {}, content: raw };
  }

  const endIndex = raw.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const source = raw.slice(4, endIndex).split("\n");
  const data = {};
  let activeKey = null;

  for (const line of source) {
    if (!line.trim()) {
      continue;
    }

    const listMatch = line.match(/^\s+-\s+(.*)$/);

    if (listMatch && activeKey) {
      if (!Array.isArray(data[activeKey])) {
        data[activeKey] = [];
      }
      data[activeKey].push(parseScalar(listMatch[1]));
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!keyValueMatch) {
      activeKey = null;
      continue;
    }

    const [, key, rest] = keyValueMatch;
    activeKey = key;

    if (!rest) {
      data[key] = [];
      continue;
    }

    const inlineValue = rest.split(" #")[0];
    data[key] = parseScalar(inlineValue);
  }

  return {
    data,
    content: raw.slice(endIndex + 5).trim(),
  };
};

const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const parseDate = (date) => {
  const timestamp = new Date(date || 0).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getExcerpt = (markdown, maxLength = 120) => {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^\)]*\)/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[>*_~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength)}...`;
};

const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontMatter(raw);
    const fileName = path.split("/").pop().replace(/\.md$/, "");

    return {
      slug: fileName,
      title: data.title || fileName,
      date: data.date || "",
      timestamp: parseDate(data.date),
      tags: normalizeArray(data.tags),
      categories: normalizeArray(data.categories),
      series: normalizeArray(data.series),
      sticky: Number(data.sticky || 0),
      excerpt: getExcerpt(content),
      content,
    };
  })
  .sort((a, b) => {
    if (a.sticky !== b.sticky) {
      return b.sticky - a.sticky;
    }
    return b.timestamp - a.timestamp;
  });

export const getAllPosts = () => posts;

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug);
