<script setup lang="ts">
import PageHero from '@/components/layout/PageHero.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import TagBadge from '@/components/ui/TagBadge.vue'
import { useMeta } from '@/composables/useMeta'
import { PATCHES, formatPatchDate } from '@/data/patches'

useMeta({
  title: 'Patch Notes',
  description:
    'Every Wildcard Arena patch, newest first: balance passes, new rollable upgrades, drafting changes and quality-of-life work.',
  path: '/patch-notes',
})

function changeCount(sections: { items: string[] }[]) {
  return sections.reduce((n, s) => n + s.items.length, 0)
}
</script>

<template>
  <PageHero
    eyebrow="Development"
    title="Patch notes"
    lede="Season 1 is actively developed. Every balance pass, new upgrade and drafting change, newest first."
  />

  <div class="container container--text">
    <ol class="patches">
      <li v-for="patch in PATCHES" :key="patch.date">
        <AppCard variant="interactive" padding="lg" as="article" class="patch">
          <RouterLink :to="`/patch-notes/${patch.date}`" class="patch__link">
            <div class="patch__head">
              <time class="eyebrow" :datetime="patch.date">{{ formatPatchDate(patch.date) }}</time>
              <TagBadge size="sm">{{ changeCount(patch.sections) }} changes</TagBadge>
            </div>
            <h2 class="patch__title">{{ patch.version ?? formatPatchDate(patch.date) }}</h2>
            <p class="patch__summary">{{ patch.summary }}</p>
            <ul class="patch__sections">
              <li v-for="section in patch.sections" :key="section.title">{{ section.title }}</li>
            </ul>
            <span class="patch__more">Read the full notes →</span>
          </RouterLink>
        </AppCard>
      </li>
    </ol>

    <p class="source">
      Patch notes are transcribed by hand from the mod's own release notes, so they may lag the live
      build slightly.
    </p>

    <AppButton to="/units" variant="ghost">Browse units →</AppButton>
  </div>
</template>

<style scoped>
.patches {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: var(--space-10) 0 var(--space-8);
  padding: 0;
  list-style: none;
}

.patch__link {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  color: inherit;
  text-decoration: none;
}

.patch__link:focus-visible {
  box-shadow: none;
}
.patch:has(.patch__link:focus-visible) {
  box-shadow: var(--focus-ring);
}

.patch__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.patch__title {
  font-size: var(--fs-2xl);
}

.patch__summary {
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.patch__sections {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: var(--space-2) 0 0;
  padding: 0;
  list-style: none;
}

.patch__sections li {
  padding: 0.2em 0.5em;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-xs);
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
}

.patch__more {
  margin-top: var(--space-2);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--c-accent);
}

.source {
  margin-bottom: var(--space-8);
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
}

.container--text {
  padding-bottom: var(--space-16);
}
</style>
