const modules = import.meta.glob("../content/blogs/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const stripInlineComment = (value) => {
  let quote = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if ((character === '"' || character === "'") && value[index - 1] !== "\\") {
      quote = quote === character ? "" : quote || character;
    }

    if (!quote && character === "#" && (index === 0 || /\s/.test(value[index - 1]))) {
      return value.slice(0, index).trimEnd();
    }
  }

  return value.trimEnd();
};

const parseScalar = (value) => {
  const trimmed = stripInlineComment(value.trim());

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const items = trimmed.slice(1, -1).trim();
    return items ? items.split(",").map((item) => parseScalar(item)) : [];
  }

  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed;
};

const parseFrontMatter = (raw) => {
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const match = normalized.match(/^---[\t ]*\n([\s\S]*?)\n---[\t ]*(?:\n|$)/);

  if (!match) return { data: {}, content: normalized };

  const source = match[1].split("\n");
  const data = {};
  let activeKey = null;

  for (const line of source) {
    if (!line.trim()) {
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/);

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

    if (!rest || !stripInlineComment(rest).trim()) {
      data[key] = [];
      continue;
    }

    data[key] = parseScalar(rest);
  }

  return {
    data,
    content: normalized.slice(match[0].length).trim(),
  };
};

const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const parseDate = (date) => {
  const normalized = String(date || "").replace(/\//g, "-");
  const timestamp = new Date(normalized || 0).getTime();
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
  .filter(([path]) => !path.endsWith("/template.md"))
  .map(([path, raw]) => {
    const { data, content } = parseFrontMatter(raw);
    const slug = path.replace("../content/blogs/", "").replace(/\.md$/, "");
    const fileName = slug.split("/").pop();

    return {
      slug,
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
