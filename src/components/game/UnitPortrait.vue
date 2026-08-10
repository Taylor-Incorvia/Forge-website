<script setup lang="ts">
import { computed } from 'vue'
import type { Unit } from '@/data/types'

/**
 * Portrait slot for a unit.
 *
 * Reserves a fixed square regardless of whether artwork exists, so adding
 * `image` to a unit later never reflows the grid. Until then it renders a
 * race-tinted monogram — quiet, consistent, and obviously a placeholder
 * rather than pretending to be art.
 */
const props = withDefaults(defineProps<{ unit: Unit; size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })

/** Initials from the display name: "High Templar" -> "HT", "Marine" -> "MA". */
const monogram = computed(() => {
  const words = props.unit.name.split(' ').filter(Boolean)
  if (words.length > 1)
    return words
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
  return props.unit.name.slice(0, 2)
})
</script>

<template>
  <div class="portrait" :class="[`portrait--${size}`, `portrait--${unit.race}`]">
    <img
      v-if="unit.image"
      class="portrait__img"
      :src="unit.image"
      :alt="`${unit.name} portrait`"
      loading="lazy"
      decoding="async"
      width="96"
      height="96"
    />
    <span v-else class="portrait__mono" aria-hidden="true">{{ monogram.toUpperCase() }}</span>
  </div>
</template>

<style scoped>
.portrait {
  --tint: var(--c-terran);
  --wash: var(--c-terran-wash);

  flex: none;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--wash);
  border: 1px solid color-mix(in srgb, var(--tint) 32%, transparent);
  border-radius: var(--radius-sm);
}

.portrait--protoss {
  --tint: var(--c-protoss);
  --wash: var(--c-protoss-wash);
}
.portrait--zerg {
  --tint: var(--c-zerg);
  --wash: var(--c-zerg-wash);
}

.portrait--sm {
  width: 2.25rem;
}
.portrait--md {
  width: 3rem;
}
.portrait--lg {
  width: 5rem;
}

.portrait__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portrait__mono {
  font-family: var(--font-display);
  font-size: 0.8em;
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
  color: var(--tint);
  opacity: 0.85;
}

.portrait--lg .portrait__mono {
  font-size: 1.5rem;
}
</style>
