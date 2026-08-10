<script setup lang="ts">
import PageHero from '@/components/layout/PageHero.vue'
import PageSection from '@/components/layout/PageSection.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useMeta } from '@/composables/useMeta'
import { LINKS, DISCORD_INVITE_IS_LIVE } from '@/data/site'

/*
 * Deliberately a placeholder. The event format (Saturday Arena, league points,
 * standings) depends on Discord bots that are still being written, so this page
 * states only what is true today and points at Discord for the rest. Expand it
 * once the format is settled — not before.
 */
useMeta({
  title: 'Community',
  description:
    'Discord is the Wildcard Arena hub: find opponents, follow development, and hear about events first.',
  path: '/community',
})
</script>

<template>
  <PageHero
    eyebrow="Community"
    title="Discord is the hub"
    lede="It is where games get organized, where development gets discussed, and where anything new gets announced first."
  />

  <PageSection>
    <div class="hub">
      <div class="prose">
        <p>
          Wildcard Arena runs 1v1 up to 4v4, so most of the time you want someone else in the lobby.
          Discord is the fastest way to find them. Ask questions, report bugs, follow patches, and
          get a game going.
        </p>
        <p>
          Prefer to play alone first? You can
          <RouterLink to="/how-to-play">load the mod onto a survival map</RouterLink>.
        </p>
        <div class="hub__cta">
          <AppButton v-if="DISCORD_INVITE_IS_LIVE" :href="LINKS.discord" size="lg">
            Join the Discord
          </AppButton>
          <AppButton to="/patch-notes" variant="secondary" size="lg"
            >Read the patch notes</AppButton
          >
        </div>
      </div>

      <AppCard padding="lg" as="article" class="hub__soon">
        <p class="eyebrow">In progress</p>
        <h2 class="hub__soon-title">Organized play</h2>
        <p class="hub__soon-body">
          Recurring community nights and periodic commentated tournaments are planned. Matchmaking
          and standings will run through Discord, and those bots are still being built.
        </p>
        <p class="hub__soon-note">
          Nothing is scheduled yet. When there is a format worth committing to, it will be announced
          in Discord and written up here.
        </p>
      </AppCard>
    </div>
  </PageSection>

  <PageSection tone="sunken" align="center" title="Not played yet?">
    <template #head>
      <p class="lede closing">
        StarCraft II multiplayer is free, and the mod loads with the lobby. Custom, Melee, Create
        with Mod, search Wildcard Arena.
      </p>
    </template>
    <AppButton to="/how-to-play" size="lg">How to play</AppButton>
  </PageSection>
</template>

<style scoped>
.hub {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
  align-items: start;
}

.hub__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hub__soon {
  border-left: 2px solid var(--c-border-strong);
}

.hub__soon-title {
  margin-top: var(--space-2);
  font-size: var(--fs-xl);
}

.hub__soon-body {
  margin-top: var(--space-4);
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.hub__soon-note {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--c-border);
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
  line-height: var(--lh-relaxed);
}

.closing {
  text-align: center;
  margin-inline: auto;
}

@media (min-width: 62rem) {
  .hub {
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-12);
  }
}
</style>
