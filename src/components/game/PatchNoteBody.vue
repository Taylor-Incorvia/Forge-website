<script setup lang="ts">
import RichText from '@/components/game/RichText.vue'
import type { Patch } from '@/data/types'

/**
 * Renders one patch's sections. Kept separate from the page so the same
 * renderer serves the full patch page, the archive list and the homepage
 * "latest changes" excerpt.
 */
withDefaults(defineProps<{ patch: Patch; limitSections?: number }>(), {})
</script>

<template>
  <div class="notes">
    <section
      v-for="section in limitSections ? patch.sections.slice(0, limitSections) : patch.sections"
      :key="section.title"
      class="notes__section"
    >
      <h3 class="notes__title">{{ section.title }}</h3>
      <ul class="notes__list">
        <li v-for="(item, i) in section.items" :key="i" class="notes__item">
          <RichText :text="item" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.notes {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.notes__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.notes__title {
  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--c-border);
}

.notes__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 70ch;
}

.notes__item {
  position: relative;
  padding-left: var(--space-5);
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

/* A short accent rule instead of a bullet glyph — reads as a changelog entry. */
.notes__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 10px;
  height: 1px;
  background: var(--c-border-strong);
}
</style>
