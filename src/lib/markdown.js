import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/common";

const shellLanguages = new Set(["bash", "shell", "sh", "zsh"]);

const highlightShell = (code) =>
  code
    .split("\n")
    .map((line) => {
      const escaped = md.utils.escapeHtml(line);
      const withFlags = escaped.replace(
        /(^|\s)(--?[A-Za-z][\w-]*)/g,
        '$1<span class="hljs-attribute">$2</span>',
      );
      const withCommands = withFlags.replace(
        /(^|[|;&]\s*)(sudo\s+)?([A-Za-z][\w-]*)/g,
        '$1$2<span class="hljs-title function_">$3</span>',
      );

      return withCommands.replace(
        /(\$[A-Za-z_][A-Za-z0-9_]*)/g,
        '<span class="hljs-variable">$1</span>',
      );
    })
    .join("\n");

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight(code, language) {
    const normalizedLanguage = language.trim().toLowerCase();

    if (shellLanguages.has(normalizedLanguage)) {
      return highlightShell(code);
    }

    if (normalizedLanguage && hljs.getLanguage(normalizedLanguage)) {
      return hljs.highlight(code, { language: normalizedLanguage, ignoreIllegals: true }).value;
    }

    return hljs.highlightAuto(code).value;
  },
});

const defaultFence = md.renderer.rules.fence;

md.renderer.rules.fence = (tokens, index, options, env, self) => {
  const language = tokens[index].info.trim().split(/\s+/)[0].toLowerCase();
  const rendered = defaultFence(tokens, index, options, env, self);

  return language
    ? rendered.replace("<pre>", `<pre data-language="${md.utils.escapeHtml(language)}">`)
    : rendered;
};

const replaceAssetUrls = (html, resolveAssetPath) =>
  html.replace(/(src|href)="\/([^"]+)"/g, (_, attr, assetName) => {
    const resolved = resolveAssetPath(assetName);
    return `${attr}="${resolved}"`;
  });

export const renderMarkdown = (content, resolveAssetPath = (value) => value) =>
  replaceAssetUrls(md.render(content || ""), resolveAssetPath);
