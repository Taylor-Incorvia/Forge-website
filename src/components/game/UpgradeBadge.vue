<script setup lang="ts">
import { computed } from 'vue'
import { UPGRADES_BY_ID, UPGRADE_CATEGORY_LABEL } from '@/data/upgrades'

/**
 * Compact reference to one rollable upgrade. Used in unit pools and in the
 * faction roller. Falls back gracefully if an id ever appears in a pool
 * before it has a catalog entry.
 */
const props = withDefaults(defineProps<{ id: string; showCategory?: boolean; link?: boolean }>(), {
  showCategory: false,
  link: true,
})

const upgrade = computed(() => UPGRADES_BY_ID.get(props.id))
const name = computed(() => upgrade.value?.name ?? props.id)
const groupKey = computed(() => upgrade.value?.family ?? props.id)
</script>

<template>
  <component
    :is="link ? 'RouterLink' : 'span'"
    v-bind="link ? { to: `/upgrades#${groupKey}` } : {}"
    class="ub"
    :class="[`ub--${upgrade?.category ?? 'utility'}`, { 'ub--static': !link }]"
  >
    <span class="ub__name">{{ name }}</span>
    <span v-if="showCategory && upgrade" class="ub__cat">
      {{ UPGRADE_CATEGORY_LABEL[upgrade.category] }}
    </span>
  </component>
</template>

<style scoped>
.ub {
  --ub-tint: var(--c-text-secondary);

  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
  background: var(--c-surface-2);
  border: 1px solid var(--c-border);
  border-left: 2px solid var(--ub-tint);
  border-radius: var(--radius-xs);
  color: var(--c-text-secondary);
  font-size: var(--fs-sm);
  text-decoration: none;
  transition:
    background-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

a.ub:hover {
  background: var(--c-surface-3);
  color: var(--c-text);
}

.ub__name {
  font-weight: var(--fw-medium);
}

.ub__cat {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--c-text-muted);
}

/*
 * Category tint lives on the left edge only — enough to group at a glance
 * without turning the pool list into a color chart.
 */
.ub--caster {
  --ub-tint: var(--c-zerg);
}
.ub--mobility {
  --ub-tint: var(--c-accent);
}
.ub--range {
  --ub-tint: var(--c-protoss);
}
.ub--combat {
  --ub-tint: var(--c-negative);
}
.ub--defense {
  --ub-tint: var(--c-positive);
}
.ub--stealth {
  --ub-tint: var(--c-terran);
}
.ub--utility {
  --ub-tint: var(--c-border-strong);
}
</style>
