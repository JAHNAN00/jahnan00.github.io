import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
});

export const renderMarkdown = (content) => md.render(content || "");
