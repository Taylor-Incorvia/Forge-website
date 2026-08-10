<script setup lang="ts">
import RichText from '@/components/game/RichText.vue'
import type { Step } from '@/components/ui/types'

defineProps<{ steps: Step[] }>()
</script>

<template>
  <ol class="steps">
    <li v-for="(step, i) in steps" :key="step.title" class="step">
      <span class="step__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
      <div class="step__body">
        <h3 class="step__title"><RichText :text="step.title" /></h3>
        <p v-if="step.detail" class="step__detail"><RichText :text="step.detail" /></p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}

.step {
  position: relative;
  display: flex;
  gap: var(--space-5);
  padding-block: var(--space-5);
  border-top: 1px solid var(--c-border);
}

.step:last-child {
  border-bottom: 1px solid var(--c-border);
}

.step__num {
  flex: none;
  width: 2.5rem;
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-wide);
  color: var(--c-accent);
  padding-top: 0.15em;
}

.step__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}

.step__title {
  font-size: var(--fs-lg);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-tight);
}

.step__detail {
  max-width: 62ch;
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}
</style>
