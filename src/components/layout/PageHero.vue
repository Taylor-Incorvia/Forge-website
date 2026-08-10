<script setup lang="ts">
/**
 * The header band for every non-home page. Deliberately compact — an
 * oversized hero on a documentation-style page is the most obvious tell of a
 * template site, and it pushes the actual content below the fold.
 */
withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    lede?: string
  }>(),
  {},
)
</script>

<template>
  <header class="hero">
    <div class="container">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1 class="hero__title">{{ title }}</h1>
      <p v-if="lede" class="lede hero__lede">{{ lede }}</p>
      <slot />
    </div>
  </header>
</template>

<style scoped>
.hero {
  padding-block: clamp(2.5rem, 1.5rem + 4vw, 4.5rem) clamp(2rem, 1.2rem + 3vw, 3.5rem);
  border-bottom: 1px solid var(--c-border);
  background: linear-gradient(180deg, var(--c-surface-1) 0%, var(--c-bg) 100%);
}

.hero__title {
  margin-top: var(--space-3);
  font-size: var(--fs-3xl);
}

.hero__lede {
  margin-top: var(--space-4);
}
</style>
