<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
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
