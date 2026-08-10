<script setup lang="ts">
import type { ChipOption } from '@/components/ui/types'

/**
 * A single-select filter row.
 *
 * Rendered as a real radiogroup rather than a row of buttons, so arrow keys
 * move between options and screen readers announce "3 of 5" — behavior you
 * get for free from the platform and would otherwise have to rebuild.
 */
const model = defineModel<string>({ required: true })

defineProps<{
  label: string
  options: ChipOption[]
}>()
</script>

<template>
  <div class="chips" role="radiogroup" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      class="chip"
      type="button"
      role="radio"
      :aria-checked="model === option.value"
      :tabindex="model === option.value ? 0 : -1"
      @click="model = option.value"
      @keydown.left.prevent="
        model =
          options[
            (options.findIndex((o) => o.value === model) - 1 + options.length) % options.length
          ]?.value ?? model
      "
      @keydown.right.prevent="
        model =
          options[(options.findIndex((o) => o.value === model) + 1) % options.length]?.value ??
          model
      "
    >
      {{ option.label }}
      <span v-if="option.count !== undefined" class="chip__count">{{ option.count }}</span>
    </button>
  </div>
</template>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--c-surface-1);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  color: var(--c-text-secondary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  transition:
    background-color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.chip:hover {
  border-color: var(--c-border-strong);
  color: var(--c-text);
}

.chip[aria-checked='true'] {
  background: var(--c-accent-wash);
  border-color: var(--c-border-accent);
  color: var(--c-accent-hover);
}

.chip__count {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  color: var(--c-text-muted);
}

.chip[aria-checked='true'] .chip__count {
  color: inherit;
  opacity: 0.75;
}
</style>
