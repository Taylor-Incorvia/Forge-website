<script setup lang="ts">
import BrandMark from '@/components/layout/BrandMark.vue'
import { LINKS, SITE, DISCORD_INVITE_IS_LIVE, BUILD_STAMP } from '@/data/site'

const COLUMNS = [
  {
    title: 'Play',
    links: [
      { to: '/how-to-play', label: 'How to Play' },
      { to: '/why-its-different', label: 'Why It’s Different' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { to: '/units', label: 'Units' },
      { to: '/upgrades', label: 'Upgrade Pools' },
      { to: '/patch-notes', label: 'Patch Notes' },
    ],
  },
]

const year = 2026
</script>

<template>
  <footer class="ftr">
    <div class="container">
      <div class="ftr__grid">
        <div class="ftr__brand">
          <BrandMark />
          <p class="ftr__tagline">{{ SITE.tagline }}</p>
        </div>

        <nav v-for="col in COLUMNS" :key="col.title" class="ftr__col" :aria-label="col.title">
          <h2 class="eyebrow">{{ col.title }}</h2>
          <ul class="ftr__list">
            <li v-for="link in col.links" :key="link.to">
              <RouterLink :to="link.to" class="ftr__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <nav class="ftr__col" aria-label="Community">
          <h2 class="eyebrow">Community</h2>
          <ul class="ftr__list">
            <li><RouterLink to="/community" class="ftr__link">Community</RouterLink></li>
            <li v-if="DISCORD_INVITE_IS_LIVE">
              <a class="ftr__link" :href="LINKS.discord" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <hr />

      <div class="ftr__legal">
        <p>
          <strong>Wildcard Arena</strong> is an unaffiliated community mod.
          <em>StarCraft II</em> and its assets are © Blizzard Entertainment. Original mod code and
          documentation © {{ year }} Taylor Incorvia.
        </p>
        <p class="ftr__note">
          Unit and upgrade data on this site is transcribed by hand from the mod repository’s audit
          documents and may lag the live build.
          <span class="ftr__stamp">Build {{ BUILD_STAMP }}</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  margin-top: auto;
  padding-block: var(--space-16) var(--space-10);
  border-top: 1px solid var(--c-border);
  background: var(--c-bg-sunken);
}

.ftr__grid {
  display: grid;
  gap: var(--space-10);
  grid-template-columns: 1fr;
}

.ftr__brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.ftr__tagline {
  max-width: 26ch;
  color: var(--c-text-muted);
  font-size: var(--fs-sm);
}

.ftr__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.ftr__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
}

.ftr__link {
  color: var(--c-text-secondary);
  font-size: var(--fs-sm);
  text-decoration: none;
}

.ftr__link:hover {
  color: var(--c-text);
  text-decoration: underline;
}

.ftr__legal {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  max-width: 70ch;
  color: var(--c-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-relaxed);
}

.ftr__legal strong {
  color: var(--c-text-secondary);
  font-weight: var(--fw-semibold);
}

.ftr__note {
  font-size: var(--fs-xs);
}

.ftr__stamp {
  display: block;
  margin-top: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: var(--ls-wide);
  color: var(--c-text-muted);
  opacity: 0.7;
}

@media (min-width: 46rem) {
  .ftr__grid {
    grid-template-columns: 1.6fr repeat(3, 1fr);
  }
}
</style>
