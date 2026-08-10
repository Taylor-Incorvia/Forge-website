<script setup lang="ts">
import { useId } from 'vue'

const model = defineModel<string>({ required: true })

withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    /** Announced to screen readers when the result count changes. */
    resultsLabel?: string
  }>(),
  { placeholder: 'Search…' },
)

const id = useId()
</script>

<template>
  <div class="search">
    <label class="visually-hidden" :for="id">{{ label }}</label>
    <svg
      class="search__icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
    >
      <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <input
      :id="id"
      v-model="model"
      class="search__input"
      type="search"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
    />
    <button v-if="model" class="search__clear" type="button" @click="model = ''">
      <span class="visually-hidden">Clear search</span>
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" width="14" height="14">
        <path
          d="m4 4 8 8M12 4l-8 8"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <p v-if="resultsLabel" class="visually-hidden" role="status" aria-live="polite">
      {{ resultsLabel }}
    </p>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding-inline: var(--space-3);
  background: var(--c-surface-1);
  border: 1px solid var(--c-border-strong);
  border-radius: var(--radius-sm);
  transition: border-color var(--dur-fast) var(--ease-out);
}

.search:focus-within {
  border-color: var(--c-accent);
}

.search__icon {
  flex: none;
  color: var(--c-text-muted);
}

.search__input {
  flex: 1;
  min-width: 0;
  padding-block: var(--space-3);
  background: none;
  border: none;
  outline: none;
  font-size: var(--fs-md);
}

.search__input::placeholder {
  color: var(--c-text-muted);
}

/* The native clear affordance is inconsistent across browsers; we ship our own. */
.search__input::-webkit-search-cancel-button {
  display: none;
}

.search__clear {
  flex: none;
  display: grid;
  place-items: center;
  padding: var(--space-1);
  color: var(--c-text-muted);
  border-radius: var(--radius-xs);
}

.search__clear:hover {
  color: var(--c-text);
}
</style>
