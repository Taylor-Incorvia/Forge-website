# Wildcard Arena — website

The official site for [Wildcard Arena](https://github.com/Taylor-Incorvia/Forge), a StarCraft II
melee mod. Vue 3 + Vite + TypeScript, prerendered to static HTML and served from GitHub Pages at
[wildcardarena.com](https://wildcardarena.com).

This repository contains **only the website**. The mod itself lives in the `Forge` repository.

---

## Getting started

Requires Node 20.19+ (see `.nvmrc` — CI uses Node 24).

```bash
npm install
npm run dev        # dev server at http://localhost:3000 (pinned; fails if busy)
npm run build      # typecheck, then prerender every route to dist/
npm run preview    # serve dist/ locally
npm run typecheck  # vue-tsc only
```

> **Windows / OneDrive note.** This repo currently sits inside a OneDrive-synced folder. OneDrive
> occasionally holds a lock on `dist/` while Vite is emptying it, which surfaces as
> `EPERM ... prepare-out-dir`. Re-running the build clears it. To avoid it entirely, either move the
> repo outside OneDrive or exclude `node_modules` and `dist` from sync
> (OneDrive → Settings → Sync and back up → Advanced settings → Excluded folders).

---

## How it's put together

```
src/
  data/          Hand-maintained game data (see "Updating after a patch")
  styles/        tokens.css — the design system; base.css — reset + elements
  components/
    layout/      Header, footer, page hero, page section, brand mark
    ui/          Button, card, badge, search, filter chips, step list, MediaFrame
    game/        Unit card/portrait, upgrade badge, faction roller, patch renderer
  composables/   useMeta — per-page title, description, canonical, social tags
  pages/         One component per route
  router/        Route table
```

### The design system comes first

`src/styles/tokens.css` is the single source of truth for colour, type scale, spacing, radius,
elevation and motion. Components consume CSS custom properties and never hard-code a value, so a
new page inherits the system rather than reinventing it.

Two rules worth keeping:

- **The cyan accent is for interaction only** — links, primary buttons, focus rings, active states.
  It is never a large fill or a gradient field. That restraint is what keeps it from reading as a
  generic tech template.
- **Race colours are data, not brand.** Terran / Protoss / Zerg tints identify units. Terran is
  deliberately desaturated so it never competes with the accent.

### Adding screenshots and clips

`MediaFrame` reserves a fixed aspect ratio whether or not media exists. With no `src` it renders a
labelled placeholder describing the shot that belongs there; with a `src` it renders a lazy-loaded
image or video in the same box.

```vue
<MediaFrame label="…" hint="…" ratio="16/9" />           <!-- placeholder -->
<MediaFrame src="/media/faction-panel.png" alt="…" label="…" ratio="16/9" />
```

Drop files into `public/media/` and set `src`. **No layout changes are needed** — the box is already
the right size, so nothing reflows and there is no cumulative layout shift.

Unit portraits work the same way: set `image` on a unit in `src/data/units.ts` (files in
`public/units/`) and the race-tinted monogram is replaced. Until then the grid is unaffected.

### Prerendering

`vite-ssg` renders all 46 routes — including every unit and patch page — to static HTML with their
own `<title>`, meta description, canonical URL and Open Graph tags. Critical CSS is inlined per page
by `beasties`. `sitemap.xml` is generated from the same route list in `vite.config.ts`, so a new
unit or patch gets a page and a sitemap entry automatically.

---

## Reviewing remotely (public preview tunnel)

For reviewing the built site from another device without deploying it.

```powershell
powershell -File scripts/serve-public.ps1   # start once — prints the public URL
powershell -File scripts/rebuild.ps1        # after each change — URL unchanged
```

`serve-public.ps1` builds the site, serves `dist/` on `:4173`, and opens a
Cloudflare quick tunnel. Both processes are **detached**, so they survive the
terminal closing. The current URL is written to `.local/tunnel-url.txt`.

The tunnel points at the **port**, not the build, so `rebuild.ps1` can replace the
site underneath it and the public URL stays the same. The preview server stays up
*through* the build, so the public URL never 502s mid-rebuild — verified with 120
consecutive external probes across a full rebuild.

That works because `vite preview` reads `dist/` per request, so writing new files
underneath it is fine; what is not fine is **emptying** the directory it is
serving. `WA_KEEP_DIST=1` (set by the script, read in `vite.config.ts`) skips
`emptyOutDir` so the build writes over the top. Old hashed assets accumulate
locally, which is harmless because CI builds from a clean checkout. Use
`rebuild.ps1 -Restart` to prune `dist/` and get a fresh server.

Two caveats:

- **The URL is public and unauthenticated.** Anyone with the link can read the
  site. Stop the tunnel when you are done: `Stop-Process -Name cloudflared`.
- **The URL is ephemeral.** Quick tunnels get a random hostname on every start and
  cannot be pinned without a Cloudflare account. If the machine sleeps or loses
  network, both processes die — rerun `serve-public.ps1` and you get a *new* URL.
  On battery this laptop sleeps after 10 minutes, so keep it plugged in (sleep is
  already set to never on AC) or run `powercfg /change standby-timeout-dc 0`.

`src/data/site.ts` exports `BUILD_STAMP`, rendered small in the footer, so you can
tell at a glance whether the page you are looking at includes the latest rebuild.

---

## Updating after a patch

Data is transcribed by hand from the mod repo's docs. There is deliberately no automated sync — the
flow is: update the mod docs, then update these three files.

| Change | File |
| --- | --- |
| New/changed unit stats, costs, weapons | `src/data/units.ts` |
| Upgrade pools, caps, descriptions | `src/data/upgrades.ts` |
| A new patch | `src/data/patches.ts` — add to the **top** of the array |
| Discord invite, site copy constants | `src/data/site.ts` |

`UNIT_POOLS` in `upgrades.ts` is the single source of truth for which unit rolls what. Unit pages
and upgrade pages both derive from it, so the two views cannot drift apart.

Source documents in the mod repo:

- `docs/audits/unit-stats.md`
- `docs/audits/upgrade-pools-by-unit.md`
- `docs/patch-notes/`

### Two things to know about the data

**Numbers are catalog values.** Every build time and DPS is a standard-speed catalog value.
Multiplayer runs on "Faster" (~×1.4), so real build times are shorter and real DPS is higher. The UI
states this wherever numbers appear.

**Where sources disagree, the newer one wins and the decision is recorded.** The header comment in
`units.ts` lists the current reconciliations, and anything genuinely unresolved is left as an
explicit `TODO` note on the unit rather than guessed at. One is currently open — see the Wraith's
cloak note.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which typechecks, builds and publishes
`dist/` to GitHub Pages. A failing typecheck fails the deploy.

### One-time setup

1. **Repository → Settings → Pages → Source: GitHub Actions.**
2. **Custom domain:** `public/CNAME` already contains `wildcardarena.com`, so it is republished on
   every deploy. Enter the domain under Settings → Pages as well, and enable **Enforce HTTPS** once
   the certificate is issued.
3. **DNS at your registrar:**

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<github-username>.github.io.` |

   (AAAA records for the IPv6 equivalents are optional but recommended.)

Because the site is served from the apex domain, `base` in `vite.config.ts` is `/`. Hosting it at a
project sub-path instead is a one-line change there.

---

## Scope

This is a static informational site. No backend, no accounts, no live ladder, no automated data
sync, no Discord integration. Standings and matchmaking live in Discord by design.

---

## Legal

Wildcard Arena is an unaffiliated community mod. *StarCraft II* and its assets are © Blizzard
Entertainment. Original mod code and documentation © Taylor Incorvia.

Self-hosted fonts (Archivo, Inter, JetBrains Mono) are licensed under the SIL Open Font License 1.1.
