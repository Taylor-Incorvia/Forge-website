<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '@/components/layout/PageHero.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import FilterChips from '@/components/ui/FilterChips.vue'
import type { ChipOption } from '@/components/ui/types'
import UnitCard from '@/components/game/UnitCard.vue'
import { useMeta } from '@/composables/useMeta'
import { UNITS } from '@/data/units'
import { UNIT_POOLS, UPGRADES_BY_ID } from '@/data/upgrades'
import { FACILITY_ADDON, FACILITY_LABEL, RACE_LABEL } from '@/data/site'
import type { Facility, Unit } from '@/data/types'

useMeta({
  title: 'Units',
  description: `All ${UNITS.length} rollable units in Wildcard Arena, from all three races: costs, build times, what changed from ladder, and the upgrade pool each one can roll from.`,
  path: '/units',
})

const FACILITIES: Facility[] = ['barracks', 'factory', 'starport']

const query = ref('')
const facility = ref('all')
const race = ref('all')

/**
 * Search covers the fields someone would actually type: the unit's name, its
 * race, its attributes, its weapon names, and the display names of every
 * upgrade it can roll — so "blink" finds every unit that can roll Blink.
 */
function haystack(unit: Unit): string {
  const upgrades = (UNIT_POOLS[unit.id] ?? []).map((id) => UPGRADES_BY_ID.get(id)?.name ?? id)
  return [
    unit.name,
    unit.id,
    RACE_LABEL[unit.race],
    FACILITY_LABEL[unit.facility],
    ...unit.attributes,
    ...unit.weapons.map((w) => w.name),
    ...upgrades,
  ]
    .join(' ')
    .toLowerCase()
}

const searchIndex = new Map(UNITS.map((u) => [u.id, haystack(u)]))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return UNITS.filter((unit) => {
    if (facility.value !== 'all' && unit.facility !== facility.value) return false
    if (race.value !== 'all' && unit.race !== race.value) return false
    if (q && !searchIndex.get(unit.id)?.includes(q)) return false
    return true
  })
})

/** Grouped by facility then slot, so the browse view teaches the slot structure. */
const grouped = computed(() => {
  return FACILITIES.map((f) => {
    const units = filtered.value.filter((u) => u.facility === f)
    const slots = [...new Set(units.map((u) => u.slot))].sort((a, b) => a - b)
    return {
      facility: f,
      total: units.length,
      slots: slots.map((slot) => ({ slot, units: units.filter((u) => u.slot === slot) })),
    }
  }).filter((g) => g.total > 0)
})

const facilityOptions = computed<ChipOption[]>(() => [
  { value: 'all', label: 'All facilities', count: UNITS.length },
  ...FACILITIES.map((f) => ({
    value: f,
    label: FACILITY_LABEL[f],
    count: UNITS.filter((u) => u.facility === f).length,
  })),
])

const raceOptions = computed<ChipOption[]>(() => [
  { value: 'all', label: 'All races' },
  ...(['terran', 'protoss', 'zerg'] as const).map((r) => ({
    value: r,
    label: RACE_LABEL[r],
    count: UNITS.filter((u) => u.race === r).length,
  })),
])

/** The top slot of each facility is add-on gated. */
function isTopSlot(f: Facility, slot: number) {
  return slot === (f === 'barracks' ? 4 : 3)
}

const resultsLabel = computed(
  () => `${filtered.value.length} of ${UNITS.length} units match your filters`,
)
</script>

<template>
  <PageHero
    eyebrow="Reference"
    :title="`${UNITS.length} units, one faction at a time`"
    lede="Every unit that can roll into a production slot, drawn from all three races. A single game deals you ten of them."
  />

  <div class="container">
    <div class="controls">
      <SearchInput
        v-model="query"
        label="Search units"
        placeholder="Search by name, attribute, weapon or upgrade…"
        :results-label="resultsLabel"
      />
      <div class="controls__filters">
        <FilterChips v-model="facility" label="Filter by facility" :options="facilityOptions" />
        <FilterChips v-model="race" label="Filter by race" :options="raceOptions" />
      </div>
      <p class="controls__count" aria-hidden="true">
        {{ filtered.length }} <span>of {{ UNITS.length }}</span>
      </p>
    </div>

    <p v-if="!grouped.length" class="empty">
      No units match “{{ query }}”. Try a unit name, an attribute like <em>Massive</em>, or an
      upgrade like <em>Blink</em>.
    </p>

    <section v-for="group in grouped" :key="group.facility" class="facility">
      <header class="facility__head">
        <h2 class="facility__name">{{ FACILITY_LABEL[group.facility] }}</h2>
        <p class="facility__meta">
          {{ group.total }} {{ group.total === 1 ? 'unit' : 'units' }} ·
          {{ FACILITY_ADDON[group.facility] }} unlocks the top slot
        </p>
      </header>

      <div v-for="slotGroup in group.slots" :key="slotGroup.slot" class="slot-block">
        <h3 class="slot-block__title">
          <span class="eyebrow">Slot {{ slotGroup.slot }}</span>
          <span v-if="isTopSlot(group.facility, slotGroup.slot)" class="slot-block__gate">
            needs {{ FACILITY_ADDON[group.facility] }}
          </span>
        </h3>
        <div class="grid">
          <UnitCard v-for="unit in slotGroup.units" :key="unit.id" :unit="unit" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.controls {
  display: grid;
  gap: var(--space-4);
  align-items: center;
  padding-block: var(--space-8);
  grid-template-columns: 1fr;
}

.controls__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-6);
}

.controls__count {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--c-text);
  justify-self: start;
}

.controls__count span {
  color: var(--c-text-muted);
}

.facility {
  padding-bottom: var(--space-12);
}

.facility__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2) var(--space-4);
  padding-bottom: var(--space-3);
  margin-bottom: var(--space-6);
  border-bottom: 1px solid var(--c-border-strong);
}

.facility__name {
  font-size: var(--fs-2xl);
  text-transform: uppercase;
  letter-spacing: var(--ls-tight);
}

.facility__meta {
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
}

.slot-block {
  margin-bottom: var(--space-8);
}

.slot-block__title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.slot-block__gate {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--c-text-muted);
  padding: 0.15em 0.45em;
  border: 1px dashed var(--c-border-strong);
  border-radius: var(--radius-xs);
}

.grid {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17.5rem), 1fr));
}

.empty {
  padding-block: var(--space-16);
  text-align: center;
  color: var(--c-text-secondary);
}

@media (min-width: 60rem) {
  .controls {
    grid-template-columns: minmax(18rem, 24rem) 1fr auto;
  }
}
</style>
