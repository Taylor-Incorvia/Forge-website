<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import BrandMark from '@/components/layout/BrandMark.vue'
import { LINKS, DISCORD_INVITE_IS_LIVE, COMMUNITY_PAGE_ENABLED } from '@/data/site'

const NAV = [
  { to: '/how-to-play', label: 'How to Play' },
  { to: '/why-its-different', label: 'Why It’s Different' },
  { to: '/units', label: 'Units' },
  { to: '/upgrades', label: 'Upgrades' },
  { to: '/patch-notes', label: 'Patch Notes' },
  ...(COMMUNITY_PAGE_ENABLED ? [{ to: '/community', label: 'Community' }] : []),
]

const open = ref(false)
const route = useRoute()

// Close the drawer on navigation, and free the body scroll lock with it.
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<template>
  <header class="hdr">
    <div class="container hdr__bar">
      <RouterLink to="/" class="hdr__brand" aria-label="Wildcard Arena home">
        <BrandMark />
      </RouterLink>

      <nav class="hdr__nav" aria-label="Primary">
        <RouterLink v-for="item in NAV" :key="item.to" :to="item.to" class="hdr__link">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="hdr__actions">
        <AppButton
          v-if="DISCORD_INVITE_IS_LIVE"
          :href="LINKS.discord"
          variant="secondary"
          size="sm"
          class="hdr__discord"
        >
          Discord
        </AppButton>
        <AppButton to="/how-to-play" size="sm">Play</AppButton>

        <button
          class="hdr__toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="open = !open"
        >
          <span class="visually-hidden">{{ open ? 'Close menu' : 'Open menu' }}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" width="20" height="20">
            <path
              v-if="!open"
              d="M3 6h14M3 10h14M3 14h14"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <path
              v-else
              d="m5 5 10 10M15 5 5 15"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-show="open" id="mobile-nav" class="drawer">
      <nav class="drawer__nav" aria-label="Primary (mobile)">
        <RouterLink v-for="item in NAV" :key="item.to" :to="item.to" class="drawer__link">
          {{ item.label }}
        </RouterLink>
        <a
          v-if="DISCORD_INVITE_IS_LIVE"
          class="drawer__link"
          :href="LINKS.discord"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--c-bg) 88%, transparent);
  border-bottom: 1px solid var(--c-border);
  backdrop-filter: blur(12px);
}

/* No backdrop-filter support (or a user who dislikes it) still gets a solid bar. */
@supports not (backdrop-filter: blur(1px)) {
  .hdr {
    background: var(--c-bg);
  }
}

.hdr__bar {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  min-height: var(--header-h);
}

.hdr__brand {
  flex: none;
  color: var(--c-text);
  text-decoration: none;
}

.hdr__nav {
  display: none;
  flex: 1;
  gap: var(--space-1);
}

.hdr__link {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  color: var(--c-text-secondary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  text-decoration: none;
  white-space: nowrap;
  transition:
    color var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out);
}

.hdr__link:hover {
  color: var(--c-text);
  background: var(--c-surface-2);
}

/* vue-router adds this class; the underline is the only always-on accent use. */
.hdr__link.router-link-active {
  color: var(--c-text);
  box-shadow: inset 0 -2px 0 var(--c-accent);
}

.hdr__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.hdr__discord {
  display: none;
}

.hdr__toggle {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--c-border-strong);
  border-radius: var(--radius-sm);
  color: var(--c-text-secondary);
}

.hdr__toggle:hover {
  color: var(--c-text);
  background: var(--c-surface-2);
}

.drawer {
  border-top: 1px solid var(--c-border);
  background: var(--c-surface-1);
  max-height: calc(100svh - var(--header-h));
  overflow-y: auto;
}

.drawer__nav {
  display: flex;
  flex-direction: column;
  padding: var(--space-2) var(--gutter) var(--space-4);
}

.drawer__link {
  padding: var(--space-4) var(--space-1);
  border-bottom: 1px solid var(--c-border);
  color: var(--c-text);
  font-family: var(--font-display);
  font-size: var(--fs-lg);
  font-weight: var(--fw-semibold);
  text-decoration: none;
}

.drawer__link.router-link-active {
  color: var(--c-accent);
}

@media (min-width: 62rem) {
  .hdr__nav {
    display: flex;
  }
  .hdr__discord {
    display: inline-flex;
  }
  .hdr__toggle {
    display: none;
  }
  .drawer {
    display: none !important;
  }
}
</style>
