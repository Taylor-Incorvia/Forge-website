import type { Upgrade } from './types'

/**
 * Rollable upgrades and the per-unit pools they come from.
 *
 * Source: docs/audits/upgrade-pools-by-unit.md (snapshot 2026-07-23), with the
 * two removals from docs/patch-notes/2026-07-27.md applied (see units.ts).
 *
 * NAMING RULE — we do not invent lore names. Where a patch note or audit names
 * an upgrade, that name is used. Where it does not, the name is a plain
 * description of what the internal id says. Internal ids are NOT shown in the
 * UI — they are only the join key back to the trigger libraries — so the `name`
 * has to stand on its own for a player.
 *
 * Where an upgrade does more than its stock StarCraft II counterpart, say so in
 * the name ("Smart Servos + Move Speed") rather than in prose around it.
 *
 * CAPS (WA-049) limit how many of a player's units may *roll* an upgrade in one
 * game. They do not change pool membership.
 */

export const UPGRADES: Upgrade[] = [
  // ── Mobility ──────────────────────────────────────────────
  {
    id: 'Blink',
    name: 'Blink',
    category: 'mobility',
    cap: 2,
    description:
      'Short-range teleport. On a burrowed Lurker or a sieged Siege Tank it blinks first, then auto-unburrows or unsieges at the destination.',
  },
  {
    id: 'Speed',
    name: 'Movement Speed',
    category: 'mobility',
    cap: 2,
    description: 'A permanent +50% movement speed.',
  },
  {
    id: 'Charge',
    name: 'Charge + Move Speed',
    category: 'mobility',
    cap: 2,
    description:
      'Leap onto nearby enemies to intercept them, plus a permanent +50% move speed. Melee units only.',
  },
  {
    id: 'HotSRaptorCharge2',
    name: 'Raptor Charge',
    category: 'mobility',
    cap: 2,
    description: 'Pounces onto its attack target every 2 seconds, and can leap up and down cliffs.',
  },
  {
    id: 'Hyperjump',
    name: 'Tactical Jump',
    category: 'mobility',
    cap: 1,
    description:
      'After about 6 seconds the unit warps to any point on the map and is invulnerable while warping. No vision of the destination is needed.',
  },
  {
    id: 'zerglingmovementspeed',
    name: 'Metabolic Boost',
    category: 'mobility',
    cap: 2,
  },
  {
    id: 'stalkerblinkcooldown',
    name: 'Stalker Blink Cooldown',
    category: 'mobility',
    cap: 2,
    description: 'Reduces Blink cooldown by 50%.',
  },
  {
    id: 'stalkerblinkrange',
    name: 'Stalker Blink Range',
    category: 'mobility',
    cap: 2,
    description: 'Doubles Blink range and increases the Stalker’s sight range to 16.',
  },
  {
    id: 'LiberatorSiegeSpeed',
    name: 'Smart Servos + Move Speed',
    category: 'mobility',
    cap: 2,
    description:
      '+50% move speed, and a much faster transform to and from Defender Mode (roughly 3.5s down to 1.4s).',
  },

  // ── Range ─────────────────────────────────────────────────
  {
    id: 'Range',
    name: 'Weapon Range',
    category: 'range',
    cap: 2,
    capFamily: 'range',
    family: 'range',
    description: '+2.5 weapon range.',
  },
  {
    id: 'GoliathRange',
    capFamily: 'range',
    name: 'Ares-Class Weapons System',
    category: 'range',
    cap: 2,
    description: '+3.5 anti-air range and +1.5 ground range.',
  },
  {
    id: 'PhoenixRangeUpgrade',
    capFamily: 'range',
    name: 'Anion Pulse-Crystals',
    category: 'range',
    cap: 2,
    description: '+2.5 weapon range.',
  },
  {
    id: 'TempestRange',
    capFamily: 'range',
    family: 'range',
    name: 'Tempest Range',
    category: 'range',
    cap: 2,
  },
  {
    id: 'SiegeTankRange',
    capFamily: 'range',
    family: 'range',
    name: 'Siege Tank Range',
    category: 'range',
    cap: 2,
  },
  {
    id: 'LurkerRange',
    name: 'Seismic Spines',
    category: 'range',
    cap: 2,
    capFamily: 'range',
    description: '+2 attack range, to 10, and two extra spines on the attack line.',
  },

  // ── Combat ────────────────────────────────────────────────
  {
    id: 'Stimpack',
    name: 'Stimpack',
    category: 'combat',
    cap: 2,
    description: 'Temporarily boosts move and attack speed at the cost of health.',
  },
  {
    id: 'zerglingattackspeed',
    name: 'Adrenal Glands',
    category: 'combat',
    cap: 2,
  },
  {
    id: 'RavagerCorrosiveBile',
    name: 'Corrosive Bile',
    category: 'combat',
    cap: 1,
    description:
      'Launches a bile that deals 60 damage to everything in the area on impact, and destroys Force Fields.',
  },
  {
    id: 'Yamato',
    name: 'Yamato Cannon',
    category: 'combat',
    cap: 1,
    description: '240 damage to a single target.',
  },
  {
    id: 'D8Charge',
    name: 'D-8 Charge',
    category: 'combat',
    cap: 2,
    description:
      'A cluster charge that explodes after a short delay for 30 splash damage, and +100 against structures.',
  },
  {
    id: 'HighCapacityBarrels',
    name: 'Infernal Pre-Igniter',
    category: 'combat',
    cap: 2,
    description:
      'Blue flame. +5 attack damage vs Light on the Hellion (to +11), and +12 vs Light in Hellbat form. The flame turns blue.',
  },
  {
    id: 'ClusterWarheads',
    name: 'Cluster Warheads',
    category: 'combat',
    cap: 2,
    description: 'Adds splash damage to the Dusk Wing’s attack.',
  },
  {
    id: 'LifestealMarine',
    name: 'Marine Lifesteal',
    category: 'combat',
    cap: 2,
    description: 'The Marine’s attacks heal it for 15% of the damage they deal.',
  },

  // ── Concussive family — 13 units, ONE shared cap of 1 ──────
  {
    id: 'PunisherGrenades',
    name: 'Concussive Shells',
    category: 'combat',
    cap: 1,
    family: 'concussive',
    capFamily: 'concussive',
    description:
      'Attacks slow the target by 70% for 2 seconds. On splash, cleave, bounce and cone attackers the slow hits every target caught in the swing. Massive units shrug it off.',
  },
  ...(
    [
      'ConcussiveZergling',
      'ConcussiveZealot',
      'ConcussiveFirebat',
      'ConcussiveSentry',
      'ConcussiveVulture',
      'ConcussiveHellion',
      'ConcussiveDiamondback',
      'ConcussiveArchon',
      'ConcussiveColossus',
      'ConcussiveWraith',
      'ConcussiveMutalisk',
      'ConcussiveVoidRay',
    ] as const
  ).map<Upgrade>((id) => ({
    id,
    name: 'Concussive Shells',
    category: 'combat',
    cap: 1,
    family: 'concussive',
    capFamily: 'concussive',
    description:
      'Attacks slow the target by 70% for 2 seconds. On splash, cleave, bounce and cone attackers the slow hits every target caught in the swing. Massive units shrug it off.',
  })),

  // ── Defense ───────────────────────────────────────────────
  {
    id: 'ChitinousPlating',
    name: 'Chitinous Plating',
    category: 'defense',
    cap: 2,
    description: '+2 armor.',
  },

  // ── Stealth ───────────────────────────────────────────────
  {
    id: 'WraithCloak',
    name: 'Cloak',
    category: 'stealth',
    cap: 1,
    capFamily: 'cloak',
    family: 'cloak',
    description: 'Invisible to enemies without detection.',
  },
  {
    id: 'BansheeCloak',
    name: 'Cloak',
    category: 'stealth',
    cap: 1,
    capFamily: 'cloak',
    family: 'cloak',
    description: 'Invisible to enemies without detection.',
  },
  {
    id: 'PersonalCloaking',
    name: 'Personal Cloaking',
    category: 'stealth',
    cap: 1,
    capFamily: 'cloak',
    family: 'cloak',
    description: 'Invisible to enemies without detection.',
  },

  {
    id: 'DiggingClaws',
    name: 'Adaptive Talons + Move Speed',
    category: 'mobility',
    cap: 2,
    description: '+50% movement speed, and burrows or sieges faster.',
  },

  // ── Caster spells — every one is capped at 1 ───────────────
  {
    id: 'CorsairMPDisruptionWeb',
    name: 'Disruption Web',
    category: 'caster',
    cap: 1,
    description:
      'Every ground unit and structure underneath it, friendly and enemy alike, cannot attack. It is area denial, so cast it where the enemy is and keep your own units clear.',
  },
  {
    id: 'ForceField',
    name: 'Force Field',
    category: 'caster',
    cap: 1,
    description:
      'Raises a barrier for 15 seconds that blocks ground movement. Massive units shatter it. 50 energy.',
  },
  {
    id: 'GuardianShield',
    name: 'Guardian Shield',
    category: 'caster',
    cap: 1,
    description: 'An aura that reduces incoming ranged damage to nearby allies by 2. 75 energy.',
  },
  {
    id: 'GravitonBeam',
    name: 'Graviton Beam',
    category: 'caster',
    cap: 1,
    description:
      'Lifts a target unit into the air for up to 10 seconds, disabling it while the caster channels. Massive units are immune. 50 energy.',
  },
  {
    id: 'MissilePods',
    name: 'Missile Pods',
    category: 'caster',
    cap: 1,
    description:
      'A low-tier anti-air burst: flat 60 damage to all air units in the target area, with no Light bonus. 75 energy.',
  },
  {
    id: 'BuildAutoTurret',
    name: 'Auto-Turret',
    category: 'caster',
    cap: 1,
    description:
      'Deploys a timed defensive turret. Cast range is raised from 2 to 5, so a ground unit can actually place it. 50 energy.',
  },
  {
    id: 'SeekerMissile',
    name: 'Seeker Missile',
    category: 'caster',
    cap: 1,
    description:
      'Charges for 4 seconds, then chases its target for 100 damage plus splash. Fizzles if the target escapes 13 range.',
  },
  {
    id: 'RavenScramblerMissile',
    name: 'Scrambler Missile',
    category: 'caster',
    cap: 1,
    description:
      'Disables a Mechanical or Psionic unit for 11 seconds so it cannot attack or use abilities, and reveals cloaked units.',
  },
  {
    id: 'FungalGrowth',
    name: 'Fungal Growth',
    category: 'caster',
    cap: 1,
    description:
      'Roots enemies in the area, slows them by 75% and deals about 25 damage over its duration. Reveals cloaked and burrowed units, and blocks Blink and transports. 75 energy.',
  },
  {
    id: 'NeuralParasite',
    name: 'Neural Parasite',
    category: 'caster',
    cap: 1,
    description: 'Mind-controls a target enemy unit while the caster channels. 100 energy.',
  },
  {
    id: 'ParasiticBomb',
    name: 'Parasitic Bomb',
    category: 'caster',
    cap: 1,
    description:
      'Attaches a cloud dealing 120 damage over 7 seconds to the target and nearby enemy air units. Cannot target ground. 125 energy.',
  },
  {
    id: 'BlindingCloud',
    name: 'Blinding Cloud',
    category: 'caster',
    cap: 1,
    description:
      'Creates a cloud that cuts the attack range of ground units and structures beneath it to melee.',
  },
  {
    id: 'Irradiate',
    name: 'Irradiate',
    category: 'caster',
    cap: 1,
    description:
      'A 30-second damage-over-time centered on the target, damaging nearby biological units. Does not damage mechanical units directly. 50 energy.',
  },
  {
    id: 'Yoink',
    name: 'Abduct',
    category: 'caster',
    cap: 1,
    description: 'Pulls a target unit to the caster. 75 energy.',
  },
  {
    id: 'ArbiterMPRecall',
    name: 'Recall',
    category: 'caster',
    cap: 1,
    description: 'Teleports every friendly unit in the target area to the caster.',
  },
]

export const UPGRADES_BY_ID: ReadonlyMap<string, Upgrade> = new Map(UPGRADES.map((u) => [u.id, u]))

/**
 * Which upgrades each unit can roll. This is the single source of truth for the
 * relationship — unit pages and upgrade pages both derive from it, so the two
 * views can never drift apart.
 */
export const UNIT_POOLS: Record<string, readonly string[]> = {
  // BARRACKS
  Zergling: [
    'Blink',
    'HotSRaptorCharge2',
    'zerglingattackspeed',
    'zerglingmovementspeed',
    'ConcussiveZergling',
  ],
  Zealot: ['Blink', 'HotSRaptorCharge2', 'Charge', 'Stimpack', 'ConcussiveZealot'],
  Hydralisk: ['Blink', 'Range', 'Speed', 'Stimpack', 'RavagerCorrosiveBile'],
  Marine: ['Blink', 'Range', 'Speed', 'Stimpack', 'LifestealMarine'],
  Queen: [
    'CorsairMPDisruptionWeb',
    'ForceField',
    'GuardianShield',
    'GravitonBeam',
    'MissilePods',
    'Blink',
    'Range',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
  ],
  Firebat: [
    'Blink',
    'HotSRaptorCharge2',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'ConcussiveFirebat',
  ],
  Marauder: ['Blink', 'Range', 'Speed', 'Stimpack', 'RavagerCorrosiveBile', 'PunisherGrenades'],
  Sentry: ['CorsairMPDisruptionWeb', 'GravitonBeam', 'MissilePods', 'ConcussiveSentry'],
  Medic: ['CorsairMPDisruptionWeb', 'ForceField', 'GuardianShield', 'GravitonBeam', 'MissilePods'],
  Ghost: [
    'BlindingCloud',
    'BuildAutoTurret',
    'FungalGrowth',
    'Irradiate',
    'NeuralParasite',
    'ParasiticBomb',
    'RavenScramblerMissile',
    'SeekerMissile',
    'Yoink',
    'Blink',
    'Range',
    'Speed',
    'Stimpack',
    'PersonalCloaking',
  ],
  Infestor: [
    'ArbiterMPRecall',
    'BlindingCloud',
    'BuildAutoTurret',
    'Irradiate',
    'ParasiticBomb',
    'RavenScramblerMissile',
    'SeekerMissile',
    'Yoink',
  ],
  HighTemplar: [
    'ArbiterMPRecall',
    'BlindingCloud',
    'BuildAutoTurret',
    'FungalGrowth',
    'Irradiate',
    'NeuralParasite',
    'ParasiticBomb',
    'RavenScramblerMissile',
    'SeekerMissile',
    'Yoink',
  ],

  // FACTORY
  Vulture: ['Blink', 'Range', 'Speed', 'Stimpack', 'ConcussiveVulture'],
  Hellion: ['Blink', 'Speed', 'Stimpack', 'HighCapacityBarrels', 'ConcussiveHellion'],
  Stalker: [
    'Range',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'stalkerblinkcooldown',
    'stalkerblinkrange',
  ],
  Diamondback: [
    'Blink',
    'Range',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'ConcussiveDiamondback',
  ],
  Immortal: ['Blink', 'D8Charge', 'Range', 'Speed', 'Stimpack'],
  SiegeTank: ['Blink', 'DiggingClaws', 'Stimpack', 'SiegeTankRange'],
  WarHound: ['Blink', 'D8Charge', 'Range', 'Speed', 'Stimpack', 'RavagerCorrosiveBile'],
  Archon: ['Blink', 'Range', 'Speed', 'ConcussiveArchon'],
  LurkerMP: ['Blink', 'LurkerRange', 'DiggingClaws', 'Stimpack'],
  Goliath: ['Blink', 'GoliathRange', 'Speed', 'Stimpack', 'RavagerCorrosiveBile'],
  ThorAP: ['Blink', 'D8Charge', 'Range', 'Speed', 'Stimpack', 'Yamato'],
  Ultralisk: [
    'Blink',
    'HotSRaptorCharge2',
    'Range',
    'Charge',
    'Stimpack',
    'Yamato',
    'ChitinousPlating',
  ],
  Colossus: ['Blink', 'Range', 'Speed', 'Stimpack', 'Yamato', 'Hyperjump', 'ConcussiveColossus'],

  // STARPORT
  CorsairMP: [
    'ForceField',
    'GuardianShield',
    'GravitonBeam',
    'MissilePods',
    'Blink',
    'Range',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'Hyperjump',
  ],
  Phoenix: [
    'CorsairMPDisruptionWeb',
    'ForceField',
    'GuardianShield',
    'MissilePods',
    'Blink',
    'PhoenixRangeUpgrade',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'Hyperjump',
  ],
  Wraith: [
    'CorsairMPDisruptionWeb',
    'ForceField',
    'GuardianShield',
    'GravitonBeam',
    'MissilePods',
    'Blink',
    'Range',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'WraithCloak',
    'Hyperjump',
    'ConcussiveWraith',
  ],
  VikingFighter: ['Blink', 'Range', 'Speed', 'Stimpack', 'RavagerCorrosiveBile', 'Hyperjump'],
  Liberator: ['Blink', 'LiberatorSiegeSpeed', 'Stimpack', 'RavagerCorrosiveBile'],
  Mutalisk: [
    'Blink',
    'Range',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'Hyperjump',
    'ConcussiveMutalisk',
  ],
  DuskWing: [
    'Blink',
    'Range',
    'Speed',
    'Stimpack',
    'RavagerCorrosiveBile',
    'ClusterWarheads',
    'BansheeCloak',
    'Hyperjump',
  ],
  VoidRay: ['Blink', 'Range', 'Speed', 'ConcussiveVoidRay'],
  Raven: [
    'ArbiterMPRecall',
    'BlindingCloud',
    'FungalGrowth',
    'Irradiate',
    'NeuralParasite',
    'ParasiticBomb',
    'SeekerMissile',
    'Yoink',
  ],
  Tempest: ['Blink', 'Stimpack', 'Yamato', 'TempestRange', 'Hyperjump'],
  Viper: [
    'ArbiterMPRecall',
    'BuildAutoTurret',
    'FungalGrowth',
    'Irradiate',
    'NeuralParasite',
    'RavenScramblerMissile',
    'SeekerMissile',
  ],
  Battlecruiser: ['Blink', 'Range', 'Speed', 'Stimpack', 'Yamato'],
}

/** Reverse index: which units can roll a given upgrade. Derived, never hand-kept. */
export const UNITS_BY_UPGRADE: ReadonlyMap<string, readonly string[]> = (() => {
  const map = new Map<string, string[]>()
  for (const [unitId, pool] of Object.entries(UNIT_POOLS)) {
    for (const upgradeId of pool) {
      const list = map.get(upgradeId)
      if (list) list.push(unitId)
      else map.set(upgradeId, [unitId])
    }
  }
  return map
})()

/**
 * Upgrades grouped for display. Concussive Shells appears once instead of 13
 * times, and Cloak once instead of twice, while the underlying per-unit ids stay
 * faithful to the trigger data.
 */
export interface UpgradeGroup {
  key: string
  upgrade: Upgrade
  /** Every internal id that rolls up into this group. */
  ids: string[]
  unitIds: string[]
}

export const UPGRADE_GROUPS: UpgradeGroup[] = (() => {
  const groups = new Map<string, UpgradeGroup>()
  for (const upgrade of UPGRADES) {
    const key = upgrade.family ?? upgrade.id
    const units = UNITS_BY_UPGRADE.get(upgrade.id) ?? []
    const existing = groups.get(key)
    if (existing) {
      existing.ids.push(upgrade.id)
      for (const u of units) if (!existing.unitIds.includes(u)) existing.unitIds.push(u)
    } else {
      groups.set(key, { key, upgrade, ids: [upgrade.id], unitIds: [...units] })
    }
  }
  return [...groups.values()].sort((a, b) => a.upgrade.name.localeCompare(b.upgrade.name))
})()

export const UPGRADE_CATEGORY_LABEL: Record<Upgrade['category'], string> = {
  caster: 'Caster spell',
  combat: 'Combat',
  mobility: 'Mobility',
  range: 'Range',
  defense: 'Defense',
  stealth: 'Stealth',
  utility: 'Utility',
}
