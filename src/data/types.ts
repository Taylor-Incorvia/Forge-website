/**
 * Shared shapes for the hand-maintained game data.
 *
 * Data strategy (v1): everything here is transcribed by hand from the mod
 * repo's audit docs. There is deliberately no build-time sync or scraping —
 * after a patch you update the docs, then update these files.
 */

export type Race = 'terran' | 'protoss' | 'zerg'

export type Facility = 'barracks' | 'factory' | 'starport'

/** Barracks has 4 slots; Factory and Starport have 3. */
export type SlotNumber = 1 | 2 | 3 | 4

/**
 * Roll behavior, as defined in the 2026-07-22 patch notes:
 * pure casters only roll caster spells, fighter-casters pull from both pools.
 */
export type UnitRole = 'fighter' | 'fighter-caster' | 'caster'

export type WeaponTarget = 'ground' | 'air' | 'both'

export interface Weapon {
  /** Catalog weapon name, e.g. "PunisherGrenades". */
  name: string
  target: WeaponTarget
  /** Human-readable damage expression, kept verbatim from the audit. */
  damage: string
  /**
   * Attack period in CATALOG seconds. Never render directly — use
   * `formatPeriod()`, which divides by the Faster multiplier.
   */
  periodCatalog?: number
  /** Weapon range, or a note when range lives on the launch effect. */
  range?: string
  /**
   * DPS at CATALOG speed, as a free-text expression that may carry conditional
   * variants ("5.7 (8.6 vs Light)"). Never render directly — use `formatDps()`,
   * which scales every number in the string to Faster.
   *
   * Damage per hit is NOT scaled: a hit does the same damage at any game speed.
   * Only the rate changes, which is why period shrinks and DPS grows.
   */
  dpsCatalog: string
  /** Which unit form this weapon belongs to, for multi-form units. */
  form?: string
  note?: string
}

export interface Cost {
  minerals: number
  vespene: number
}

export interface Unit {
  /** Catalog id — also the route param and the join key for upgrade pools. */
  id: string
  name: string
  race: Race
  facility: Facility
  slot: SlotNumber
  role: UnitRole
  cost: Cost
  supply: number
  /**
   * Build time in CATALOG seconds (standard speed), exactly as unit-stats.md
   * lists it, so re-transcribing stays a straight copy.
   *
   * Never render this directly — multiplayer only ever runs on "Faster", so the
   * catalog number is one no player will experience. Always go through
   * `formatBuildTime()`, which converts it.
   */
  buildTimeCatalog: number
  life: number
  shields?: number
  armor: number
  speed: number
  energy?: { start: number; max: number }
  attributes: string[]
  weapons: Weapon[]
  /**
   * Where the mod differs from the BASE GAME as it stands today. Drives the
   * "Changed from the base game" section on a unit's page.
   *
   * Two rules, both learned the hard way:
   *
   * 1. Patch notes describe changes relative to the previous *mod* build, not
   *    relative to StarCraft II. A patch that removes something an earlier patch
   *    added is a revert TO stock and does not belong here. Ask "does this
   *    differ from stock right now?", not "did a patch mention it?".
   *
   * 2. It must be a comparison stock can actually make. Mod-system behavior
   *    with no stock counterpart is not a "change from the base game" — a
   *    Siege Tank cannot Blink in StarCraft II at all, so how Blink interacts
   *    with siege mode has nothing to compare against. That belongs on the
   *    upgrade, not here.
   *
   * 3. ONLY for units in current SC2 multiplayer. The audience is ladder
   *    players; they know what a Marine costs and find "costs 25 gas here"
   *    genuinely interesting. They have no baseline for a Firebat, Vulture,
   *    Corsair, Wraith, DuskWing, Goliath, Medic, Diamondback or War Hound —
   *    citing a campaign or Brood War price is noise — it implies a shared
   *    reference point that does not exist.
   *    A fact about playing THIS mod (the Vulture's lack of traps) is not a
   *    comparison — put it in `notes`.
   *
   * 4. The comparison must be to something a player has EXPERIENCED, not to a
   *    number in Blizzard's data. An Archon's catalog price is meaningless
   *    because stock Archons are only ever created by merging Templar — but
   *    "you cannot merge Templar here" lands immediately.
   */
  modOverrides?: string[]
  /** Caveats and clarifications carried over from the audit doc. */
  notes?: string[]
  /**
   * Optional portrait. Drop a file into `public/units/` and set the path —
   * the card reserves the space either way, so no layout changes are needed.
   */
  image?: string
}

export type UpgradeCategory =
  'caster' | 'combat' | 'mobility' | 'range' | 'defense' | 'stealth' | 'utility'

export interface Upgrade {
  /** Internal id used in the trigger libraries and the pool audit. */
  id: string
  /** Display name. Falls back to a descriptive name where the docs name none. */
  name: string
  category: UpgradeCategory
  /**
   * How many of a player's units may roll this in one game (WA-049).
   * Caps limit rolls, not pool membership.
   */
  cap: 1 | 2
  /**
   * Only present where a patch note or audit describes the effect. Shown on the
   * Upgrades reference page only — never in the faction roller, which shows
   * names alone so it reads as a hand of cards rather than documentation.
   *
   * Where an upgrade does something its stock StarCraft II counterpart does
   * not, put that in the NAME instead ("Smart Servos + Move Speed"). It reads
   * at a glance and needs no explanatory chrome around it.
   */
  description?: string
  /**
   * DISPLAY grouping only — collapses entries that share a name so the UI
   * shows "Concussive Shells" once instead of 13 times. This is not the cap.
   */
  family?: string
  /**
   * CAP grouping — upgrades registered into the same family in
   * `upgradeFamilyHelpers.galaxy` share ONE cap between them, rather than each
   * having its own. Two families exist:
   *   'concussive' — PunisherGrenades + 12 Concussive* variants, cap 1 total
   *   'range'      — Range, SiegeTankRange, TempestRange, GoliathRange,
   *                  PhoenixRangeUpgrade, LurkerRange, cap 2 total
   *   'cloak'      — PersonalCloaking, WraithCloak, BansheeCloak, cap 1 total
   *
   * Deliberately distinct from `family`: Goliath, Phoenix and Lurker share the
   * range CAP but display separately, because their in-game names and effects
   * differ. Only the upgrades literally labelled "Range" on the command card
   * are collapsed into one display entry.
   */
  capFamily?: string
}

export interface PatchSection {
  title: string
  items: string[]
}

export interface Patch {
  /** ISO date, also the route param. */
  date: string
  /** Version headline where the patch declares one. */
  version?: string
  summary: string
  sections: PatchSection[]
}
