<script setup lang="ts">
import { computed } from 'vue'
import AppCard from '@/components/ui/AppCard.vue'
import TagBadge from '@/components/ui/TagBadge.vue'
import UnitPortrait from '@/components/game/UnitPortrait.vue'
import { formatBuildTime } from '@/data/units'
import type { Unit } from '@/data/types'
import { FACILITY_LABEL, RACE_LABEL } from '@/data/site'
import { UNIT_POOLS } from '@/data/upgrades'

const props = defineProps<{ unit: Unit }>()

const poolSize = computed(() => UNIT_POOLS[props.unit.id]?.length ?? 0)
</script>

<template>
  <AppCard variant="interactive" padding="none" as="article" class="ucard">
    <RouterLink :to="`/units/${unit.id}`" class="ucard__link">
      <!-- The whole card is the target; the heading carries the accessible name. -->
      <span class="ucard__head">
        <UnitPortrait :unit="unit" size="md" />
        <span class="ucard__ident">
          <h3 class="ucard__name">{{ unit.name }}</h3>
          <span class="ucard__meta">
            {{ FACILITY_LABEL[unit.facility] }} · Slot {{ unit.slot }}
          </span>
        </span>
        <TagBadge :tone="unit.race" size="sm">{{ RACE_LABEL[unit.race] }}</TagBadge>
      </span>

      <dl class="ucard__stats">
        <div class="ucard__stat">
          <dt>Cost</dt>
          <dd>
            <span class="min">{{ unit.cost.minerals }}</span>
            <span v-if="unit.cost.vespene" class="gas">{{ unit.cost.vespene }}</span>
          </dd>
        </div>
        <div class="ucard__stat">
          <dt>Supply</dt>
          <dd>{{ unit.supply }}</dd>
        </div>
        <div class="ucard__stat">
          <dt>Build</dt>
          <dd>{{ formatBuildTime(unit.buildTimeCatalog) }}</dd>
        </div>
      </dl>

      <span class="ucard__foot">
        <TagBadge size="sm" tone="accent">{{ poolSize }} rollable upgrades</TagBadge>
        <TagBadge v-if="unit.role !== 'fighter'" size="sm">
          {{ unit.role === 'caster' ? 'Pure caster' : 'Fighter-caster' }}
        </TagBadge>
      </span>
    </RouterLink>
  </AppCard>
</template>

<style scoped>
.ucard {
  height: 100%;
}

.ucard__link {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100%;
  padding: var(--space-4);
  color: inherit;
  text-decoration: none;
}

/* The card already shows focus via :focus-within; suppress the doubled ring. */
.ucard__link:focus-visible {
  box-shadow: none;
}
.ucard:has(.ucard__link:focus-visible) {
  box-shadow: var(--focus-ring);
}

.ucard__head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.ucard__ident {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  margin-right: auto;
}

.ucard__name {
  font-size: var(--fs-base);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
}

.ucard__meta {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.ucard__stats {
  display: grid;
  /* Cost, supply, build time — the three values this mod actually changes. */
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-2);
  margin: 0;
  padding-block: var(--space-3);
  border-block: 1px solid var(--c-border);
}

.ucard__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.ucard__stat dt {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.ucard__stat dd {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 0.35em;
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--c-text);
}

/* Resource colors match the in-game HUD convention, not the brand palette. */
.min::before,
.gas::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 0.35em;
  border-radius: 1px;
  transform: rotate(45deg);
}

.min::before {
  background: var(--c-minerals);
}

.gas::before {
  background: var(--c-vespene);
}

.ucard__foot {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: auto;
}
</style>
