<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import PageSection from '@/components/layout/PageSection.vue'
import FactionRoller from '@/components/game/FactionRoller.vue'
import { useMeta } from '@/composables/useMeta'
import { SITE, FACTION_COMBINATIONS, LINKS, DISCORD_INVITE_IS_LIVE, mediaUrl } from '@/data/site'
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
 * card here and did not belong: it names what stays the same. It now sits under
 * the roller, with the rest of the constraint story.
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
          Every game deals you a randomized faction — a mash-up of units and upgrades from all three
          SC2 races.
        </p>
        <!--
          Two CTAs only: start playing, or go find someone to play against.
          /why-its-different is still reached from the reasoning section
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
      </div>

      <div class="hero__media">
        <!--
          Taylor's own cut (hero-box-art-fight.mp4, 1490x694), seconds 16-28,
          windowed to 1040x694 at x=130 — a 3:2 crop centred on the fight,
          which spans roughly x=300..1000 of the 1490 source. Narrowing to 3:2
          buys height at a fixed column width; centring it stops units being
          clipped at the left edge while dropping the static base terrain on the
          right. Encoded at the native crop size: upscaling to 1248 wide tripled
          the file size and added no detail.
          hero-battle.mp4 is still in public/media if you want the old hero.
        -->
        <MediaFrame
          :src="mediaUrl('hero-box-art-fight.mp4')"
          poster="/media/hero-box-art-fight-poster.jpg"
          kind="video"
          alt="A Wildcard Arena battle on open ground: two mixed-race armies trading fire, with beam weapons firing through the middle of the engagement."
          label="Gameplay clip"
          ratio="1040/694"
          priority
        />
      </div>
    </div>
  </section>

  <!--
    The roller and the constraint story are ONE block. They used to be two
    sections, two eyebrows and two CTAs answering the same question — is this
    real strategy or is it chaos — so the page argued it twice, with scaffolding
    around each half.
  -->
  <PageSection tone="sunken" title="This is one faction. Roll again and you get a different one.">
    <FactionRoller />
    <div class="roller-notes">
      <p class="roller-scale">
        Above is a real roll from the live game.
        <strong>{{ FACTION_COMBINATIONS.toLocaleString('en-US') }}</strong>
        possible factions. You'll never play the same one twice.
      </p>
      <p class="roller-scale">
        Rolls are not unrestricted. Units and upgrades are pooled to prevent both useless and
        oppressive factions, so the faction is random but winning is not: macro, micro and reading
        your opponent still decide every game.
        <RouterLink to="/upgrades">See how upgrades are pooled</RouterLink>.
      </p>
    </div>

    <!--
      Corroboration, not repetition. The roller is a website widget; this is the
      same thing inside the game, which is the question a sceptic actually has.
    -->
    <div class="panel">
      <MediaFrame
        src="/media/your-faction-panel.png"
        alt="The in-game Your Faction panel: three groups, one per production building, each showing the units rolled into its slots with the upgrade paired to each unit directly beneath."
        label="The “Your Faction” panel"
        ratio="425/589"
      />
    </div>
  </PageSection>

  <!-- ── What changes for the player ────────────────────────── -->
  <PageSection
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
      <AppButton to="/why-its-different" variant="ghost">Why it works this way →</AppButton>
    </div>
  </PageSection>

  <!--
    One closing block instead of three. "Getting in", "Solo, co-op, or versus"
    and the patch date were separate sections; they are all answers to "how do I
    actually start", and /how-to-play carries the long versions.
  -->
  <PageSection tone="sunken" title="Five clicks from the SC2 main menu">
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
          Wildcard Arena is a melee mod, so it is on the Melee tab. It loads with the map. No
          separate download, no client to install, and nothing to buy, since StarCraft II
          multiplayer is free.
        </p>
        <p class="prose">
          Playing alone,
          <RouterLink to="/how-to-play#survival">survival maps work</RouterLink>. A normal map with
          a computer opponent does not, because the melee AI has no idea what to do with a rolled
          faction. For versus, Discord is the fastest way to find someone.
        </p>
        <div class="start__cta">
          <AppButton to="/how-to-play">See the full walkthrough</AppButton>
          <AppButton v-if="DISCORD_INVITE_IS_LIVE" :href="LINKS.discord" variant="secondary">
            Join the Discord
          </AppButton>
        </div>
      </div>
    </div>

    <!-- The only thing the homepage needs from patch notes: proof it is alive. -->
    <p v-if="LATEST_PATCH" class="start__patch">
      Still in development.
      <template v-if="LATEST_PATCH.version">{{ LATEST_PATCH.version }} shipped</template>
      <template v-else>Last patch shipped</template>
      {{ formatPatchDate(LATEST_PATCH.date) }}.
      <RouterLink to="/patch-notes">Read the notes</RouterLink>.
    </p>
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

/* The in-game counterpart to the draw above it. Capped near the screenshot's
   own 425px width so the panel is never upscaled, which on a UI capture reads
   as blur rather than as a big image. */
.panel {
  margin-top: var(--space-8);
  max-width: 27rem;
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

.start__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

/* A footnote, not a section. Small enough that it never reads as a CTA. */
.start__patch {
  margin-top: var(--space-10);
  padding-top: var(--space-5);
  border-top: 1px solid var(--c-border);
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
}

.start__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-5);
}

/* ── Patch ────────────────────────────────────────────────── */
/* ── Getting a game ───────────────────────────────────────── */
/* ── Breakpoints ──────────────────────────────────────────── */
@media (min-width: 60rem) {
  /*
   * Weighted toward the media, not the copy. The lede is capped at 54ch and the
   * title wraps anyway, so the copy column had slack it was not using while the
   * video rendered about 532px wide. The narrower gap buys another 16px.
   * Copy still clears 54ch, so nothing reflows awkwardly.
   */
  .hero__inner {
    grid-template-columns: 0.85fr 1.15fr;
    gap: var(--space-12);
  }
  .start {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
  }
}
</style>
