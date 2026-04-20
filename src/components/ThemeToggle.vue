<template>
  <button
    class="theme-switch"
    type="button"
    :aria-label="`当前为${currentLabel}模式，点击切换`"
    :title="`当前为${currentLabel}模式，点击切换`"
    @click="toggleTheme"
  >
    <span class="theme-switch-label">{{ currentLabel }}</span>
    <span class="theme-switch-track" :data-dark="isDark">
      <span class="theme-switch-thumb">
        <span class="theme-switch-icon sun"></span>
        <span class="theme-switch-icon moon"></span>
      </span>
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "../composables/useTheme";

const { theme, toggleTheme, resolveTheme } = useTheme();

const label = computed(() => {
  const active = resolveTheme(theme.value);
  return active === "dark" ? "浅色" : "深色";
});

const isDark = computed(() => resolveTheme(theme.value) === "dark");
const currentLabel = computed(() => (isDark.value ? "深色" : "浅色"));
</script>
