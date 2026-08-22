<script setup lang="ts">
/**
 * Type-based lockup standing in for a real logo.
 *
 * The glyph is `<?>` — Java's unbounded wildcard, and the closest thing to a
 * literal rendering of the mod's name. Two mirrored chevrons and a question
 * mark, the whole group rotated 8 degrees so it reads as placed rather than
 * constructed. All of the imprecision is in that one rotation: the brackets are
 * mirrored about x=12 and the question mark is centred on (12,12) by
 * construction, not by nudging.
 *
 * The question mark is built from a target height (9 units) rather than scaled,
 * so its stroke stays 1.7 like everything else. Its dot radius is floored at
 * 0.9 so it never ends up thinner than the stroke it belongs to.
 *
 * Inline SVG, so it costs no request and inherits currentColor and --c-accent.
 * public/og.jpg aside, this and public/favicon.svg are the only two places the
 * glyph exists — keep them identical.
 */
withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'sm' })
</script>

<template>
  <span class="brand" :class="`brand--${size}`">
    <svg class="brand__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g transform="rotate(8 12 12)">
        <path
          d="M8.4 5 3.6 12 8.4 19"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.6 5 20.4 12 15.6 19"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.77 9.64A2.23 2.23 0 1 1 12 11.87V13.53"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="12" cy="15.69" r="0.9" fill="var(--c-accent)" />
      </g>
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
