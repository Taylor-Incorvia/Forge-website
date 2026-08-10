<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '@/components/layout/PageHero.vue'
import AppCard from '@/components/ui/AppCard.vue'
import TagBadge from '@/components/ui/TagBadge.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import FilterChips from '@/components/ui/FilterChips.vue'
import type { ChipOption } from '@/components/ui/types'
import { useMeta } from '@/composables/useMeta'
import { UPGRADE_GROUPS, UPGRADE_CATEGORY_LABEL } from '@/data/upgrades'
import { UNITS_BY_ID } from '@/data/units'
import type { UpgradeCategory } from '@/data/types'

useMeta({
  title: 'Upgrade Pools',
  description:
    'Every rollable upgrade in Wildcard Arena, which units can roll it, and how many of your units may take it in one game. Each unit has its own pool, decided by what kind of unit it is rather than its race.',
  path: '/upgrades',
})

const query = ref('')
const category = ref('all')

const CATEGORIES = [
  'mobility',
  'range',
  'combat',
  'caster',
  'defense',
  'stealth',
  'utility',
] as const satisfies readonly UpgradeCategory[]

const searchIndex = new Map(
  UPGRADE_GROUPS.map((g) => [
    g.key,
    [
      g.upgrade.name,
      ...g.ids,
      UPGRADE_CATEGORY_LABEL[g.upgrade.category],
      g.upgrade.description ?? '',
      ...g.unitIds.map((id) => UNITS_BY_ID.get(id)?.name ?? id),
    ]
      .join(' ')
      .toLowerCase(),
  ]),
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return UPGRADE_GROUPS.filter((g) => {
    if (category.value !== 'all' && g.upgrade.category !== category.value) return false
    if (q && !searchIndex.get(g.key)?.includes(q)) return false
    return true
  })
})

const categoryOptions = computed<ChipOption[]>(() => [
  { value: 'all', label: 'All', count: UPGRADE_GROUPS.length },
  ...CATEGORIES.map((c) => ({
    value: c,
    label: UPGRADE_CATEGORY_LABEL[c],
    count: UPGRADE_GROUPS.filter((g) => g.upgrade.category === c).length,
  })).filter((o) => o.count > 0),
])

function unitName(id: string) {
  return UNITS_BY_ID.get(id)?.name ?? id
}

const resultsLabel = computed(
  () => `${filtered.value.length} of ${UPGRADE_GROUPS.length} upgrades match your filters`,
)
</script>

<template>
  <PageHero
    eyebrow="Reference"
    title="Upgrade pools"
    lede="Every unit rolls exactly one upgrade, drawn from its upgrade pool. The upgrade pools are intentionally curated to prevent both useless rolls and oppressive upgrades."
  />

  <div class="container">
    <AppCard padding="md" class="rules">
      <h2 class="rules__title">How rolling works</h2>
      <ul class="rules__list">
        <li>
          <strong>One upgrade per unit.</strong> Research locks the moment you start it, so a unit
          cannot take a second.
        </li>
        <li>
          <strong>Useless rolls are curated out.</strong> Corrosive Bile on a Battlecruiser would do
          nothing worth the research, so it is not in that pool.
        </li>
        <li>
          <strong>So are oppressive ones.</strong> A Tempest with movement speed already outranges
          everything and could kite forever, so it cannot roll it.
        </li>
        <li>
          <strong>The roller limits repeats.</strong> You will not end up with the same upgrade
          spread across your whole army. The draft keeps variety in every game.
        </li>
        <li>
          <strong>They are not all the versions you know.</strong> Several upgrades do more here
          than their StarCraft II counterparts.
        </li>
        <li>
          <strong>Caster spells add energy regeneration.</strong> Researching one gives that unit
          +25% for the rest of the game.
        </li>
        <li>
          <strong>Research happens at the tech buildings.</strong> Barracks units at the Ghost
          Academy, Factory units at the Armory, Starport units at the Fusion Core.
        </li>
      </ul>
    </AppCard>

    <div class="controls">
      <SearchInput
        v-model="query"
        label="Search upgrades"
        placeholder="Search by upgrade or unit…"
        :results-label="resultsLabel"
      />
      <FilterChips v-model="category" label="Filter by category" :options="categoryOptions" />
    </div>

    <p v-if="!filtered.length" class="empty">
      No upgrades match “{{ query }}”. Try an upgrade name, a unit name, or an internal id.
    </p>

    <ul class="ulist">
      <li v-for="group in filtered" :key="group.key" :id="group.key" class="urow">
        <AppCard padding="md" as="article" class="urow__card">
          <header class="urow__head">
            <h2 class="urow__name">{{ group.upgrade.name }}</h2>
            <TagBadge size="sm">{{ UPGRADE_CATEGORY_LABEL[group.upgrade.category] }}</TagBadge>
          </header>

          <p v-if="group.upgrade.description" class="urow__desc">
            {{ group.upgrade.description }}
          </p>

          <div class="urow__units">
            <h3 class="eyebrow">
              Can be rolled on {{ group.unitIds.length }}
              {{ group.unitIds.length === 1 ? 'unit' : 'units' }}
            </h3>
            <ul class="chips">
              <li v-for="id in group.unitIds" :key="id">
                <RouterLink class="chip" :to="`/units/${id}`">{{ unitName(id) }}</RouterLink>
              </li>
            </ul>
            <p v-if="!group.unitIds.length" class="urow__none">Not currently in any unit's pool.</p>
          </div>
        </AppCard>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.rules {
  margin-top: var(--space-8);
}

.rules__title {
  font-size: var(--fs-lg);
  padding-bottom: var(--space-3);
  margin-bottom: var(--space-4);
  border-bottom: 1px solid var(--c-border);
}

.rules__list {
  display: grid;
  gap: var(--space-3) var(--space-8);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  margin: 0;
  padding-left: var(--space-5);
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.rules__list strong {
  color: var(--c-text);
  font-weight: var(--fw-semibold);
}

.rules__list::marker {
  color: var(--c-text-muted);
}

.controls {
  display: grid;
  gap: var(--space-4);
  align-items: center;
  padding-block: var(--space-8);
  grid-template-columns: 1fr;
}

.ulist {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 24rem), 1fr));
  margin: 0 0 var(--space-16);
  padding: 0;
  list-style: none;
}

.urow {
  display: flex;
  /* Keeps the anchor target clear of the sticky header on deep links. */
  scroll-margin-top: calc(var(--header-h) + var(--space-6));
}

.urow__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
}

.urow:target .urow__card {
  border-color: var(--c-border-accent);
}

.urow__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.urow__name {
  font-size: var(--fs-lg);
  margin-right: auto;
}

.urow__desc {
  color: var(--c-text-secondary);
  font-size: var(--fs-md);
  line-height: var(--lh-relaxed);
}

.urow__units {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: auto;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.chip {
  display: inline-block;
  padding: 0.2em 0.5em;
  background: var(--c-surface-2);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-xs);
  color: var(--c-text-secondary);
  font-size: var(--fs-sm);
  text-decoration: none;
}

.chip:hover {
  border-color: var(--c-border-accent);
  color: var(--c-accent-hover);
}

.urow__none {
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
}

.empty {
  padding-block: var(--space-16);
  text-align: center;
  color: var(--c-text-secondary);
}

@media (min-width: 60rem) {
  .controls {
    grid-template-columns: minmax(18rem, 24rem) 1fr;
  }
}
</style>
