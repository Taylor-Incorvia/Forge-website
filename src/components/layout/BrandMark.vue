<script setup lang="ts">
/**
 * Type-based lockup standing in for a real logo.
 *
 * A rotated square holding an accent stem and a detached dot. Chosen over the
 * earlier line-only mark, which is still in git history.
 *
 * The detached dot is the known weak point, and it is a deliberate trade. At a
 * true 16px the dot merges into the stem and the glyph collapses back to the
 * old line-in-a-diamond; measured on a size ladder before shipping. That was
 * judged acceptable because it degrades to the previous mark rather than to
 * mush, and because a hiDPI tab renders the favicon at 32 device px, where the
 * dot separates cleanly. The dot radius is 1.6 rather than a typographically
 * lighter 1.35 for exactly this reason: 1.35 was mushy at 32px, and 1.85 read
 * as chunky at 512px.
 *
 * Inline SVG, so it costs no request and inherits currentColor and --c-accent.
 * Keep this and public/favicon.svg identical.
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
        d="M12 5.6 12 14.3"
        stroke="var(--c-accent)"
        stroke-width="1.7"
        stroke-linecap="round"
      />
      <circle cx="12" cy="17.7" r="1.6" fill="var(--c-accent)" />
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
