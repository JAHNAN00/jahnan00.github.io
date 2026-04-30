<template>
  <div
    class="theme-switch"
    role="group"
    :aria-label="`主题模式，当前为${currentLabel}`"
    :title="`当前为${currentLabel}`"
  >
    <span class="theme-switch-label">{{ currentLabel }}</span>
    <span class="theme-switch-track" :data-mode="theme">
      <span class="theme-switch-thumb"></span>
      <button
        v-for="option in themeOptions"
        :key="option.value"
        class="theme-switch-option"
        type="button"
        :aria-pressed="theme === option.value"
        :aria-label="option.ariaLabel"
        @click="setTheme(option.value)"
      >
        <span :class="['theme-switch-icon', option.value]" aria-hidden="true">
          <svg v-if="option.value === 'light'" viewBox="0 0 24 24" focusable="false">
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 3v2.5M12 18.5V21M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M3 12h2.5M18.5 12H21M5.2 18.8l1.6-1.6M17.2 6.8l1.6-1.6"></path>
          </svg>
        </span>
      </button>
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "../composables/useTheme";

const { theme, setTheme, resolveTheme } = useTheme();

const themeOptions = [
  { value: "light", ariaLabel: "切换为浅色模式" },
  { value: "system", ariaLabel: "跟随系统深浅色" },
  { value: "dark", ariaLabel: "切换为深色模式" },
];

const isDark = computed(() => resolveTheme(theme.value) === "dark");
const currentLabel = computed(() => {
  if (theme.value === "light") return "浅色";
  if (theme.value === "dark") return "深色";
  return "系统";
});
</script>
