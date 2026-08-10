<script setup lang="ts">
import { computed, ref } from 'vue'
import UnitPortrait from '@/components/game/UnitPortrait.vue'
import UpgradeBadge from '@/components/game/UpgradeBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { UNITS } from '@/data/units'
import { UNIT_POOLS, UPGRADES_BY_ID } from '@/data/upgrades'
import { FACILITY_ADDON, FACILITY_LABEL, FACILITY_SLOTS } from '@/data/site'
import type { Facility, Unit } from '@/data/types'

/**
 * Shows the core mechanic instead of describing it: three production
 * buildings, their slots filled from the real per-slot unit pools, each unit
 * paired with an upgrade drawn from that unit's real pool.
 *
 * Two constraints shaped the implementation:
 *
 * 1. It must be deterministic on first paint. The page is prerendered, so a
 *    Math.random() roll during SSG would not match the client's roll and Vue
 *    would throw a hydration mismatch. A seeded PRNG starting from a fixed
 *    seed renders identically on server and client; the seed only changes when
 *    a human clicks Roll again.
 * 2. It must obey the same legality rules the mod does, or it would advertise
 *    draws the game cannot produce. There are two, and both are enforced below:
 *    - Roll caps, counted per *cap family* (Concussive shares one cap of 1
 *      across 13 variants; the Range family shares one cap of 2). Note this is
 *      not the same as the display grouping.
 *    - The same-slot collision rule: one upgrade id cannot appear at the same
 *      slot index across facilities, because those slots share a single
 *      research ability. Barracks-1, Factory-1 and Starport-1 cannot all roll
 *      Blink.
 */

const FACILITIES: Facility[] = ['barracks', 'factory', 'starport']

/** Units available in each facility slot, matching the in-game slot pools. */
const SLOT_POOLS: Record<Facility, Unit[][]> = {
  barracks: [],
  factory: [],
  starport: [],
}
for (const facility of FACILITIES) {
  for (let slot = 1; slot <= FACILITY_SLOTS[facility]; slot++) {
    SLOT_POOLS[facility].push(UNITS.filter((u) => u.facility === facility && u.slot === slot))
  }
}

/** mulberry32 — tiny, fast, and reproducible from a seed. */
function makeRng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface RolledSlot {
  unit: Unit
  upgradeId?: string
  /** Barracks slot 4, Factory slot 3 and Starport slot 3 need an add-on. */
  addonGated: boolean
}

function roll(seed: number): Record<Facility, RolledSlot[]> {
  const rng = makeRng(seed)
  const pick = <T,>(arr: readonly T[]): T | undefined => arr[Math.floor(rng() * arr.length)]

  // Caps are counted per cap family, falling back to the upgrade's own id when
  // it belongs to no family (which is how the mod treats unregistered ids).
  const used = new Map<string, number>()
  const capKey = (id: string) => UPGRADES_BY_ID.get(id)?.capFamily ?? id
  const capFor = (id: string) => UPGRADES_BY_ID.get(id)?.cap ?? 2

  // Upgrade ids already taken at each slot index, across all facilities.
  const takenAtSlot = new Map<number, Set<string>>()

  const result: Record<Facility, RolledSlot[]> = { barracks: [], factory: [], starport: [] }

  for (const facility of FACILITIES) {
    const slots = SLOT_POOLS[facility]
    slots.forEach((pool, index) => {
      const unit = pick(pool)
      if (!unit) return

      const slotIndex = index + 1
      const taken = takenAtSlot.get(slotIndex) ?? new Set<string>()

      const eligible = (UNIT_POOLS[unit.id] ?? []).filter(
        (id) => (used.get(capKey(id)) ?? 0) < capFor(id) && !taken.has(id),
      )

      /*
       * The mod falls back to a collision-free but over-cap roll when nothing
       * under the cap is available, so a slot is never left blank. Mirror that
       * rather than showing an empty slot.
       */
      const pool2 = eligible.length
        ? eligible
        : (UNIT_POOLS[unit.id] ?? []).filter((id) => !taken.has(id))

      const upgradeId = pick(pool2)
      if (upgradeId) {
        used.set(capKey(upgradeId), (used.get(capKey(upgradeId)) ?? 0) + 1)
        taken.add(upgradeId)
        takenAtSlot.set(slotIndex, taken)
      }

      result[facility].push({
        unit,
        upgradeId,
        addonGated: index === slots.length - 1,
      })
    })
  }

  return result
}

const seed = ref(20260805)
const rolls = computed(() => roll(seed.value))
const rollCount = ref(0)

function reroll() {
  // Any changing value works; deriving from the previous seed keeps it pure.
  seed.value = (seed.value * 1664525 + 1013904223) >>> 0
  rollCount.value++
}
</script>

<template>
  <div class="roller">
    <div class="roller__bar">
      <AppButton @click="reroll">
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" width="15" height="15">
          <path
            d="M13.5 8a5.5 5.5 0 1 1-1.7-3.97M13.5 2v3h-3"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Roll a new faction
      </AppButton>
      <p class="visually-hidden" role="status" aria-live="polite">
        {{ rollCount ? `Rolled a new faction. Roll number ${rollCount}.` : '' }}
      </p>
    </div>

    <div class="roller__grid">
      <section v-for="facility in FACILITIES" :key="facility" class="fac">
        <header class="fac__head">
          <h3 class="fac__name">{{ FACILITY_LABEL[facility] }}</h3>
          <p class="eyebrow">{{ rolls[facility].length }} slots</p>
        </header>

        <ol class="fac__slots">
          <li v-for="(slot, i) in rolls[facility]" :key="`${facility}-${i}`" class="slot">
            <span class="slot__no" aria-hidden="true">{{ i + 1 }}</span>
            <UnitPortrait :unit="slot.unit" size="sm" />
            <span class="slot__body">
              <RouterLink class="slot__unit" :to="`/units/${slot.unit.id}`">
                {{ slot.unit.name }}
              </RouterLink>
              <UpgradeBadge v-if="slot.upgradeId" :id="slot.upgradeId" :link="false" />
            </span>
            <!--
              The prose explaining locked slots now lives on /how-to-play, so the
              badge has to carry its own meaning. `title` is a hover tooltip and
              fires on neither touch nor most screen readers; aria-label is what
              actually names it.
            -->
            <span
              v-if="slot.addonGated"
              class="slot__gate"
              :title="`Needs a ${FACILITY_ADDON[facility]}`"
              :aria-label="`Locked. Needs a ${FACILITY_ADDON[facility]}`"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" width="12" height="12">
                <rect
                  x="3.5"
                  y="7"
                  width="9"
                  height="6.5"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                />
                <path
                  d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                />
              </svg>
              {{ FACILITY_ADDON[facility] }}
            </span>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
.roller {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.roller__grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}

.fac {
  display: flex;
  flex-direction: column;
  background: var(--c-surface-1);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  box-shadow: var(--elev-inset);
  overflow: hidden;
}

.fac__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface-2);
}

.fac__name {
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
}

.fac__slots {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
  padding: 0;
  list-style: none;
}

.slot {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--c-border);
}

.slot:last-child {
  border-bottom: none;
}

.slot__no {
  flex: none;
  width: 1.25rem;
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  color: var(--c-text-muted);
}

.slot__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-1);
  min-width: 0;
  margin-right: auto;
}

.slot__unit {
  font-family: var(--font-display);
  font-size: var(--fs-md);
  font-weight: var(--fw-semibold);
  color: var(--c-text);
  text-decoration: none;
}

.slot__unit:hover {
  color: var(--c-accent-hover);
}

.slot__gate {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  align-self: flex-start;
  padding: 0.2em 0.45em;
  border: 1px dashed var(--c-border-strong);
  border-radius: var(--radius-xs);
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.roller__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}

@media (min-width: 52rem) {
  .roller__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
