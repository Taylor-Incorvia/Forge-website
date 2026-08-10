<script setup lang="ts">
/**
 * Small metadata pill. `tone` maps to a semantic color, never a raw hex.
 * Race tones are for unit data only — never for branding.
 */
withDefaults(
  defineProps<{
    tone?: 'neutral' | 'accent' | 'terran' | 'protoss' | 'zerg' | 'warning'
    size?: 'sm' | 'md'
    mono?: boolean
  }>(),
  { tone: 'neutral', size: 'md', mono: false },
)
</script>

<template>
  <span class="badge" :class="[`badge--${tone}`, `badge--${size}`, { 'badge--mono': mono }]">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.2em 0.55em;
  border: 1px solid var(--badge-border, var(--c-border-strong));
  border-radius: var(--radius-xs);
  background: var(--badge-bg, var(--c-surface-2));
  color: var(--badge-fg, var(--c-text-secondary));
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  line-height: 1.35;
  white-space: nowrap;
}

.badge--sm {
  font-size: var(--fs-2xs);
}

.badge--mono {
  font-family: var(--font-mono);
  letter-spacing: var(--ls-wide);
}

.badge--accent {
  --badge-bg: var(--c-accent-wash);
  --badge-border: var(--c-border-accent);
  --badge-fg: var(--c-accent-hover);
}
.badge--terran {
  --badge-bg: var(--c-terran-wash);
  --badge-border: color-mix(in srgb, var(--c-terran) 42%, transparent);
  --badge-fg: var(--c-terran);
}
.badge--protoss {
  --badge-bg: var(--c-protoss-wash);
  --badge-border: color-mix(in srgb, var(--c-protoss) 42%, transparent);
  --badge-fg: var(--c-protoss);
}
.badge--zerg {
  --badge-bg: var(--c-zerg-wash);
  --badge-border: color-mix(in srgb, var(--c-zerg) 42%, transparent);
  --badge-fg: var(--c-zerg);
}
.badge--warning {
  --badge-bg: color-mix(in srgb, var(--c-warning) 12%, transparent);
  --badge-border: color-mix(in srgb, var(--c-warning) 40%, transparent);
  --badge-fg: var(--c-warning);
}
</style>
