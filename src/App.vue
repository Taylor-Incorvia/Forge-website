<script setup lang="ts">
import { useHead } from '@unhead/vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { ANALYTICS_BEACON_TOKEN } from '@/data/site'

/*
 * Site-wide, not per-page: useMeta describes a page, this is chrome. Gated on
 * the token so that with none set the built HTML contains no script tag at all
 * rather than an empty or broken one.
 */
useHead({
  script: ANALYTICS_BEACON_TOKEN
    ? [
        {
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
          defer: true,
          'data-cf-beacon': JSON.stringify({ token: ANALYTICS_BEACON_TOKEN }),
        },
      ]
    : [],
})
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <AppHeader />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style>
/* Global layout shell — scoped styles would not reach the body-level flow. */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

#main:focus {
  outline: none;
}

.skip {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  z-index: 100;
  padding: var(--space-3) var(--space-4);
  background: var(--c-accent);
  color: var(--c-text-inverse);
  border-radius: var(--radius-sm);
  font-weight: var(--fw-semibold);
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform var(--dur-fast) var(--ease-out);
}

.skip:focus {
  transform: translateY(0);
}
</style>
