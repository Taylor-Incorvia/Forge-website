/**
 * Site-wide constants. Everything that might change independently of the
 * design lives here so it is a one-line edit, not a search-and-replace.
 */

export const SITE = {
  name: 'Wildcard Arena',
  domain: 'wildcardarena.com',
  url: 'https://wildcardarena.com',
  tagline: "You don't pick your race. You're dealt one.",
  description:
    'Wildcard Arena is a StarCraft II melee mod. A random roster decides which units you can build and which upgrades you can research. You win by adapting to the hand you were dealt.',
  season: 'Season 1',
} as const

/**
 * Bumped on each rebuild during remote review sessions so it is obvious at a
 * glance whether the page you are looking at includes the latest change.
 * Rendered in the footer. Harmless to leave in.
 *
 * NOTE: edit this by hand or with the Edit tool. Do NOT rewrite this file with
 * PowerShell's Get-Content/Set-Content — that round-trips UTF-8 through the
 * system ANSI codepage and turns every em-dash and middot into mojibake.
 */
export const BUILD_STAMP = '2026-08-10 · rev 70'

export const LINKS = {
  /**
   * The one place the Discord invite is defined — the header, the homepage,
   * the footer and /community all read it from here.
   */
  discord: 'https://discord.gg/Mvy5zPA6x',
  /*
   * The mod repository is deliberately NOT linked from the site. It is public
   * for other reasons, not as a player-facing resource, and sending players to
   * a Galaxy-script repo is not a useful destination. Add a link only if you
   * decide you want contributions.
   */
} as const

/** Set to false to hide every Discord CTA site-wide (e.g. if an invite expires). */
export const DISCORD_INVITE_IS_LIVE = true

export const RACE_LABEL: Record<'terran' | 'protoss' | 'zerg', string> = {
  terran: 'Terran',
  protoss: 'Protoss',
  zerg: 'Zerg',
}

export const FACILITY_LABEL: Record<'barracks' | 'factory' | 'starport', string> = {
  barracks: 'Barracks',
  factory: 'Factory',
  starport: 'Starport',
}

/**
 * Add-ons GATE a facility's top slot — they do not double production.
 * This is intentionally not stock reactor behavior and is the single most
 * commonly misread mechanic, so it is stated wherever slots are shown.
 */
export const FACILITY_ADDON: Record<'barracks' | 'factory' | 'starport', string> = {
  barracks: 'Tech Lab',
  factory: 'Reactor',
  starport: 'Tech Reactor',
}

/** Slot count per facility, used by the roller and the slot tables. */
export const FACILITY_SLOTS: Record<'barracks' | 'factory' | 'starport', 3 | 4> = {
  barracks: 4,
  factory: 3,
  starport: 3,
}

/**
 * 2 · 3 · 4 · 3 · 3 · 7 · 3 · 4 · 4 · 4 — from upgrade-pools-by-unit.md.
 * Units only; upgrade rolls multiply this much further.
 *
 * Nothing renders this any more. Kept because it is the working behind
 * FACTION_COMBINATIONS below, and that derivation is worth not losing.
 */
export const UNIT_COMBINATIONS = 290_304

/**
 * Distinct factions the roller can legally deal: unit line-ups multiplied by
 * upgrade draws, after applying BOTH hard legality rules —
 *   1. roll caps, counted per cap family (WA-049), and
 *   2. the same-slot collision rule, which forbids one upgrade id appearing at
 *      the same slot index across facilities (they share a research ability).
 *
 * Counted against the trigger libraries, not estimated. For reference, the
 * intermediate figures from the same count:
 *   ~32.8 trillion  with neither rule applied
 *    18,251,492,428,288  collision rule only
 *    12.45 trillion  caps only
 *     9,121,034,239,598  both — the number we publish, at 27.82% of uncapped
 *
 * Caveat worth keeping in mind before quoting this anywhere else: it counts
 * *legal* factions. The mod can also emit cap-violating draws, because
 * `chooseUpgradeForSlotWithinCaps` falls back to a collision-free but over-cap
 * roll when no under-cap candidate exists. So this is not the size of the live
 * output distribution, which is neither uniform nor strictly cap-bounded.
 */
export const FACTION_COMBINATIONS = 9_121_034_239_598
