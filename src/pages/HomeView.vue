<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import PageSection from '@/components/layout/PageSection.vue'
import FactionRoller from '@/components/game/FactionRoller.vue'
import PatchNoteBody from '@/components/game/PatchNoteBody.vue'
import { useMeta } from '@/composables/useMeta'
import { SITE, FACTION_COMBINATIONS, LINKS, DISCORD_INVITE_IS_LIVE } from '@/data/site'
import { LATEST_PATCH, formatPatchDate } from '@/data/patches'

useMeta({
  title: SITE.name,
  description: SITE.description,
  path: '/',
})

/** The three tenets, straight from the mod README. */
const TENETS = [
  {
    title: 'Depth without a memorization wall',
    body: 'Skill comes from reading and adapting to your roll, not from having memorized build orders and matchup dynamics before your first competitive game.',
  },
  {
    title: 'No stale meta',
    body: 'Three fixed factions converge on a few viable builds, and play can start to feel scripted. A brand new faction every game means you cannot run the same strategy twice.',
  },
  {
    title: 'Per-unit balance, not per-matchup balance',
    body: 'A unit that is too strong just gets nerfed. There is no need to keep three matchups simultaneously fair, so balance changes stay small and legible.',
  },
]
</script>

<template>
  <!-- ── Hero ──────────────────────────────────────────────── -->
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">StarCraft II melee mod · {{ SITE.season }}, actively developed</p>
        <h1 class="hero__title">
          You don’t pick your race.<br />
          <span class="hero__title-alt">You’re dealt one.</span>
        </h1>
        <p class="lede hero__lede">
          Every game, your production buildings are dealt a random roster of units they can build,
          and your tech buildings a random set of upgrades they can research. No standard build
          order, no matchup to memorize, no optimal opening to grind. Just the faction you were
          dealt and the decisions you make with it.
        </p>
        <div class="hero__cta">
          <AppButton to="/how-to-play" size="lg">How to play</AppButton>
          <AppButton to="/why-its-different" variant="secondary" size="lg">
            Why it’s different
          </AppButton>
        </div>
        <p class="hero__small">
          Wildcard Arena is a melee mod, not an Arcade map. StarCraft II multiplayer is free and it
          loads with the lobby. Nothing to buy, nothing to download.
        </p>
      </div>

      <div class="hero__media">
        <MediaFrame
          src="/media/hero-battle.mp4"
          poster="/media/hero-battle-poster.jpg"
          kind="video"
          alt="A Wildcard Arena battle: Protoss Immortals and Stalkers fighting alongside Terran units against a Zerg army."
          label="Gameplay clip"
          ratio="16/9"
          priority
        />
      </div>
    </div>
  </section>

  <!-- ── The mechanic, shown rather than described ──────────── -->
  <PageSection
    tone="sunken"
    eyebrow="The hand you're dealt"
    title="This is one faction. Roll again and you get a different one."
  >
    <FactionRoller />
    <div class="roller-notes">
      <p class="lede">
        Each slot in a production building holds one unit type you can build all game, and each of
        those units is dealt one upgrade from a pool filtered to what makes sense on it. That is a
        real draw, built from the same pools the mod uses and obeying the same roll caps and slot
        rules.
      </p>
      <p class="curation">
        <strong>Curated, not chaos.</strong> Every pool is hand-built for the unit it belongs to, so
        a draw can surprise you without being nonsense. Roll caps stop any one upgrade from ending
        up on your whole army.
      </p>
      <p class="roller-scale">
        There are
        <strong>{{ FACTION_COMBINATIONS.toLocaleString('en-US') }}</strong> possible rolls.
      </p>
    </div>
  </PageSection>

  <!-- ── Why it's different ────────────────────────────────── -->
  <PageSection
    eyebrow="The approach"
    title="Intentionally clashes with standard RTS design"
    lede="Wildcard Arena gives up some player agency and leans into randomness on purpose, the opposite of what competitive RTS usually optimizes for. Here’s why."
  >
    <div class="tenets">
      <AppCard v-for="tenet in TENETS" :key="tenet.title" padding="lg" as="article">
        <h3 class="tenet__title">{{ tenet.title }}</h3>
        <p class="tenet__body">{{ tenet.body }}</p>
      </AppCard>
    </div>
    <div class="tenets__more">
      <AppButton to="/why-its-different" variant="ghost">Read the design thesis →</AppButton>
    </div>
  </PageSection>

  <!-- ── How it plays ──────────────────────────────────────── -->
  <PageSection
    tone="sunken"
    eyebrow="How it plays"
    title="Macro like normal StarCraft. Adapt like you never have."
  >
    <div class="plays">
      <div class="plays__list">
        <article class="play">
          <h3 class="play__title">Production buildings decide what you can build</h3>
          <p class="play__body">
            Barracks, Factory and Starport each fill their slots with random units from across all
            three races. The randomness is in the menu: build from a slot and you get that unit,
            every time.
          </p>
        </article>
        <article class="play">
          <h3 class="play__title">Tech buildings decide what you can research</h3>
          <p class="play__body">
            Ghost Academy, Armory and Fusion Core hold one random upgrade for each unit you were
            dealt, drawn from a pool built for that unit. Researching it is still your call, at the
            usual cost.
          </p>
        </article>
        <article class="play">
          <h3 class="play__title">Add-ons gate the top slot</h3>
          <p class="play__body">
            An add-on unlocks a building’s highest slot rather than doubling production. This is
            intentionally not how Reactors work on ladder, and it is the most commonly misread
            mechanic in the mod.
          </p>
        </article>
        <article class="play">
          <h3 class="play__title">Scouting tells you their hand</h3>
          <p class="play__body">
            Get vision of an enemy building and icons above it show what it can produce or research.
            It is fog-gated, so you have to actually send a scout.
          </p>
        </article>
      </div>

      <div class="plays__media">
        <MediaFrame
          label="The “Your Faction” panel"
          hint="The in-game panel showing every rolled unit with its paired upgrade, grouped by facility. This is the single most useful screenshot for explaining the mod."
          ratio="4/3"
          caption="Your whole faction, one glance away. Added in Wildcard Arena 3.0."
        />
      </div>
    </div>
  </PageSection>

  <!-- ── Get started ───────────────────────────────────────── -->
  <PageSection eyebrow="Getting in" title="Five clicks from the SC2 main menu">
    <div class="start">
      <ol class="start__steps">
        <li><strong>Custom</strong> → <strong>Melee</strong> (not Arcade)</li>
        <li>Select any melee map</li>
        <li>Click <strong>Create with Mod</strong></li>
        <li>Search <strong>Wildcard Arena</strong> and select it</li>
        <li><strong>Create Game</strong></li>
      </ol>
      <div class="start__aside">
        <p class="prose">
          Wildcard Arena is a melee mod, so it lives under Custom games rather than the Arcade. It
          loads with the map. No separate download, no client to install, and nothing to buy, since
          StarCraft II multiplayer is free.
        </p>
        <AppButton to="/how-to-play">See the full walkthrough</AppButton>
      </div>
    </div>
  </PageSection>

  <!-- ── Latest patch ──────────────────────────────────────── -->
  <PageSection
    tone="sunken"
    eyebrow="Latest changes"
    :title="LATEST_PATCH?.version ?? 'Latest patch'"
  >
    <template #head>
      <p class="eyebrow">{{ formatPatchDate(LATEST_PATCH?.date ?? '') }}</p>
    </template>

    <template v-if="LATEST_PATCH">
      <p class="lede patch__summary">{{ LATEST_PATCH.summary }}</p>
      <PatchNoteBody :patch="LATEST_PATCH" :limit-sections="2" />
      <div class="patch__more">
        <AppButton :to="`/patch-notes/${LATEST_PATCH.date}`" variant="secondary">
          Read the full patch notes
        </AppButton>
        <AppButton to="/patch-notes" variant="ghost">All patches →</AppButton>
      </div>
    </template>
  </PageSection>

  <!-- ── Getting a game ────────────────────────────────────── -->
  <PageSection eyebrow="Getting a game" title="Solo, co-op, or versus">
    <div class="ways">
      <AppCard padding="lg" as="article" class="way way--solo">
        <p class="eyebrow">On your own</p>
        <h3 class="way__title">Solo and co-op</h3>
        <p class="way__body">
          A computer opponent on a normal map does not really work. The melee AI does not understand
          a rolled faction. Survival maps do, because their attack waves are scripted. Load the mod
          onto <strong>Redstone Zerg Survival</strong> and play alone or with up to two friends.
        </p>
        <AppButton to="/how-to-play" variant="secondary">How to set it up</AppButton>
      </AppCard>

      <AppCard padding="lg" as="article" class="way way--versus">
        <p class="eyebrow">Against someone</p>
        <h3 class="way__title">1v1 up to 4v4</h3>
        <p class="way__body">
          The mod is built for versus play, and that is where reading your hand against a thinking
          opponent actually matters. Discord is the fastest way to find a game, and where patches
          and anything new get announced first.
        </p>
        <AppButton v-if="DISCORD_INVITE_IS_LIVE" :href="LINKS.discord">Join the Discord</AppButton>
        <AppButton v-else to="/community" variant="secondary">Community</AppButton>
      </AppCard>
    </div>
  </PageSection>
</template>

<style scoped>
/* ── Hero ─────────────────────────────────────────────────── */
.hero {
  /* Symmetric now that the fact strip, which supplied the bottom space, is gone. */
  padding-block: clamp(2.5rem, 1.5rem + 5vw, 5rem);
  border-bottom: 1px solid var(--c-border);
  /*
   * A single low-contrast radial, anchored top-left behind the headline.
   * Deliberately not a full-bleed gradient wash — that is the tell of a
   * template hero. It exists only to lift the type off the flat background.
   */
  background:
    radial-gradient(60rem 30rem at 12% -10%, rgba(34, 211, 238, 0.05), transparent 65%), var(--c-bg);
}

.hero__inner {
  display: grid;
  gap: var(--space-10);
  align-items: center;
  grid-template-columns: 1fr;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.hero__title {
  margin-top: var(--space-1);
  font-size: var(--fs-5xl);
  font-weight: var(--fw-black);
  text-transform: uppercase;
  /* The tight tracking that makes the headline read as a lockup also eats the
     word gaps at this size, so give the spaces back explicitly. */
  word-spacing: 0.12em;
}

.hero__title-alt {
  color: var(--c-text-secondary);
  font-weight: var(--fw-regular);
}

.hero__lede {
  max-width: 54ch;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.hero__small {
  max-width: 52ch;
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
  line-height: var(--lh-relaxed);
}

.roller-scale {
  max-width: 60ch;
  font-size: var(--fs-md);
  color: var(--c-text-muted);
  line-height: var(--lh-relaxed);
}

/* Explanation sits under the draw it describes, so the roller leads the section. */
.roller-notes {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-8);
  max-width: 62rem;
}

.curation {
  max-width: 60ch;
  font-size: var(--fs-md);
  color: var(--c-text-muted);
  line-height: var(--lh-relaxed);
}

.curation strong {
  color: var(--c-text);
  font-weight: var(--fw-medium);
}

.roller-scale strong {
  font-family: var(--font-mono);
  font-size: var(--fs-base);
  font-weight: var(--fw-medium);
  color: var(--c-text);
  /* 14 digits — let it wrap rather than push the layout wide on a phone. */
  overflow-wrap: anywhere;
}

/* ── Tenets ───────────────────────────────────────────────── */
.tenets {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
}

.tenet__title {
  font-size: var(--fs-lg);
  margin-bottom: var(--space-3);
}

.tenet__body {
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.tenets__more {
  margin-top: var(--space-6);
}

/* ── How it plays ─────────────────────────────────────────── */
.plays {
  display: grid;
  gap: var(--space-10);
  grid-template-columns: 1fr;
  align-items: start;
}

.plays__list {
  display: flex;
  flex-direction: column;
}

.play {
  padding-block: var(--space-5);
  border-top: 1px solid var(--c-border);
}

.play:last-child {
  border-bottom: 1px solid var(--c-border);
}

.play__title {
  font-size: var(--fs-lg);
  margin-bottom: var(--space-2);
}

.play__body {
  max-width: 56ch;
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

/* ── Start ────────────────────────────────────────────────── */
.start {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
  align-items: start;
}

.start__steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding-left: var(--space-6);
  font-size: var(--fs-lg);
  color: var(--c-text-secondary);
}

.start__steps strong {
  color: var(--c-text);
  font-weight: var(--fw-semibold);
}

.start__steps::marker {
  color: var(--c-text-muted);
}

.start__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-5);
}

/* ── Patch ────────────────────────────────────────────────── */
.patch__summary {
  margin-bottom: var(--space-8);
}

.patch__more {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

/* ── Getting a game ───────────────────────────────────────── */
.ways {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
}

.way {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
}

/* A quiet left edge distinguishes the two routes without color-coding them. */
.way--solo {
  border-left: 2px solid var(--c-border-strong);
}

.way--versus {
  border-left: 2px solid var(--c-accent);
}

.way__title {
  font-size: var(--fs-xl);
}

.way__body {
  flex: 1;
  color: var(--c-text-secondary);
  line-height: var(--lh-relaxed);
}

.way__body strong {
  color: var(--c-text);
  font-weight: var(--fw-semibold);
}

/* ── Breakpoints ──────────────────────────────────────────── */
@media (min-width: 60rem) {
  .hero__inner {
    grid-template-columns: 1.05fr 0.95fr;
    gap: var(--space-16);
  }
  .plays {
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-12);
  }
  .start {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
  }
}
</style>
