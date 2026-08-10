<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import PageSection from '@/components/layout/PageSection.vue'
import FactionRoller from '@/components/game/FactionRoller.vue'
import { useMeta } from '@/composables/useMeta'
import { SITE, FACTION_COMBINATIONS, LINKS, DISCORD_INVITE_IS_LIVE } from '@/data/site'
import { LATEST_PATCH, formatPatchDate } from '@/data/patches'

useMeta({
  title: SITE.name,
  description: SITE.description,
  path: '/',
})

/**
 * What changes for the player, rather than the design tenets. The tenets
 * (memorization wall / stale meta / per-unit balance) argue why the design is
 * good and still lead /why-its-different; these say what a game feels like,
 * which is what someone deciding whether to try it actually needs.
 *
 * Strictly what CHANGES. "You still macro like standard StarCraft" was a third
 * card here and did not belong: it names what stays the same. It now closes the
 * Curated section, which is the reassurance beat.
 */
const CHANGES = [
  {
    title: 'No build orders to memorize',
    body: 'The opener you have drilled a thousand times does not exist here. You work out what your faction is good at while you are playing it.',
  },
  {
    title: 'No matchup autopilot',
    body: 'You are not playing TvZ for the thousandth time. Both factions are new, so you have to read what is actually in front of you.',
  },
]
</script>

<template>
  <!-- ── Hero ──────────────────────────────────────────────── -->
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">StarCraft II multiplayer mod</p>
        <h1 class="hero__title">
          You don’t pick your race.<br />
          <span class="hero__title-alt">You’re dealt one.</span>
        </h1>
        <p class="lede hero__lede">
          Wildcard Arena is a mod for standard StarCraft II multiplayer, where every game deals you
          a procedurally generated faction built from units and upgrades across all three races.
        </p>
        <!--
          Two CTAs only: start playing, or go find someone to play against.
          /why-its-different is still reached from the design-thesis section
          below and from the header, so it loses nothing by leaving the hero.
        -->
        <div class="hero__cta">
          <AppButton to="/how-to-play" size="lg">How to play</AppButton>
          <AppButton
            v-if="DISCORD_INVITE_IS_LIVE"
            :href="LINKS.discord"
            variant="secondary"
            size="lg"
          >
            Join the Discord
          </AppButton>
        </div>
        <!--
          "Melee mod" is kept, but demoted to here: it is the word you need in
          the lobby, not the word that explains what this is. The lede defines
          the thing in language that needs no glossary; this teaches the term
          next to the instruction where it becomes useful.
        -->
        <p class="hero__small">
          It loads with the lobby as a melee mod, not an Arcade map. StarCraft II multiplayer is
          free. Nothing to buy, nothing to download.
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
        Each slot holds one unit type you can build all game, and each of those units is dealt one
        upgrade. The randomness is in the menu: build from a slot and you get that unit, every time.
      </p>
      <p class="roller-scale">
        That is a real draw, obeying the same pools and caps the mod uses at the beginning of each
        game. There are
        <strong>{{ FACTION_COMBINATIONS.toLocaleString('en-US') }}</strong> possible rolls.
      </p>
    </div>

    <div class="panel">
      <MediaFrame
        label="The “Your Faction” panel"
        hint="The in-game panel showing every rolled unit with its paired upgrade, grouped by facility. This is the single most useful screenshot for explaining the mod."
        ratio="4/3"
        caption="The same thing in game. Your whole faction, one glance away."
      />
    </div>
  </PageSection>

  <!-- ── Randomness is constrained, not arbitrary ───────────── -->
  <PageSection
    eyebrow="Variety inside constraints"
    title="Curated, not chaos"
    lede="The rolls are rigged for fairness to prevent both useless and oppressive ones. The faction is random. Winning is not: macro, micro and reading your opponent still decide every game."
  >
    <AppButton to="/upgrades" variant="ghost">See how upgrades are pooled →</AppButton>
  </PageSection>

  <!-- ── What changes for the player ────────────────────────── -->
  <PageSection
    tone="sunken"
    eyebrow="What changes"
    title="What if StarCraft didn’t have fixed matchups?"
    lede="StarCraft II strategy has been thoroughly explored through the lenses of Terran, Protoss and Zerg. Wildcard Arena takes those lenses away."
  >
    <div class="tenets">
      <AppCard v-for="item in CHANGES" :key="item.title" padding="lg" as="article">
        <h3 class="tenet__title">{{ item.title }}</h3>
        <p class="tenet__body">{{ item.body }}</p>
      </AppCard>
    </div>
    <div class="tenets__more">
      <AppButton to="/why-its-different" variant="ghost">Read the design thesis →</AppButton>
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

  <!--
    Deliberately just a dated line. The balance detail belongs on /patch-notes;
    what the homepage needs from it is the one thing a stranger actually wonders
    about a mod, which is whether it is still alive. A date answers that.
  -->
  <PageSection tone="sunken" eyebrow="Still in development" title="Latest patch">
    <p v-if="LATEST_PATCH" class="lede patch__line">
      <strong>{{ LATEST_PATCH.version }}</strong> shipped {{ formatPatchDate(LATEST_PATCH.date) }}.
    </p>
    <div class="patch__more">
      <AppButton to="/patch-notes" variant="ghost">Read the patch notes →</AppButton>
    </div>
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

/* The in-game counterpart to the draw above it. Capped so a 4/3 frame does not
   tower over the roller it is meant to corroborate. */
.panel {
  margin-top: var(--space-8);
  max-width: 34rem;
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
.patch__line strong {
  color: var(--c-text);
  font-weight: var(--fw-medium);
}

.patch__more {
  margin-top: var(--space-4);
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
  .start {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
  }
}
</style>
