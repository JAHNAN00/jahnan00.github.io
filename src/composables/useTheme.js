import { ref } from "vue";

const STORAGE_KEY = "portal-theme";
const theme = ref("system");
const THEME_ORDER = ["system", "light", "dark"];

const getSystemTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const resolveTheme = (mode) => (mode === "system" ? getSystemTheme() : mode);

const applyTheme = (mode) => {
  const actual = resolveTheme(mode);
  document.documentElement.setAttribute("data-theme", actual);
};

export const initTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  theme.value = stored === "light" || stored === "dark" ? stored : "system";
  applyTheme(theme.value);

  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (theme.value === "system") {
          applyTheme("system");
        }
      });
  }
};

export const useTheme = () => {
  const setTheme = (mode) => {
    theme.value = mode;
    if (mode === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, mode);
    }
    applyTheme(mode);
  };

  const toggleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(theme.value);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % THEME_ORDER.length;
    setTheme(THEME_ORDER[nextIndex]);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    resolveTheme,
  };
};
