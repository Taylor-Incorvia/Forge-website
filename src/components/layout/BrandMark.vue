<script setup lang="ts">
/**
 * Type-based lockup standing in for a real logo.
 *
 * A rotated square split by a short accent line — a dealt card read at small
 * size. The line deliberately stops 4.27 units short of the diamond's points at
 * each end. Running it corner to corner made the mark look constructed; leaving
 * the gap makes it look placed, and it is the only decision in the glyph.
 *
 * A <?> variant (Java's wildcard) was built and rejected: it read well large but
 * fell apart at 16px, because a question mark is three marks with a detached dot
 * and the dot is the first thing to go. See git history if you want it back.
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
        d="M12 5.8 12 18.2"
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
