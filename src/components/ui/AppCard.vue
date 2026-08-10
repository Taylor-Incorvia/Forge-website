<script setup lang="ts">
/**
 * The base surface. Everything boxed on this site is an AppCard, so raising
 * elevation or changing the hairline is a one-file edit.
 */
withDefaults(
  defineProps<{
    /** `interactive` adds hover affordance — use only when the whole card is a link. */
    variant?: 'default' | 'interactive' | 'quiet'
    padding?: 'none' | 'sm' | 'md' | 'lg'
    as?: string
  }>(),
  { variant: 'default', padding: 'md', as: 'div' },
)
</script>

<template>
  <component :is="as" class="card" :class="[`card--${variant}`, `card--pad-${padding}`]">
    <slot />
  </component>
</template>

<style scoped>
.card {
  position: relative;
  background: var(--c-surface-1);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  box-shadow: var(--elev-inset);
}

.card--quiet {
  background: transparent;
}

.card--interactive {
  transition:
    border-color var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.card--interactive:hover,
.card--interactive:focus-within {
  background: var(--c-surface-2);
  border-color: var(--c-border-strong);
  transform: translateY(-2px);
}

.card--pad-none {
  padding: 0;
}
.card--pad-sm {
  padding: var(--space-3);
}
.card--pad-md {
  padding: var(--space-5);
}
.card--pad-lg {
  padding: var(--space-6) var(--space-6) var(--space-8);
}
</style>
