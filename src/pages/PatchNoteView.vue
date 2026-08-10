<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import PatchNoteBody from '@/components/game/PatchNoteBody.vue'
import { useMeta } from '@/composables/useMeta'
import { PATCHES, PATCHES_BY_DATE, formatPatchDate } from '@/data/patches'

const route = useRoute()
const date = computed(() => String(route.params.date))
const patch = computed(() => PATCHES_BY_DATE.get(date.value))

const index = computed(() => PATCHES.findIndex((p) => p.date === date.value))
const newer = computed(() => (index.value > 0 ? PATCHES[index.value - 1] : undefined))
const older = computed(() =>
  index.value >= 0 && index.value < PATCHES.length - 1 ? PATCHES[index.value + 1] : undefined,
)

useMeta({
  title: computed(
    () =>
      patch.value?.version ?? (patch.value ? formatPatchDate(patch.value.date) : 'Patch not found'),
  ).value,
  description: computed(() => patch.value?.summary ?? 'This patch does not exist.').value,
  path: `/patch-notes/${date.value}`,
  index: Boolean(patch.value),
})
</script>

<template>
  <template v-if="patch">
    <header class="phero">
      <div class="container container--text">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink to="/patch-notes">Patch notes</RouterLink>
          <span aria-hidden="true">/</span>
          <time :datetime="patch.date">{{ formatPatchDate(patch.date) }}</time>
        </nav>
        <h1 class="phero__title">{{ patch.version ?? formatPatchDate(patch.date) }}</h1>
        <p class="lede phero__summary">{{ patch.summary }}</p>
      </div>
    </header>

    <div class="container container--text pbody">
      <PatchNoteBody :patch="patch" />

      <nav class="pnav" aria-label="Patch navigation">
        <AppButton v-if="older" :to="`/patch-notes/${older.date}`" variant="secondary" size="sm">
          ← {{ older.version ?? formatPatchDate(older.date) }}
        </AppButton>
        <span v-else />
        <AppButton v-if="newer" :to="`/patch-notes/${newer.date}`" variant="secondary" size="sm">
          {{ newer.version ?? formatPatchDate(newer.date) }} →
        </AppButton>
      </nav>
    </div>
  </template>

  <div v-else class="container missing">
    <h1>Patch not found</h1>
    <p class="lede">There’s no patch dated “{{ date }}”.</p>
    <AppButton to="/patch-notes">All patch notes</AppButton>
  </div>
</template>

<style scoped>
.phero {
  padding-block: var(--space-8) var(--space-10);
  border-bottom: 1px solid var(--c-border);
  background: linear-gradient(180deg, var(--c-surface-1), var(--c-bg));
}

.crumbs {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.crumbs a {
  color: var(--c-text-muted);
  text-decoration: none;
}
.crumbs a:hover {
  color: var(--c-accent);
}

.phero__title {
  font-size: var(--fs-3xl);
}

.phero__summary {
  margin-top: var(--space-4);
}

.pbody {
  padding-block: var(--space-10) var(--space-16);
}

.pnav {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--c-border);
}

.missing {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: var(--space-24);
}
</style>
