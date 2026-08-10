<script setup lang="ts">
import { computed } from 'vue'

/**
 * One button, three shapes. Renders a <button>, a <RouterLink> or an <a>
 * depending on which prop is set, so semantics always match behavior.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    /** Internal route. */
    to?: string
    /** External URL — adds rel/target automatically. */
    href?: string
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false },
)

const tag = computed(() => (props.to ? 'RouterLink' : props.href ? 'a' : 'button'))

const bindings = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return { type: props.type, disabled: props.disabled }
})
</script>

<template>
  <component
    :is="tag"
    class="btn"
    :class="[`btn--${props.variant}`, `btn--${props.size}`]"
    v-bind="bindings"
  >
    <slot />
    <svg
      v-if="props.href"
      class="btn__ext"
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      width="12"
      height="12"
    >
      <path
        d="M4.5 2h5.5v5.5M10 2 3 9"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </component>
</template>

<style scoped>
.btn {
  --btn-py: var(--space-3);
  --btn-px: var(--space-5);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--btn-py) var(--btn-px);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--fs-md);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-normal);
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
}

.btn:active:not(:disabled) {
  transform: translateY(1px);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* Sizes */
.btn--sm {
  --btn-py: var(--space-2);
  --btn-px: var(--space-3);
  font-size: var(--fs-sm);
}
.btn--lg {
  --btn-py: var(--space-4);
  --btn-px: var(--space-6);
  font-size: var(--fs-base);
}

/* Variants — the accent appears here and in focus rings, and almost nowhere else. */
.btn--primary {
  background: var(--c-accent);
  color: var(--c-text-inverse);
  box-shadow: var(--elev-1);
}
.btn--primary:hover:not(:disabled) {
  background: var(--c-accent-hover);
}

.btn--secondary {
  background: var(--c-surface-2);
  border-color: var(--c-border-strong);
  color: var(--c-text);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--c-surface-3);
  border-color: var(--c-border-accent);
  color: var(--c-text);
}

.btn--ghost {
  background: transparent;
  color: var(--c-text-secondary);
}
.btn--ghost:hover:not(:disabled) {
  background: var(--c-surface-2);
  color: var(--c-text);
}

.btn__ext {
  opacity: 0.65;
  flex: none;
}
</style>
