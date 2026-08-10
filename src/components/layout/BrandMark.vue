<script setup lang="ts">
/**
 * Type-based lockup standing in for a real logo.
 *
 * The glyph is a rotated square split diagonally — a dealt card read at small
 * size. It is inline SVG so it costs no request and inherits currentColor.
 * When a real logo exists, replace only this component.
 */
withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'sm' })
</script>

<template>
  <span class="brand" :class="`brand--${size}`">
    <svg class="brand__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="4.6"
        y="4.6"
        width="14.8"
        height="14.8"
        rx="1.6"
        transform="rotate(45 12 12)"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
      />
      <path
        d="M12 2.6 12 21.4"
        stroke="var(--c-accent)"
        stroke-width="1.7"
        stroke-linecap="round"
      />
    </svg>
    <span class="brand__text">
      <span class="brand__word">Wildcard</span>
      <span class="brand__word brand__word--alt">Arena</span>
    </span>
  </span>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}

.brand__glyph {
  flex: none;
  width: 1.5rem;
  height: 1.5rem;
}

.brand--md .brand__glyph {
  width: 2rem;
  height: 2rem;
}

.brand__text {
  display: flex;
  gap: 0.32em;
  font-family: var(--font-display);
  font-size: var(--fs-base);
  font-weight: var(--fw-black);
  letter-spacing: var(--ls-tight);
  text-transform: uppercase;
  line-height: 1;
}

.brand--md .brand__text {
  font-size: var(--fs-xl);
}

.brand__word--alt {
  font-weight: var(--fw-regular);
  color: var(--c-text-secondary);
}
</style>
