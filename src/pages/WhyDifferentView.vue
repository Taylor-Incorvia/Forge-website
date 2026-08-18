<script setup lang="ts">
import PageHero from '@/components/layout/PageHero.vue'
import PageSection from '@/components/layout/PageSection.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({
  title: 'Why It’s Different',
  description:
    'Wildcard Arena deliberately breaks two RTS conventions: maximal player agency and minimal randomness. The result is depth without a memorization wall, a meta that cannot go stale, and per-unit balance instead of per-matchup balance.',
  path: '/why-its-different',
})

const TENETS = [
  {
    n: '01',
    title: 'Depth without a memorization wall',
    body: 'Standard StarCraft asks a new competitive player to memorize build orders and matchup dynamics before their decisions start to matter. Wildcard Arena moves the skill somewhere else: you are handed a faction you have never played and you have to read it. Depth comes from adaptation, which is available on game one.',
  },
  {
    n: '02',
    title: 'No stale meta',
    body: 'A game with 3 distinct factions converges down to limited viable builds, resulting in gameplay that can feel scripted. Wildcard Arena has no standardized build orders because you get a brand new faction every game. Players are forced out of their comfort zone such that they cannot play the same strategy every game.',
  },
  {
    n: '03',
    title: 'Per-unit balance, not per-matchup balance',
    body: 'In a three-race game every change ripples through three matchups at once, so balance moves slowly and conservatively. Here a unit that is too strong just gets nerfed. There is no matchup to keep simultaneously fair, so the balance work is smaller, faster and easier to explain.',
  },
]
</script>

<template>
  <PageHero
    eyebrow="The reasoning"
    title="Intentionally clashes with standard RTS design"
    lede="Wildcard Arena gives up some player agency and leans into randomness on purpose, the opposite of what competitive RTS usually optimizes for. Here’s why."
  />

  <PageSection>
    <div class="tenets">
      <AppCard v-for="tenet in TENETS" :key="tenet.n" padding="lg" as="article" class="tenet">
        <p class="tenet__n">{{ tenet.n }}</p>
        <h2 class="tenet__title">{{ tenet.title }}</h2>
        <p class="tenet__body">{{ tenet.body }}</p>
      </AppCard>
    </div>
  </PageSection>

  <PageSection title="Noticeable upgrades over invisible ones">
    <div class="split split--media">
      <div class="prose">
        <p>
          Generic +1/+1 attack and armor upgrades add little strategic depth. You rarely know you
          are losing to an upgrade disadvantage until you watch the replay. Wildcard Arena drops
          them for visible, decision-driving rolled upgrades such as Blink, Yamato Cannon, Neural
          Parasite, Tactical Jump and Raptor Charge.
        </p>
        <p>
          An upgrade should change <strong>how a unit micros</strong> or
          <strong>what it is good against</strong>, something a player can see and react to.
        </p>
        <p>
          The clearest consequence: <strong>there is no Engineering Bay</strong>. With no +1 weapons
          or armor to research, it would have nothing to do. Every upgrade you get is one you
          rolled.
        </p>
        <AppButton to="/upgrades" variant="secondary">Browse the upgrade pools</AppButton>
      </div>
      <!--
        Seconds 6-14, cropped to 1280x488 to cut the command card, minimap, facecam and
        keypress overlay. The frame declares that exact ratio because
        frame__media is object-fit: cover and a preset would crop the fight.
      -->
      <MediaFrame
        src="/media/upgrade-in-a-fight.mp4"
        poster="/media/upgrade-in-a-fight-poster.jpg"
        kind="video"
        alt="Zealots with rolled Raptor Charge leaping up a cliff into a Terran position, fighting Siege Tanks and Marines while the Your Faction panel stays open at the left."
        label="An upgrade visibly changing a fight"
        ratio="1280/488"
      />
    </div>
  </PageSection>
</template>

<style scoped>
.tenets {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
}

.tenet__n {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: var(--ls-wide);
  color: var(--c-accent);
  margin-bottom: var(--space-4);
}

.tenet__title {
  font-size: var(--fs-xl);
  margin-bottom: var(--space-3);
}

.tenet__body {
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.split {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
  align-items: start;
}

@media (min-width: 62rem) {
  .split {
    grid-template-columns: 1.05fr 0.95fr;
    gap: var(--space-12);
  }
  .split--media {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
