# TODO

Written 2026-08-06 at rev 61, amended through **rev 115**.

Current state: 45 routes prerender, typecheck clean, **47 commits on `main`, nothing pushed**,
nothing deployed. Local preview lives at `:4173` behind a Cloudflare quick tunnel (see README).
Those two detached processes will be long dead by the time you read this; rerun
`scripts/serve-public.ps1`.

---

## 0. Read this first

**Committed, but not backed up.** `50b7c21` is the "Initial AI scaffold" restore point;
`git reset --hard 50b7c21` returns to it. Everything since is small single-purpose commits, each
revertable on its own. But there is still **no remote** — 26 commits live in one OneDrive folder.
Pushing is blocker #1 below, and it gates the CSS-experiment branches too: push first, branch
second.

### Do this before anything else: look at it on a desktop

**Everything was reviewed on a phone.** The site has 10 media queries, all `min-width`, from 46rem
to 64rem. A phone viewport is ~24–27rem, so **not one of them ever fired**. Container maxes at
74rem, so desktop is a different composition, not a wider phone. Nothing should be broken (auto-fit
grids, clamps, max-widths throughout) but the proportions are genuinely unverified. In likely order
of annoyance:

1. **The desktop header is entirely unseen.** At 62rem `AppHeader` swaps the hamburger for a
   horizontal bar with six nav links, a Discord link and the Play button. You have only ever seen
   the drawer.
2. **`.tenets` now has two cards, not three.** `auto-fit` + `1fr` stretches them to ~570px each at
   full container, so ~25 words of body will run about two lines. Likely to read sparse.
3. **`.panel` under the roller.** At 52rem the roller becomes three columns across the full
   container, then the "Your Faction" frame is capped at `max-width: 34rem` beneath it. May look
   orphaned against the wide grid.
4. **Hero vertical balance.** At 60rem it splits 1.05fr / 0.95fr with the video right. The left
   column lost a lot of height (lede went from four sentences to one, fact strip deleted), so the
   copy may now be much shorter than the 16:9 video.
5. **Two very thin bands**, Curated and Latest patch, both sitting in full `--section-y` padding.
   Brief on a phone; possibly underfilled on a wide screen.
6. **Five empty `MediaFrame` placeholders** get much larger and more obviously empty.

Caveat worth carrying: every "verified" in the build log meant *the right markup and text shipped*,
never *it looked right*.

### What changed after this doc was first written (rev 61 → 67)

Homepage only. All done on a phone, so **eyeball these on a real screen before trusting them**:

- **Fact strip deleted.** The three-stat band under the hero (37 units / 9.12 trillion / 40
  upgrades) is gone, along with its CSS and the `FACTION_COMBINATIONS_SHORT` export. Exactly one
  number remains on the page. The hero's `padding-block` went symmetric because the strip had been
  supplying its bottom space — that spacing is worth a look.
- **"Roll a new faction" moved above the grid and is now primary.** The locked-slots note stayed
  below. This is the one change most likely to need a spacing tweak in the browser.
- **Explanatory copy moved below the roller**, wrapped in `.roller-notes`. "Below is a real draw"
  became "That is a real draw" to match.
- **Randomness ambiguity fixed** across the homepage, How to Play and the meta description: the
  copy now says the *menu* is randomized, not the outcome of each build. Play-card titles are now
  "Production buildings decide what you can build" / "…what you can research".
- **"Curated, not chaos"** added above the roller notes. See §2f-note.
- **`UNIT_COMBINATIONS` is now unrendered** but deliberately kept in `site.ts` as the working
  behind the big number. Delete it only if you are willing to lose the derivation.

### Still open from that round

- **Roller vs. video in the hero.** The hero media slot holds `hero-battle.mp4`; the roller sits in
  section two. They compete for the same real estate and you cannot promote both. My call is roller
  in the hero, video below — it is interactive, it is uniquely yours, and it works before any
  footage exists. This interacts with the reshoot item in §4.
- **Section rhythm.** Five two-word eyebrows in the same register (`The approach`, `How it plays`,
  `Getting in`, `Latest changes`, `Getting a game`). Nothing on the page is allowed to be big or
  tiny. Covered in §2g, but it is a layout problem more than a copy problem.
- **"Possible rolls" is looser than the constant it prints.** `FACTION_COMBINATIONS` counts
  *legal* factions after roll caps and the same-slot collision rule; the mod can also emit
  cap-violating draws via the fallback. See the doc comment in `site.ts` before defending the
  number in public.

### Read these four files first

Most of this codebase is workmanlike Vue that will teach you nothing. Four files are worth actually
reading, and three are where Vue diverges from React in ways that matter — which is the relevant
axis, since React is the frontend you use daily.

1. **`src/components/game/FactionRoller.vue`** — the `mulberry32` seeded PRNG. Same problem class
   as a React hydration mismatch: the prerendered HTML and the client's first render must produce
   an identical draw, so the seed is fixed and only `reroll()` advances it. Read this one for the
   SSR reasoning if you read nothing else. It also enforces the mod's real legality rules (cap
   families, same-slot collisions, over-cap fallback), verified across 5,000 simulated draws.
2. **`src/components/layout/PageSection.vue`** — exposes `lede` as *both* a prop and a `#head`
   slot, which is Vue's answer to React's "string vs. `ReactNode`" API question. Also `useId()`
   feeding `aria-labelledby`, the Vue 3.5 SSR-safe ID story. That is the exact line that broke when
   a spelling sweep turned it into `aria-labeledby` and typecheck sailed straight past, because TS
   does not validate ARIA attribute *names*. Worth knowing that hole exists.
3. **`src/components/ui/AppButton.vue`** — trivial, but it shows `withDefaults(defineProps<{…}>())`
   ergonomics against React default params. It is also why dropping `variant="secondary"` was the
   right edit rather than writing `variant="primary"`.
4. **`vite.config.ts`** — nothing to do with Vue, but `dirStyle: 'flat'` and
   `beasties pruneSource: false` are the two decisions that were expensive to learn and cheap to
   undo by accident. The comments explain both.

---

## 1. Ship it — three things left, all outside the code

The site is done. Content, copy, media, meta and accessibility all audited clean
at rev 115. What remains is wiring, and it needs an hour of your attention
rather than another edit.

- [ ] **Create the GitHub repo and push.** 47 commits sit on `main` with **no
      remote**, in a OneDrive folder. This is the only real risk left.
- [ ] **GitHub Pages.** Settings → Pages → Source: **GitHub Actions**. The
      workflow at `.github/workflows/deploy.yml` already typechecks, builds and
      publishes `dist/`. Nothing to write.
- [ ] **DNS for wildcardarena.com.** Four A records to GitHub's IPs plus a `www`
      CNAME — the table is in README under Deployment. `public/CNAME` already
      holds the domain. Turn on **Enforce HTTPS** once the cert issues.

### Done, do not redo

- ~~og:image~~ — 1200x630 gameplay still at `public/og.jpg`, absolute URL, on
  all 46 pages. It will look broken until DNS resolves; that is expected.
- ~~Two blank upgrade descriptions~~ — Metabolic Boost and Adrenal Glands,
  both Zergling-only, verified against `UNIT_POOLS`.
- ~~Desktop review~~ — done, and it held up.
- ~~Empty media placeholders~~ — zero remain.

### Right after DNS goes live

Discord and Reddit **cache link previews hard**. If you paste the URL before the
image resolves, the broken card sticks. Discord clears in roughly a day; on
Reddit, append `?1` while testing. Check one link before starting the clip
series.

---

## 2. The de-AI pass

Em dashes are already done (rev 61). 61 removed from written copy; the 44 that remain are the ones
you exempted: 36 in `patches.ts` (your own release notes) and 7 stat comparisons in `units.ts`
("Costs 25 gas — 50/0 on ladder"). If you ever want those too, the pattern is the same.

Ordered by how loud each one is. Decide each, do not just accept the list.

### 2a. Write it in first person

**The recommendation: yes, first person.** There is currently not one `I` on the site.

The "pretend to be a team" option is the weaker play on both of your goals. To players, a solo dev
with a strong opinion about why RTS converges on scripted builds is *more* interesting than an
anonymous project, not less. To an employer reading it as portfolio work, "I built this" is the
whole point, and a fake plural undercuts it the moment they check the GitHub account.

The AI-tooling worry is a non-issue in 2026 and is anyway invisible in the output. What is visible
is that nobody's voice is in the copy.

The place to start is `WhyDifferentView.vue`. It is the most argued page and the most obviously
ghost-written. Rewriting the lede and the three tenets in your own voice kills several other items
on this list for free, because "I gave up player agency on purpose" does not need the word
*intentionally*.

**Do not rewrite the whole site by hand.** Writing it yourself is slower, and most of the site does
not need a voice: unit pages, upgrade tables and how-to-play steps should stay flat and factual,
because that is what reference copy is supposed to sound like. The voice only has to show up where
you are making an argument or telling someone why you built this.

That is roughly four passages:

1. `WhyDifferentView` lede and the three tenets
2. The homepage hero and the same three tenets there (see the duplication table below; fix that
   first and this becomes one edit instead of two)
3. The one-line intro above the faction preview on the homepage
4. `CommunityView`, which is the most natural place for a first-person line

Write those four cold, in your own words, and let the rest stay neutral.

### 2b. Stop asserting intent (7 uses)

`deliberately` / `intentionally` / `on purpose` / `by design`. Worst offenders are both *headings*:

- `Intentionally clashes with standard RTS design` — HomeView.vue:129 and WhyDifferentView.vue:38
- "The upgrade pools are intentionally curated" — UpgradesView.vue:80
- "intentionally not how Reactors work on ladder" — HomeView.vue:170

You built the thing. The intent is implied. Mostly this is fixed by deleting the adverb.

### 2c. The "X, not Y" antithesis (7 uses, two as headings)

`Per-unit balance, not per-matchup balance` is a section title on **both** Home and Why It's
Different. Also "not from having memorized build orders", "a melee mod, not an Arcade map",
"Built directly from the Factory, not by merging two Templar."

One of these is a good sentence. Seven is a fingerprint. Keep the one that earns it, rewrite the
rest as plain statements.

### 2d. Rule of three: leave it alone, mostly

Agreed, it is taught for a reason. Only worth touching where the third item is filler:

- "same economy, same buildings, same controls" — earns it, keep
- "no separate download, no launcher and no client patch" — the last two are the same fact
- "depth without a memorization wall, a meta that cannot go stale, and per-unit balance instead of
  per-matchup balance" — WhyDifferentView meta description, three abstractions in one breath

### 2e. Contractions: pick one and be consistent

Currently 9 contractions against 23 uncontracted forms, sometimes in adjacent sentences
("It's a melee mod" three lines from "it is fog-gated"). 10 uses of `cannot`. For a game site,
go contractions everywhere. Uniformly formal reads synthetic; mixed reads machine-edited.

### 2f. Rename "the roller"

You do not like the word and you are right that it is vague. Decide the name first, then rename
once, because it is currently spread across copy, a component name and a CSS block.

The surface area is small. **Only two places a visitor ever reads it:**

- `HomeView.vue:32` — the big stat label, "distinct factions the roller can legally deal"
- `UpgradesView.vue:100` — "**The roller limits repeats.**"

Everything else is internal and can be renamed at leisure: the `FactionRoller.vue` component, the
`.roller__*` CSS block inside it, `.roller-scale` on the homepage, and four code comments.

One thing to weigh: **`patches.ts:131` uses "the roller" in your own release notes** ("The roller is
also smarter about tight units"). That line is your words and is excluded from edits, so whatever
you land on will disagree with the archived patch notes unless you decide otherwise. Not a problem,
just a thing to notice.

Directions worth considering rather than a single suggestion, since this is a naming call:

- **The draft** — already used elsewhere in the copy ("the draft keeps variety in every game"),
  borrows a concept every competitive player already understands, and gives you a verb ("what you
  drafted"). Downside: implies choosing, and you do not choose.
- **The deal / your hand** — matches the card metaphor the site already leans on ("the hand you
  were dealt", "Wildcard" in the name itself). Gives you "what you were dealt". Strongest fit with
  the existing voice.
- **Faction generation / the generator** — accurate, boring, unambiguous.
- Just naming the output instead of the machine: rephrase so you never need a noun for the system.
  The homepage already does this since rev 67 ("There are 9,121,034,239,598 possible rolls").
  Verified against the built HTML: `UpgradesView.vue:100` is now the **only** remaining "roller" a
  visitor can read outside the patch notes. So this rename is one string, not a project.

The last option is probably the cheapest, and both visitor-facing strings rewrite cleanly that way.

### 2f-note. "Curated, not chaos" is itself an antithesis

It now leads the faction-preview section on the homepage, as asked. Flagging only because it is
exactly the §2c pattern, so it should be a deliberate keeper rather than an oversight. It is
arguably the one that earns it, since the whole job of the line is to correct a wrong assumption,
and that is what the construction is *for*. If you decide otherwise, alternatives that keep the
meaning without the shape:

- "Random, but hand-built." / "Random inside guardrails."
- "Every pool is hand-built for the unit it belongs to." (just delete the lead-in; the sentence
  after it already carries the point)

### 2g. Smaller tics

- **Every fact gets a "so"/"because" tail.** "It is fog-gated, so you have to actually send a
  scout." The reflex to explain the consequence of each sentence. Cut about half.
- **`actually` / `simply` as hedges** — 4 uses, all deletable.
- **Semicolons in prose** — 2 (HomeView.vue:112, HowToPlayView.vue:62). Rare in game writing.
- **Uniform block lengths.** The three tenets on Home are all within a few words of each other.
  Human writing is lumpy. Let one be a single line.
- **`Macro like normal StarCraft. Adapt like you never have.`** — balanced two-sentence heading
  with parallel imperatives. Recognizable shape.

---

## 3. Refactors

### Tailwind

> **Do this after the homepage structure is settled, not before.** The refactor is *gated* on the
> roller-vs-video decision in §0, not independent of it. Restyling the roller section before
> deciding whether the roller moves into the hero means doing that work twice. Settle the layout,
> then migrate. This matches your own sequencing instinct — vision first, then scrutinize the code.

Currently the design system is CSS custom properties in `src/styles/tokens.css` plus per-component
scoped `<style>` blocks.

**One thing to know coming from React.** A large part of Tailwind's value there is scoping and
collision avoidance — no scoped styles, class names are global, CSS-in-JS costs something. Vue's
`<style scoped>` already solves that; it is why the built markup carries `data-v-*` attributes.
So the case for Tailwind *here* is velocity and not having to name things, not isolation. That is
still a real case, but it changes which parts of the migration are wins and which are lateral
moves. Expect the `tokens.css` → `@theme` step to be clean and the per-component `<style scoped>`
teardown to be the actual work.

Tailwind v4 (4.3.3 as of writing) is the version to go to. It reads its theme from CSS rather than
a JS config, so `tokens.css` largely survives the move: the custom properties become the
`@theme` block and the token names stay stable. Install `@tailwindcss/vite` rather than the
PostCSS path.

Two things that must not regress:

1. **The cyan accent stays interaction-only** — links, primary buttons, focus rings, active states.
   Never a large fill, never a gradient. That restraint is most of what keeps this from reading as
   a generic tech template.
2. **Race colors are data, not brand.** Terran is deliberately desaturated so it never competes
   with the accent.

### Duplication (the part you actually care about)

Confirmed duplicates, all copy that got aligned across two pages by hand:

| Duplicated | Locations |
| --- | --- |
| `Intentionally clashes with standard RTS design` heading + full lede | `HomeView.vue:129-130`, `WhyDifferentView.vue:38-39` |
| `Per-unit balance, not per-matchup balance` tenet | `HomeView.vue:48`, `WhyDifferentView.vue:29` |
| The other two tenets (memorization wall, stale meta) | same two files |
| "melee mod, not an Arcade map / loads with the lobby" pitch | `HomeView.vue:76`, `HowToPlayView.vue:71` |
| Add-on explanation ("unlocks the top slot, does not double production") | `HomeView.vue:169`, `FactionRoller.vue:197` |
| Discord CTA block | `HomeView.vue`, `CommunityView.vue` |
| `allowedHosts` array | `vite.config.ts` `server` and `preview`, verbatim |

The tenets are the real problem: they exist in two files and you already had me sync their order
and framing by hand once. Lift them into `src/data/` as a single exported array and render both
pages from it. Same for the pitch paragraph.

### Vite 8

No technical reason it is on 7 other than that I scaffolded it on what I knew. Vite 8.2.1 is
current, and the two things that could have blocked it do not:

- `vite-ssg@28.3.0` peer range already includes `^8.0.0-0`
- `@vitejs/plugin-vue@6.0.8` peer range already includes `^8.0.0`

So it should be a version bump plus a build. Do it on its own commit so a prerender regression is
easy to bisect. Also on the table while you are in there: `vue@3.5.41`, `@vitejs/plugin-vue@6.0.8`.

### Other

- `dist/` accumulates stale hashed assets locally because of `WA_KEEP_DIST`. Harmless (CI builds
  clean) but run `rebuild.ps1 -Restart` occasionally.
- Consider moving the repo out of OneDrive. The `EPERM ... prepare-out-dir` build failures are
  OneDrive holding a lock on `dist/`.

---

## 4. Content and media

### Homepage video (recapture)

- [ ] **Reshoot the fight.** The existing footage in `C:\Users\taylo\Videos\StarCraft II` is not a
      good enough shot. Same clip is fine, just load the replay again and get a better camera on
      the same fight. A montage of two or three fights is equally fine and probably reads better,
      since it shows more than one rolled faction.

      What to aim for, given it will sit on the homepage:
      - Legible at small size and on a phone. Wide shots of a whole base will not survive.
      - Something visibly *not stock*, so the value proposition lands without a caption. A
        Battlecruiser doing something a Battlecruiser does not do beats a clean engagement.
      - Short. 6 to 12 seconds, and it needs to loop without an obvious seam.
      - It will be muted and autoplaying, so nothing can depend on sound.

- [ ] **Wire it up.** Drop it in `public/media/` and set `src` on the `MediaFrame`. Encode as MP4
      (h.264) plus a WebM if convenient, add a `poster` frame so there is no flash of empty box
      before it loads, and keep it under a couple of MB. `MediaFrame` already reserves the aspect
      ratio, so there is no layout shift and no CSS to touch.

### Stills

- [ ] **"Your Faction" panel snapshot.** You said you would grab this. It is the highest-value
      still on the site by a distance: the single clearest proof that this is a real mod and not a
      landing page. Homepage, above the fold-ish.
- [ ] **The other five `MediaFrame` placeholders.** Each one renders a labelled placeholder
      describing the shot that belongs there, so the frames themselves tell you what to capture.
- [ ] **Unit portraits.** Set `image` on units in `units.ts` (files in `public/units/`) and the
      race-tinted monogram is replaced. Grid layout is unaffected either way, so this can be done
      a few units at a time rather than all 37 at once.

### Logo / emblem

Low priority, and the current brand mark is fine. `BrandMark.vue` is a rotated square split by a
vertical accent line, meant to read as a dealt card at small size. Inline SVG, so it costs no
request and inherits `currentColor` and `--c-accent` from the tokens. **When a real logo exists,
replace only that one component** — nothing else references the glyph.

Worth revisiting only for one reason: it is also what a proper `og:image` and a favicon would be
built from, and both of those are on the blocker list. If you do commission or draw something,
do it before the `og:image`, not after, so you only make that asset once.

### An "about" section

Worth doing, and it solves a problem rather than just adding a page: it gives the first-person
voice somewhere it unambiguously belongs, which takes pressure off §2a. The other pages can stay
mostly neutral if there is one place that is openly you.

**Frame it as "why I built this", not "who I am."** That is the version that serves both audiences
at once. A player gets context for why the design opinions on Why It's Different are worth taking
seriously. An employer gets scope judgment, a real decision under constraint, and evidence you
finish things. A résumé block on a game site reads as self-promotion and helps neither.

Material that is already true and worth using:

- Solo project.
- It was going to be **Forge RTS**, built around a forge/crafting system. You cut that scope and
  the rename was forced by the cut. That is the single best thing you have here: a concrete
  decision to ship less, and it is the kind of thing people claim and rarely evidence.
- The north star: skill should come from reading and adapting, not from memorizing build orders
  before your decisions start to matter.
- You are a professional software engineer, and the site itself is the artifact.

Keep it to one screen. A thin about page is worse than none.

**Decision to make first: does anything link out?** Right now nothing does, on purpose, because
you said the GitHub is public mainly to look active when job-searching. An about section reopens
that, and specifically for the *site* repo rather than the mod repo, since the site is the thing
an employer would want to read the code of. Three defensible answers:

1. Nothing links out. Consistent with what you decided, keeps the page purely about the mod.
2. Link the **site** repo only, not the mod. The mod repo stays unlinked as decided.
3. Link a personal site or LinkedIn instead, so the mod repo stays out of it entirely.

Pick one before writing the copy — it changes the ending of the section.

**Placement, in rough order of preference:**

- **A block at the bottom of `/community`.** Cheapest, no new route, no nav item, and Community is
  already the page where a person is expected to show up. Downside: no URL to send anyone.
- **A real `/about` route.** Better for the portfolio goal because it is linkable, and it will sit
  in the sitemap and get its own `<title>`. Worth it only if there is enough to say.
- Footer only. Too small to be worth writing.

If you go with a route, the mechanical checklist is short:

- `src/router/routes.ts` — add the record (lazy import, matching the others)
- `vite.config.ts` — add `/about` to `STATIC_ROUTES`, which feeds both the prerender list and the
  sitemap, so nothing else needs touching
- `src/components/layout/AppHeader.vue:8` — the `NAV` array, if it belongs in the primary nav.
  It probably does not; six items is already a full bar and About is not a task a player came to
  do. The footer is the better home for the link.
- `useMeta` call in the page, same shape as every other view

### Naming: "Leap" vs "Raptor Charge"

The 2026-05-10 patch shipped this upgrade to Discord as **Leap**; the site and the
mod both call it **Raptor Charge** (internal id `HotSRaptorCharge2`). Same
ability. The patch note was normalised to Raptor Charge for launch so a reader
clicking through from the changelog actually finds it on /upgrades.

Taylor's preference is **Leap everywhere** — it is the better name and it is what
the community heard first. That is a rename across `upgrades.ts`, the patch note,
and the mod's own GameStrings, so it was deferred rather than done on ship day.

### Loose copy ends

- `WhyDifferentView` lost its "How to play" CTA during the edits. It currently dead-ends.
- Homepage bullet "The roller limits repeats..." is 26 words with the rationale in the second half.
- Three remaining "Data notes" describe stock behavior and could go the way of the others:
  Diamondback "Fires while moving", Viking "Assault Mode transforms it", DuskWing "A
  Banshee-derived mercenary variant".

---

## 5. Homepage information hierarchy — IMPLEMENTED (rev 69–94)

> **This section is now a record, not a plan.** It was built out over rev 69–94. The current
> homepage runs: hero (definition) → roller + "Your Faction" panel → Curated, not chaos → What if
> StarCraft didn't have fixed matchups? → Five clicks → Latest patch → Solo, co-op, or versus. The
> "How it plays" cards moved to `/how-to-play`, the patch section shrank to a dated line, and the
> hero CTAs are now How to play + Join the Discord.
>
> Still open from it: **section rhythm** (§0 item 5) and the empty media frames. Kept below because
> the reasoning explains why the page is shaped this way.

The homepage's failure is not bad copy, it is **flat priority** — every section is equally
important, so nothing is. Fixing that settles most of §2 for free.

**North star, in your own words:** *"I wanted the decisions you make to matter more than how many
times you have grinded a specific opener."* Everything on the page is either evidence for that
sentence or it belongs a level deeper.

### The test for any homepage section

Does this help someone understand **what it is**, **why it makes interesting competitive
StarCraft**, or **how to start playing**? If not, it lives on another page. That is the whole rule.

### Use your own dictation as the source copy

The single best thing to come out of the planning was that you produced better copy by talking
than the site has by writing. Do not polish these. Paste them.

- *"I wanted to see what the game would look like outside of the lens of the three matchups in
  StarCraft 2."*
- *"I wanted the decisions you make to matter more than how many times you have grinded a specific
  opener."*
- *"curated and designed for competitive rather than just some nonsense chaos"*

Compare the current tenet — "Skill comes from reading and adapting to your roll, not from having
memorized build orders and matchup dynamics before your first competitive game." Same idea, sanded
until nobody is in it. **This is the §2a fix.** You do not have to learn to write in your voice;
you have to stop letting it get translated out.

### Target structure

| # | Section | Job | Change |
| --- | --- | --- | --- |
| 1 | Hero | What is this? | **Rewrite the lede** |
| 2 | The hand you're dealt (roller) | Show, don't tell | Keep, promote |
| 3 | Curated, not chaos | It isn't Arcade nonsense | **Promote to its own section** |
| 4 | What changes about playing | The thesis | Rewrite tenets in first person |
| 5 | Getting in | Five clicks | Keep as-is |
| 6 | Latest changes | Proof it isn't abandoned | Keep, keep it small |
| 7 | Getting a game | Discord | Keep as-is |
| — | How it plays (4 cards) | Manual content | **Move to `/how-to-play`** |

### 1. The hero needs a definition, and currently has none

The eyebrow says "StarCraft II melee mod," the headline is emotional, and the lede opens on
*mechanism*: "your production buildings are dealt a random roster of units they can build." No
sentence anywhere completes **"Wildcard Arena is a ___."** Someone arriving cold has to
reverse-engineer the concept.

That happened for a traceable reason: the lede reads like mechanism because it *is* the fix you
asked for, to stop people thinking each build click produces a random unit. Right instinct, wrong
altitude. **Move the menu-vs-outcome disambiguation down to §2**, where a reader is looking at
actual slots, and give the hero a definition instead. Something in the shape of:

> Wildcard Arena is a StarCraft II melee mod where every game deals you a procedurally generated
> faction, built from units and upgrades across all three races.

"Procedurally generated" earns its place: it does double duty, telling a player this is systematic
rather than arbitrary, and telling a recruiter you built a system.

### 2–3. Roller, then the constraint story

Claim, then proof, then reassurance. **The roller stays in section two rather than moving into the
hero** — it is meaningless before a reader knows what "faction" means here, so proof cannot precede
claim. (This reverses my earlier advice; the sequencing argument is better than the one I gave.)

Then promote **"Curated, not chaos"** out of the roller footnote into a real section, with two or
three concrete constraint examples and a link out for the rules. Currently it is one bold lead-in
buried under the grid, doing the heaviest lifting on the page from the smallest slot.

### 4. Rewrite the tenets first-person

Same three ideas, but as the thesis in your voice, not an argued position in nobody's. This is
where "outside the lens of the three matchups" belongs.

### Open questions this does not settle

- **Where the hero video goes.** Once the roller is not competing for the hero, the video can stay
  where it is or move down. No longer a blocking decision.
- **Where "faction generation rules" lives.** There is no such page. Routes are `/`,
  `/how-to-play`, `/why-its-different`, `/units`, `/upgrades`, `/patch-notes`, `/community`.
  `/upgrades` already covers pools, caps and repeat-limiting, so the cheapest answer is a section
  heading and an anchor there rather than a new route.
- **Section rhythm** (§0) is unsolved by this and still wants a layout pass: five two-word eyebrows
  in the same register, nothing allowed to be big or small.

---

## 6. Korean translation (not started, deliberately)

Only Korean is worth doing. European and Mexican players you play with all use the English client,
so the English site already serves them.

### The blocking fact

GitHub Pages is static. **There is no server, so nothing can read `Accept-Language`.** Detection
has to happen in the browser, after English HTML has already loaded.

That means: prerender **two trees** (`/` and `/ko/...`, roughly 46 → 92 files via `ALL_ROUTES` in
`vite.config.ts`), then a small inline script checks `navigator.language.startsWith('ko')` and
redirects. Three non-negotiables:

- Always ship a **manual language switcher**. Auto-redirect with no escape hatch is the classic sin.
- `<link rel="alternate" hreflang="ko">` on each pair, or Google treats one as duplicate content.
- Guard with `localStorage` and **never redirect a URL that already has a locale prefix**, or loops.

Do **not** use runtime string-swapping alone (`vue-i18n` with one HTML). The prerendered markup
would stay English, so Korean text would not exist for search or Discord link previews, and every
Korean visitor gets a flash of English first.

### Scope, measured

| Area | Words |
| --- | --- |
| Shell + reference pages | 4,157 |
| Landing pages (Home / How to Play / Why Different / Community) | 2,822 |
| Unit + upgrade data | 1,809 |
| Patch notes | 1,168 |
| **Total** | **9,956** |

**Translate prose only.** Skip `patches.ts` (re-translating every patch forever, with no automated
sync) and the reference data. That takes it from ~10,000 words to **~2,800**.

### Two domain traps

1. **Blizzard already localized SC2 into Korean.** Unit names have canonical forms — Marine is
   해병, Stalker is 추적자. Machine translation invents names no Korean player recognizes.
2. **But the mod's UI is English.** The "Your Faction" screenshot on the homepage proves it. Korean
   unit names on the site would mismatch what players see in game. So: **keep unit and upgrade
   names in English**, translate the prose around them.

### Sequencing — the actual argument for waiting

If a Korean player cannot read the English site, they cannot read the mod either: tooltips, the
faction panel and upgrade descriptions are all English. Translating the site gets them excited and
drops them into a UI they cannot read. **Localize the mod's tooltips first.** The site is a
secondary funnel anyway; people find this in the in-game Custom list.

### You do not need to speak Korean

Ask a Korean player in the Discord to review ~2,800 words. Gets you the correct client vocabulary
for free and hands someone a reason to be invested. Better than any translation service.

---

## 7. Serve video from a URL instead of committing it

**Decided: GitHub Releases.** No bucket, no new account, and release assets are
**not stored in git history** — which is the actual problem, not bandwidth.

### The problem, measured

~6.5 MB of media blobs in git history from 10 blobs, for files currently ~5.7 MB
on disk. Every re-cut leaves a permanent copy. The hero alone has been encoded
four times.

**Bandwidth is not the trigger.** Pages' soft limit is ~100 GB/month and the site
is ~1.5 MB per engaged visitor, so roughly 66,000 visitors/month before it is a
question. A strong Reddit run will not get near that. Ignore bandwidth; the
reason to move is history.

### The code is already ready

`MEDIA_BASE` and `mediaUrl()` in `site.ts`. Empty string serves from
`public/media` (today). Set it and every video moves at once:

```ts
export const MEDIA_BASE = 'https://github.com/<user>/<repo>/releases/download/media-v1'
```

Only video routes through it. Posters and screenshots stay local on purpose:
they are small, the poster is the first paint, and a cross-origin poster is the
one that stalls.

### Order of operations, so the site is never broken

1. Create the repo and push (§1 — this gates everything).
2. `gh release create media-v1 public/media/*.mp4` (the `gh` CLI is **not**
   installed on this machine; the web UI works fine too).
3. Set `MEDIA_BASE`, rebuild, confirm both videos load.
4. **Only then** delete the mp4s from `public/media` and add
   `public/media/*.mp4` to `.gitignore`.

Doing 4 before 3 ships a site with broken video.

### Rejected

- **Git LFS** — the obvious answer, and it silently breaks: GitHub Pages does not
  resolve LFS pointers at deploy, so the build ships the pointer file instead of
  the video. Only viable if CI fetches LFS first.
- **YouTube / Vimeo** — an iframe with branding, controls and cookie
  implications, and it cannot be cleanly muted-autoplay-looped as a background.
  Fine for a future "watch gameplay" section, wrong for the hero.
- **Own S3/R2 bucket** — works, but it is the setup you did not want, plus a
  second thing to keep alive and a bill.
- **jsDelivr from a separate media repo** — decent runner-up, nicer URLs, real
  CDN, no account. But the files still live in git somewhere, so it moves the
  bloat rather than removing it.

### Free interim, costs nothing to adopt now

Encode to a scratch directory and only copy into `public/media` when a cut is
final. Most of that 6.5 MB is drafts that were never on the site for more than
an hour.

## Rules that still hold

- The mod repo at `...\Forge` is **read-only**. Never edit it from here.
- Never invent mechanics, units, upgrades or balance numbers. Leave a `TODO` on the unit instead.
- No automated sync, scraping, APIs or build-time pipelines. Data is transcribed by hand, and the
  reconciliation decisions are recorded in the `units.ts` header comment.
- The mod's GitHub repo is **not** linked from the site.
- Numbers in the data are catalog values. `formatBuildTime` / `formatPeriod` / `formatDps` convert
  to Faster before display. Do not render raw catalog values.
- StarCraft II is © Blizzard. Do not redistribute Blizzard assets.
