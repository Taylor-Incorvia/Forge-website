<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import TagBadge from '@/components/ui/TagBadge.vue'
import UnitPortrait from '@/components/game/UnitPortrait.vue'
import UpgradeBadge from '@/components/game/UpgradeBadge.vue'
import { useMeta } from '@/composables/useMeta'
import { UNITS_BY_ID, formatBuildTime } from '@/data/units'
import { UNIT_POOLS } from '@/data/upgrades'
import { FACILITY_ADDON, FACILITY_LABEL, RACE_LABEL } from '@/data/site'

const route = useRoute()
const unit = computed(() => UNITS_BY_ID.get(String(route.params.id)))

const pool = computed(() => (unit.value ? (UNIT_POOLS[unit.value.id] ?? []) : []))

const isTopSlot = computed(
  () => unit.value && unit.value.slot === (unit.value.facility === 'barracks' ? 4 : 3),
)

const roleLabel = computed(() => {
  if (!unit.value) return ''
  return unit.value.role === 'caster'
    ? 'Pure caster. Rolls caster spells only.'
    : unit.value.role === 'fighter-caster'
      ? 'Fighter-caster. Rolls from both the combat and caster pools.'
      : 'Fighter'
})

useMeta({
  title: computed(() => unit.value?.name ?? 'Unit not found').value,
  description: computed(() =>
    unit.value
      ? `${unit.value.name} in Wildcard Arena. ${RACE_LABEL[unit.value.race]}, ${FACILITY_LABEL[unit.value.facility]} slot ${unit.value.slot}. Costs ${unit.value.cost.minerals} minerals and ${unit.value.cost.vespene} gas, and can roll ${pool.value.length} different upgrades.`
      : 'This unit does not exist in the Wildcard Arena unit list.',
  ).value,
  path: `/units/${String(route.params.id)}`,
  index: Boolean(unit.value),
})
</script>

<template>
  <template v-if="unit">
    <header class="uhero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink to="/units">Units</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ FACILITY_LABEL[unit.facility] }}</span>
        </nav>

        <div class="uhero__row">
          <UnitPortrait :unit="unit" size="lg" />
          <div class="uhero__ident">
            <h1 class="uhero__name">{{ unit.name }}</h1>
            <div class="uhero__tags">
              <TagBadge :tone="unit.race">{{ RACE_LABEL[unit.race] }}</TagBadge>
              <TagBadge>{{ FACILITY_LABEL[unit.facility] }} · Slot {{ unit.slot }}</TagBadge>
              <TagBadge v-if="isTopSlot" tone="warning">
                Needs {{ FACILITY_ADDON[unit.facility] }}
              </TagBadge>
              <TagBadge v-for="attr in unit.attributes" :key="attr" size="sm">{{ attr }}</TagBadge>
            </div>
            <p class="uhero__role">{{ roleLabel }}</p>
          </div>
        </div>
      </div>
    </header>

    <div class="container ubody">
      <div class="ubody__main">
        <!-- Stats -->
        <section class="block" aria-labelledby="stats-h">
          <h2 id="stats-h" class="block__title">Stats</h2>
          <!--
            Deliberately only the values this mod changes. Life, shields, armor,
            speed and weapon numbers are stock and unchanged, so publishing them
            would be rewriting StarCraft documentation that already exists and is
            better maintained elsewhere. The data is still in units.ts if this
            decision is ever reversed.
          -->
          <dl class="stats">
            <div class="stat">
              <dt>Minerals</dt>
              <dd>{{ unit.cost.minerals }}</dd>
            </div>
            <div class="stat">
              <dt>Vespene</dt>
              <dd>{{ unit.cost.vespene }}</dd>
            </div>
            <div class="stat">
              <dt>Supply</dt>
              <dd>{{ unit.supply }}</dd>
            </div>
            <div class="stat">
              <dt>Build time</dt>
              <dd>{{ formatBuildTime(unit.buildTimeCatalog) }}</dd>
            </div>
          </dl>
        </section>

        <!-- Mod changes -->
        <section v-if="unit.modOverrides?.length" class="block" aria-labelledby="mod-h">
          <h2 id="mod-h" class="block__title">Changed from ladder</h2>
          <ul class="list">
            <li v-for="(item, i) in unit.modOverrides" :key="i">{{ item }}</li>
          </ul>
        </section>

        <!-- Notes -->
        <section v-if="unit.notes?.length" class="block" aria-labelledby="notes-h">
          <h2 id="notes-h" class="block__title">Data notes</h2>
          <ul class="list list--muted">
            <li v-for="(item, i) in unit.notes" :key="i">{{ item }}</li>
          </ul>
        </section>
      </div>

      <!-- Upgrade pool -->
      <aside class="ubody__side">
        <AppCard padding="md" class="pool">
          <h2 class="pool__title">
            Rollable upgrades
            <span class="pool__count">{{ pool.length }}</span>
          </h2>
          <p class="pool__intro">
            One of these rolls onto {{ unit.name }} each game. What it can roll depends on what kind
            of unit it is, not its race.
          </p>
          <ul class="pool__list">
            <li v-for="id in pool" :key="id">
              <UpgradeBadge :id="id" show-category />
            </li>
          </ul>

          <AppButton to="/upgrades" variant="ghost" size="sm" class="pool__all">
            All upgrade pools →
          </AppButton>
        </AppCard>
      </aside>
    </div>
  </template>

  <div v-else class="container missing">
    <h1>Unit not found</h1>
    <p class="lede">There’s no unit called “{{ route.params.id }}” in the list.</p>
    <AppButton to="/units">Back to all units</AppButton>
  </div>
</template>

<style scoped>
.uhero {
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

.uhero__row {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  flex-wrap: wrap;
}

.uhero__ident {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-width: 0;
}

.uhero__name {
  font-size: var(--fs-4xl);
  text-transform: uppercase;
}

.uhero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.uhero__role {
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
}

.ubody {
  display: grid;
  gap: var(--space-10);
  padding-block: var(--space-10) var(--space-16);
  grid-template-columns: 1fr;
  align-items: start;
}

.ubody__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
  min-width: 0;
}

.block__title {
  font-size: var(--fs-xl);
  padding-bottom: var(--space-3);
  margin-bottom: var(--space-5);
  border-bottom: 1px solid var(--c-border);
}

/* Stats
 *
 * Flex rather than grid: the number of stats varies per unit (shields and
 * energy are optional), and a grid leaves visible empty cells on the last row
 * whenever the count is not a multiple of the column count. Flex items simply
 * stretch to fill instead.
 */
.stats {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  background: var(--c-surface-1);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.stat {
  flex: 1 1 7rem;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  /* Dividers on the cells, so the last row never shows a gap-colored hole. */
  border-right: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
}

.stat dt {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.stat dd {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fs-lg);
  color: var(--c-text);
}

/* Weapons */

/* Lists */
.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding-left: var(--space-5);
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
  max-width: 72ch;
}

.list--muted {
  color: var(--c-text-muted);
  font-size: var(--fs-md);
}

.list::marker {
  color: var(--c-text-muted);
}

/* Pool */
.pool__title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  font-size: var(--fs-lg);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--c-border);
}

.pool__count {
  font-family: var(--font-mono);
  font-size: var(--fs-md);
  color: var(--c-accent);
}

.pool__intro {
  margin-block: var(--space-4);
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
  line-height: var(--lh-relaxed);
}

.pool__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.pool__list > li {
  display: flex;
}

.pool__list :deep(.ub) {
  width: 100%;
  justify-content: space-between;
}

.pool__all {
  margin-top: var(--space-4);
  padding-inline: 0;
}

.missing {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: var(--space-24);
}

@media (min-width: 64rem) {
  .ubody {
    grid-template-columns: minmax(0, 1fr) 21rem;
    gap: var(--space-12);
  }
  .ubody__side {
    position: sticky;
    top: calc(var(--header-h) + var(--space-6));
  }
}
</style>
