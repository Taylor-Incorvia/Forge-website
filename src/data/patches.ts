import type { Patch } from './types'

/**
 * Patch notes, transcribed verbatim from docs/patch-notes/ in the mod repo.
 *
 * Adding a patch: copy the doc into a new object at the TOP of this array and
 * keep the section grouping the doc uses. Bold spans in the source become
 * **double asterisks** here; PatchNoteBody renders them and nothing else, so
 * there is no Markdown dependency and no untrusted HTML.
 */

export const PATCHES: Patch[] = [
  {
    date: '2026-08-16',
    summary:
      'The big one: a "Your Faction" panel so you can actually see the hand you were dealt, live opponent scouting, a 12-worker start, a full caster overhaul, and a pile of cost and build-time tuning.',
    sections: [
      {
        title: 'New — The "Your Faction" Panel',
        items: [
          'At the start of every game, a panel shows **every unit you rolled** with its **rolled upgrade paired directly beneath it**, grouped by production facility.',
          '**Hover any icon** for its full description — the exact tooltip you would see on the command card.',
          'A **FACTION tab** on the left edge of the screen opens and closes it anytime.',
          'No more squinting at a chat message to remember what you rolled — your whole faction is one glance away.',
        ],
      },
      {
        title: "New — Scout Your Opponent's Rolls",
        items: [
          'Get **vision of an enemy building** and a row of icons floats above it showing what it can produce or research.',
          '**Barracks / Factory / Starport** show the units they can build. **Ghost Academy / Armory / Fusion Core** show the upgrades they can research.',
          '**Icon fog of war** — the icons show **only while you currently have vision** of the building and vanish the moment you lose sight of it, so *send a scout and keep watching*. Rolls are per-player, so scouting one building reveals that whole facility’s lineup. Scouting matters now.',
        ],
      },
      {
        title: 'New — 12-Worker Start',
        items: [
          'Games now open with **12 workers** rather than 8. Let us get this done.',
          'The Command Center grants **15 supply**.',
        ],
      },
      {
        title: 'Casters Overhauled',
        items: [
          '**+25% energy regeneration** when a caster researches its rolled spell. You get more casts of all of your spells, including the newly upgraded spell. I am keeping my eyes on this change. If it overperforms, I will look at other options.',
          'With regen doing that job, **spell energy costs moved back toward standard**: Force Field / Graviton Beam / Auto-Turret 40 to 50, Guardian Shield / Fungal Growth 50 to 75, Neural Parasite 75 to 100, Parasitic Bomb 100 to 125, Abduct 50 to 75, Irradiate 40 to 50.',
          '**Corsair** energy normalized to standard (200 max) so the new regen applies evenly.',
        ],
      },
      {
        title: 'Balance — Costs',
        items: [
          '**Thor:** gas cost reduced to **300/150**.',
          '**War Hound:** re-costed to **200/75**.',
          '**Goliath:** gas **50 to 75** — covering both air *and* ground on cheap gas made it too efficient for how flexible it is.',
          '**Raven, Viper:** minerals **100 to 75**. **Infestor:** minerals **100 to 50**.',
        ],
      },
      {
        title: 'Balance — Build Times (opening pacing)',
        items: [
          'Cheap early units now build a little slower, so **how many production buildings you open with matters again** — one building used to churn units out fast enough to soak nearly an entire base worth of eco, which flattened the opening. Slower now: **Zealot, Marine, Hydralisk, Sentry, Zergling, Vulture, Hellion, Mutalisk**.',
          '**War Hound:** build time fixed — it was somehow building *slower than a Thor*; now appropriately quick for its tier.',
          '**DuskWing:** the eye test was right — it was quietly a strictly-better Banshee (+50% DPS, +25% HP) that built *faster* on top of it. Cost **200/150 to 250/175** and build time **48 to 65** (now genuinely slower than a stock Banshee). It should be a premium unit you commit to, not one you flood over an army.',
          '**Immortal & Thor:** build times pulled back to standard (they were oddly slow before).',
          '**Stalker:** still builds fast from the Factory (its speed-up is kept, just trimmed slightly).',
        ],
      },
      {
        title: 'Balance — Units',
        items: [
          '**Hydralisk:** no longer starts with Grooved Spines (range 6 to 5). It already out-trades its cost on raw stats; range is now something it can *roll* instead of getting free.',
          '**Ultralisk:** no longer starts with free Anabolic Synthesis (speed). It was already fast, and a rolled Charge stacked on top made it absurdly fast — now it reverts to standard base speed and Charge is a fun roll instead of a game-breaker.',
        ],
      },
      {
        title: 'Removing useless upgrades',
        items: [
          '**Stim** removed from Zerglings.',
          '**Twin-Linked Flamethrowers** removed from the Hellion pool — a near-invisible dud. A proper "flame wall" upgrade is planned to replace it.',
        ],
      },
      {
        title: 'New upgrade cap',
        items: [
          '**Cloak is now one-per-faction:** only a single unit can roll cloak — Ghost, Wraith and DuskWing share one cap, so you cannot stack multiple cloaked units.',
        ],
      },
      {
        title: 'Quality of Life',
        items: [
          'Picked Zerg or Protoss? Your workers now **auto-mine at 0:00** like a Terran start — no more hand-ordering them onto minerals. Which race you pick now does not matter at all: just close your eyes and roll the dice.',
          'The **Queen** is now included in **Select All Army**.',
        ],
      },
      {
        title: 'Bug Fixes',
        items: [
          '**Disruption Web** tooltip now correctly states it stops **all** ground units and structures under it (yours and the enemy’s) — it is area denial, so cast it where the enemy is and keep your own units clear.',
          '**One upgrade per unit is now clearer** — you can no longer queue the same upgrade a second time. The research locks the moment you start it (it used to only lock on completion, so a redundant re-queue was possible; it never did anything but waste resources).',
          '**Tooltip corrections:** Missile Pods now reads **flat 60 damage to air**, Yamato **240** (was 260), and D8 Charge **30 damage (+100 vs structures)** (was 155) — the numbers now match what the abilities actually do.',
        ],
      },
    ],
  },
  {
    date: '2026-07-22',
    summary:
      'The first big drop: a new attack-slow upgrade, a smarter drafting system, a handful of unit-defining upgrades, and a pile of balance work.',
    sections: [
      {
        title: 'New Upgrade — Concussive Shells',
        items: [
          '13 units can now roll Concussive Shells: their attacks slow the target by 70% for about 2 seconds.',
          'On splash / cleave / bounce / cone attackers, the slow hits EVERY target caught in the swing — Archon (splash), Colossus (beam line), Mutalisk (bounce), Hellion and Firebat (flame cone), Marauder, Void Ray, and more.',
          'Hellbats keep it after transforming from a Hellion.',
          'Massive units shrug it off.',
        ],
      },
      {
        title: 'Nukes',
        items: ['Roll a Ghost and you can drop a **Tactical Nuke**.'],
      },
      {
        title: 'New Per-Unit Upgrades',
        items: [
          'Goliath — Ares-Class Weapons System: +3.5 anti-air range, +1.5 ground range.',
          'Phoenix — Anion Pulse-Crystals: +2.5 weapon range (and the beam turns purple).',
          'Liberator — Smart Servos: +50% move speed AND much faster transform to and from Defender Mode (~3.5s to ~1.4s).',
          'Battlecruiser can now roll Yamato Cannon.',
          'Cloak is now a rollable upgrade: the Wraith no longer starts cloaked (and is cheaper at 100/100); DuskWing cloak is a roll now too.',
          'Chitinous Plating (Ultralisk, +2 armor) is no longer a free start — it is a roll.',
        ],
      },
      {
        title: 'New Drafting System — Roll Caps',
        items: [
          'You can no longer roll the same upgrade across too many of your units. This was to increase upgrade variety in each game.',
          'Most upgrades cap at 2 units; some cap at 1 — Corrosive Bile, Yamato, Tactical Jump, Concussive Shells and every caster spell at 1.',
          'The roller is also smarter about tight units — small-pool units (Archon, Void Ray, Sentry) will not get stranded with a blank slot.',
        ],
      },
      {
        title: 'Fighter-Casters',
        items: [
          'Some units can now roll **either** a combat upgrade or a caster spell.',
          '**Pure casters** (Sentry, Medic, Infestor, High Templar, Raven, Viper) only roll caster spells.',
          '**Fighter-casters** — the Queen, Wraith, Phoenix, Corsair, and Ghost — pull from both pools: a Wraith might roll cloak, Guardian Shield, or Blink; a Queen might roll Corrosive Bile, Force Field, or Blink.',
        ],
      },
      {
        title: 'Unit & Pool Changes',
        items: [
          'Queen added to Barracks slot 2 as a fighter-caster (keeps Transfusion; other Zerg-only abilities removed from its card).',
          'Marine: cost raised to 50/25, and now starts with Combat Shield. At its old price the Marine was efficient enough to flatten the whole mode — instead of reacting to the hand you are dealt, the game collapsed into "mass Marines plus a couple of support units". Pricing it up restores the react-to-your-draft core that makes Wildcard Arena what it is.',
          'Hydralisk: 100/50, now starts with Grooved Spines.',
          'Archon: re-priced to 225/150.',
          'Corrosive Bile pool narrowed — pulled off units where it was too cheap, too expensive, or useless.',
          'Missile Pods reworked into a low-tier anti-air burst: flat 60 damage to all air (no more Light bonus), removed from the high-tier casters.',
          'Barracks slot 2 retuned: Marine builds a touch faster (17s to 15s).',
        ],
      },
      {
        title: 'Economy',
        items: ['Command Center cost increased to 400 minerals.'],
      },
      {
        title: 'Ability & Quality-of-Life',
        items: [
          'Build Auto Turret cast range increased (2 to 5) — actually placeable now when a ground unit rolls it.',
          'Blink on a burrowed Lurker or sieged Siege Tank now blinks first, then auto-unburrows / unsieges at the destination. Burrowed blinking Lurkers were too hard for the opponent to keep track of.',
          'The Stim visual flash now fires for any unit that rolled Stimpack.',
          'Caster ability hotkeys deconflicted. No more having to click on an ability because an ability granted by an upgrade had the same hotkey.',
          'Hotkey cleanup across production buildings — add-on builds moved to X, various train keys deconflicted.',
        ],
      },
      {
        title: 'Bug Fixes',
        items: [
          'Fixed D8 Charge (cluster bomb) not reaching Thor / War Hound (tag bug).',
          'Fixed the range indicator (the ring on the ground) not growing when a Tempest or sieged Siege Tank researches its range upgrade.',
        ],
      },
    ],
  },
]

export const PATCHES_BY_DATE: ReadonlyMap<string, Patch> = new Map(PATCHES.map((p) => [p.date, p]))

export const LATEST_PATCH = PATCHES[0]

/** "27 July 2026" — stable across locales, no Intl surprises during prerender. */
export function formatPatchDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  if (!y || !m || !d) return iso
  return `${d} ${months[m - 1]} ${y}`
}
