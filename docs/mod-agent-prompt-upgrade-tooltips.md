# Prompt for the Forge (mod) agent — missing upgrade tooltips

Paste the block below into a Claude Code session opened in the **mod repo**
(`C:\Users\taylo\OneDrive\Desktop\ForgeVersionControlled\Forge`).

**Context for why this exists:** the website needs a short description for every
rollable upgrade. 14 of them were sourced directly from the mod's own
`GameStrings.txt` (`Button/Tooltip/<UpgradeId><slot>`). The 28 below have **no
`Button/Tooltip/` entry in the mod**, because they reuse the stock StarCraft II
tooltip. That is a problem in two directions:

1. **In game**, a player rolling one of these sees Blizzard's stock text, which
   does not reflect the mod's changes — patch 3.0 moved caster energy costs
   (Force Field / Graviton Beam / Auto-Turret to 50, Guardian Shield / Fungal
   Growth to 75, Neural Parasite to 100, Parasitic Bomb to 125, Abduct to 75,
   Irradiate to 50), and Missile Pods was reworked to flat 60 vs air.
2. **On the website**, we will not copy Blizzard's tooltip text, so these
   upgrades currently render with a name and no description.

Fixing it in the mod fixes both at once.

---

## The prompt

> You are working in the Wildcard Arena (Forge) mod repo. Read `CLAUDE.md` first.
>
> **Goal:** every rollable upgrade should have an accurate, mod-specific tooltip
> in `ForgeModLowConfidence.SC2Mod/enUS.SC2Data/LocalizedData/GameStrings.txt`,
> and I need those descriptions reported back so I can put them on the website.
>
> **Task 1 — determine actual in-mod behaviour.** For each upgrade id listed at
> the bottom, work out what it *actually does in this mod*, from the data rather
> than from memory of stock StarCraft II. The places that matter:
>
> - `ForgeModLowConfidence.SC2Mod/Base.SC2Data/TriggerLibs/upgradeInitializers.galaxy`
>   — how the upgrade is wired (`addAbilityToUpgrade` / `addUpgradeToUpgrade` /
>   `addBehaviorToUpgrade`) and its eligibility tags.
> - `Base.SC2Data/GameData/UpgradeData.xml` — `EffectArray` entries give exact
>   catalog deltas (field, operation, value).
> - `Base.SC2Data/GameData/AbilData.xml` — energy costs, cooldowns, ranges,
>   research times and costs.
> - `Base.SC2Data/GameData/EffectData.xml` and `BehaviorData.xml` — damage,
>   durations, magnitudes.
> - `docs/patch-notes/` — where a patch already states the value, prefer it and
>   cite which patch.
>
> For each upgrade tell me explicitly whether the mod **changes** it from stock
> or leaves it **identical to stock**. Where the mod changed it, give the old and
> new values.
>
> **Task 2 — add the missing tooltips.** For every upgrade below that has no
> `Button/Tooltip/` entry, add one to the mod's `GameStrings.txt`, following the
> existing conventions in that file:
>
> - Key format is `Button/Tooltip/<UpgradeId><slot>` — the slot suffix matters,
>   and there is one entry per slot the upgrade can be researched in. Check
>   `docs/audits/upgrade-pools-by-unit.md` for which slots each upgrade appears
>   in, and match the pattern already used by e.g. `WraithCloak1`,
>   `TempestRange3`, `GoliathRange2`.
> - Match the voice of the existing entries: one sentence, concrete numbers,
>   present tense, no marketing language. Compare against
>   `Button/Tooltip/SiegeTankRange2=Increases the Siege Tank's weapon range by 2.5.`
> - State the **mod's** values, not stock ones. If an energy cost or magnitude
>   was changed by a patch, the tooltip must reflect the current value.
> - Also add the matching `Abil/Name/` and `Button/Name/` entries if they are
>   missing, per the checklist in `CLAUDE.md`.
>
> Do not change any balance values. This is a documentation-only task — strings
> only, plus any `Button/Name` entries needed to make them render.
>
> **Task 3 — report back in this exact format,** one line per upgrade, so it can
> be pasted straight into the website's data file:
>
> ```
> <UpgradeId> | <changed-from-stock: YES/NO> | <one-sentence description with numbers> | <source file(s)>
> ```
>
> If you genuinely cannot determine an upgrade's behaviour from the data, write
> `UNKNOWN` rather than guessing, and say what you looked at. A wrong number is
> much worse than a missing one — these go on a public site.
>
> **The 28 upgrades needing tooltips:**
>
> Mobility — `Speed`, `Charge`, `HotSRaptorCharge2`, `Hyperjump`,
> `zerglingmovementspeed`, `Blink`
>
> Range — `Range`, `LurkerRange`
>
> Combat — `Stimpack`, `zerglingattackspeed`, `RavagerCorrosiveBile`, `Yamato`,
> `D8Charge`
>
> Caster — `ForceField`, `GuardianShield`, `GravitonBeam`, `MissilePods`,
> `BuildAutoTurret`, `SeekerMissile`, `RavenScramblerMissile`, `FungalGrowth`,
> `NeuralParasite`, `ParasiticBomb`, `BlindingCloud`, `Irradiate`, `Yoink`
> (displayed as Abduct), `ArbiterMPRecall` (displayed as Recall),
> `CorsairMPDisruptionWeb`
>
> **Two known naming questions while you are in there** — confirm the intended
> display names, since the website currently uses descriptive fallbacks rather
> than guessing at lore names:
>
> - `HotSRaptorCharge2` — currently shown as "Raptor Charge".
> - `LurkerRange` — currently shown as "Lurker Range" (stock SC2 calls the
>   Lurker range upgrade "Seismic Spines"; confirm whether this is that).
> - `zerglingattackspeed` / `zerglingmovementspeed` — shown as "Attack Speed" and
>   "Zergling Movement Speed"; confirm whether these are meant to be Adrenal
>   Glands and Metabolic Boost, and note that `zerglingattackspeed` also rolls on
>   units other than the Zergling.

---

## Separately: one open data contradiction

Not part of the tooltip task, but worth resolving in the same pass — the website
carries a `TODO` on the Wraith because two docs disagree:

- `docs/patch-notes/2026-07-22.md` says the Wraith **no longer starts cloaked**
  (and is cheaper at 100/100 as a result), and `WraithCloak` is in its rollable
  pool in `docs/audits/upgrade-pools-by-unit.md`.
- `docs/audits/unit-stats.md` (snapshot 2026-08-04, i.e. *newer*) still lists
  **permanent cloak** on the Wraith.

Ask the agent to check `UnitData.xml` / the trigger init for the Wraith and say
which is correct, then correct whichever doc is stale.
