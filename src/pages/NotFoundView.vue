<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({
  title: 'Page not found',
  description: 'That page does not exist.',
  index: false,
})
</script>

<template>
  <div class="container nf">
    <p class="eyebrow">404</p>
    <h1>That page doesn’t exist</h1>
    <p class="lede">
      The link may be out of date. Everything on the site is reachable from the pages below.
    </p>
    <div class="nf__cta">
      <AppButton to="/">Home</AppButton>
      <AppButton to="/how-to-play" variant="secondary">How to play</AppButton>
      <AppButton to="/units" variant="ghost">Units →</AppButton>
    </div>
  </div>
</template>

<style scoped>
.nf {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: clamp(4rem, 3rem + 8vw, 10rem);
}

.nf__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
</style>
