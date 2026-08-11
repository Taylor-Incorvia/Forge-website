<script setup lang="ts">
import { computed, useId } from 'vue'

/**
 * The only vertical-rhythm primitive on the site. Pages compose sections;
 * they never set their own section padding. That is what keeps a new page
 * looking like it belongs without anyone re-deriving the spacing.
 */
const props = withDefaults(
  defineProps<{
    title?: string
    eyebrow?: string
    lede?: string
    /** Renders an h2 by default; pass 3 inside an already-nested section. */
    level?: 2 | 3
    width?: 'default' | 'wide' | 'text'
    /** `sunken` separates a band from its neighbours without adding a rule. */
    tone?: 'default' | 'sunken'
    align?: 'start' | 'center'
    /** Anchor target, so sections can be deep-linked. */
    id?: string
  }>(),
  { level: 2, width: 'default', tone: 'default', align: 'start' },
)

const autoId = useId()
const headingId = computed(() => (props.title ? `${props.id ?? autoId}-heading` : undefined))
</script>

<template>
  <section
    class="section"
    :class="[`section--${props.tone}`, `section--align-${props.align}`]"
    :id="props.id"
    :aria-labelledby="headingId"
  >
    <div
      class="container"
      :class="{ 'container--wide': width === 'wide', 'container--text': width === 'text' }"
    >
      <header v-if="props.eyebrow || props.title || props.lede" class="section__head">
        <p v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</p>
        <component
          :is="`h${props.level}`"
          v-if="props.title"
          :id="headingId"
          class="section__title"
        >
          {{ props.title }}
        </component>
        <p v-if="props.lede" class="lede section__lede">{{ props.lede }}</p>
        <slot name="head" />
      </header>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-block: var(--section-y);
  /*
   * The `id` prop exists so sections can be deep-linked, and the header is
   * sticky — without this a targeted section scrolls to sit underneath it.
   * Vue Router's scrollBehavior reads scroll-margin-top, so this covers the
   * smooth in-app scroll; base.css scroll-padding-top covers a cold load.
   */
  scroll-margin-top: calc(var(--header-h) + var(--space-6));
}

.section--sunken {
  background: var(--c-bg-sunken);
  border-block: 1px solid var(--c-border);
}

.section__head {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
  max-width: 62rem;
}

.section--align-center .section__head {
  align-items: center;
  text-align: center;
  margin-inline: auto;
}

.section--align-center .section__lede {
  text-align: center;
}

.section__title {
  margin: 0;
}
</style>
