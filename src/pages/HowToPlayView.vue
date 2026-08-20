<script setup lang="ts">
import PageHero from '@/components/layout/PageHero.vue'
import PageSection from '@/components/layout/PageSection.vue'
import StepList from '@/components/ui/StepList.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useMeta } from '@/composables/useMeta'
import { LINKS, DISCORD_INVITE_IS_LIVE, COMMUNITY_PAGE_ENABLED } from '@/data/site'

useMeta({
  title: 'How to Play',
  description:
    'StarCraft II multiplayer is free, and Wildcard Arena is a melee mod that loads with the lobby. Nothing to buy, nothing to download. Custom → Melee → pick a map → Create with Mod → search Wildcard Arena → Create Game. Playing alone? Load it onto a survival map like Redstone Zerg Survival.',
  path: '/how-to-play',
})

const STEPS = [
  {
    title: 'Open **Custom**, then **Melee**',
    detail:
      'Not Arcade. Wildcard Arena is a melee mod, so it lives under Custom games alongside the standard 1v1 and team modes.',
  },
  {
    title: 'Select any melee map',
    detail: 'Any standard melee map works. There is no special map.',
  },
  {
    title: 'Click **Create with Mod**',
    detail: 'This is the button that lets a melee lobby load a mod on top of the map you picked.',
  },
  {
    title: 'Search **Wildcard Arena** and select it',
    detail: 'Type the name into the mod search, pick it from the results, and confirm.',
  },
  {
    title: 'Click **Create Game**',
    detail: 'Set up the lobby as usual. Wildcard Arena supports 1v1 up to 4v4.',
  },
]

/** The things a first-time player will otherwise learn the hard way. */
const FIRST_GAME = [
  {
    title: 'The race you pick does nothing',
    body: 'You still choose a race in the lobby, but it has no effect on the game. Your production buildings are stocked with units from all three races regardless of what you picked. If you selected Zerg and got handed Marines and Stalkers, nothing has gone wrong.',
  },
  {
    title: 'Check your faction before you build',
    body: 'The “Your Faction” panel opens at the start of every game and shows every unit you rolled with its paired upgrade, grouped by facility. The FACTION tab on the left edge reopens it any time. Hover any icon for the full tooltip.',
  },
  {
    title: 'An add-on unlocks the top slot',
    body: 'Tech Lab unlocks Barracks slot 4, Reactor unlocks Factory slot 3, Tech Reactor unlocks Starport slot 3. Add-ons do not double production here. Each facility builds exactly one add-on type, on the X key by default.',
  },
  {
    title: 'Upgrades research at the tech buildings',
    body: 'Barracks units research at the Ghost Academy, Factory units at the Armory, Starport units at the Fusion Core. Each unit can research exactly one upgrade.',
  },
  {
    title: 'Scout, because rolls are per player',
    body: 'Vision of an enemy production building shows what it can build; vision of a tech building shows what it can research. It is fog-gated, so the information only lasts as long as the vision does.',
  },
]
</script>

<template>
  <PageHero
    eyebrow="Getting started"
    title="Nothing to buy. Nothing to install."
    lede="StarCraft II multiplayer is free to play, and that includes Custom games and melee mods. Wildcard Arena is a melee mod, not an Arcade map. It loads with the lobby, so there is no separate download, no launcher and no client patch."
  />

  <PageSection title="From the SC2 main menu to a game">
    <div class="flow">
      <StepList :steps="STEPS" />
      <div class="flow__media">
        <MediaFrame
          src="/media/select-extension-mod.jpg"
          alt="StarCraft II's Select Extension Mod dialog, reached from Custom then Melee. A search for “wildcard” returns Wildcard Arena, selected, with its store listing on the right and a Create Lobby button below."
          label="The Select Extension Mod screen"
          ratio="2557/1355"
          caption="Steps 3–4: Create with Mod, then search for Wildcard Arena."
        />
      </div>
    </div>
  </PageSection>

  <PageSection
    tone="sunken"
    eyebrow="Your first game"
    title="Five things that aren’t like standard StarCraft"
    lede="Everything else plays like the melee game you already know: same economy, same buildings, same controls."
  >
    <div class="first">
      <AppCard v-for="item in FIRST_GAME" :key="item.title" padding="lg" as="article">
        <h3 class="first__title">{{ item.title }}</h3>
        <p class="first__body">{{ item.body }}</p>
      </AppCard>
    </div>
  </PageSection>

  <PageSection title="Find an opponent">
    <div class="prose">
      <p>
        Wildcard Arena runs 1v1 up to 4v4. The Discord is the fastest way to find someone, and where
        anything new gets announced first.
      </p>
    </div>
    <div class="find__cta">
      <AppButton v-if="DISCORD_INVITE_IS_LIVE" :href="LINKS.discord">Join the Discord</AppButton>
      <AppButton
        v-if="COMMUNITY_PAGE_ENABLED"
        to="/community"
        :variant="DISCORD_INVITE_IS_LIVE ? 'secondary' : 'primary'"
      >
        Community and events
      </AppButton>
    </div>
  </PageSection>

  <PageSection
    id="survival"
    tone="sunken"
    eyebrow="Solo and co-op"
    title="Prefer vs AI? Try survival maps"
  >
    <div class="solo">
      <div class="prose">
        <p>
          Adding a computer opponent on a normal melee map does not really work. The melee AI does
          not understand a rolled faction. If it rolls Terran units it might fight you, but it can
          just as easily sit there massing Medivacs.
        </p>
        <p>
          Survival maps work properly, because the attack waves are scripted rather than played by
          the AI. The flow is identical to a normal game. You just pick a survival map at step two.
        </p>
      </div>

      <AppCard padding="lg" as="article" class="solo__map">
        <p class="eyebrow">Known to work</p>
        <h3 class="solo__name">Redstone Zerg Survival</h3>
        <p class="solo__meta">1–3 players, co-op</p>
        <p class="solo__body">
          Custom → Melee → select <strong>Redstone Zerg Survival</strong> → Create with Mod → pick
          <strong>Wildcard Arena</strong> → Create Game. Works with the mod as-is, solo or with
          friends.
        </p>
        <p class="solo__credit">
          The map is by <strong>Tacobella</strong> and is not part of Wildcard Arena. It simply
          works well with it.
        </p>
      </AppCard>
    </div>
  </PageSection>
</template>

<style scoped>
.flow {
  display: grid;
  gap: var(--space-10);
  grid-template-columns: 1fr;
  align-items: start;
}

.first {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
}

.first__title {
  font-size: var(--fs-lg);
  margin-bottom: var(--space-3);
}

.first__body {
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.solo {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
  align-items: start;
}

.solo__map {
  border-left: 2px solid var(--c-accent);
}

.solo__name {
  margin-top: var(--space-2);
  font-size: var(--fs-xl);
}

.solo__meta {
  margin-top: var(--space-1);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: var(--ls-wide);
  color: var(--c-text-muted);
}

.solo__body {
  margin-top: var(--space-4);
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.solo__body strong {
  color: var(--c-text);
  font-weight: var(--fw-semibold);
}

.solo__credit {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--c-border);
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
  line-height: var(--lh-relaxed);
}

.solo__credit strong {
  color: var(--c-text-secondary);
  font-weight: var(--fw-semibold);
}

.find__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

@media (min-width: 62rem) {
  .flow {
    grid-template-columns: 1.15fr 0.85fr;
    gap: var(--space-12);
  }
  .solo {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
  }
  .flow__media {
    position: sticky;
    top: calc(var(--header-h) + var(--space-6));
  }
}
</style>
