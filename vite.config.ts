import { fileURLToPath, URL } from 'node:url'
import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { UNITS } from './src/data/units'
import { PATCHES } from './src/data/patches'
import { SITE, COMMUNITY_PAGE_ENABLED } from './src/data/site'

/**
 * Every route that gets prerendered to static HTML, including the dynamic
 * ones. Derived from the same data the pages render, so a new unit or patch
 * automatically gets its own page — there is no list to keep in sync.
 */
const STATIC_ROUTES = [
  '/',
  '/how-to-play',
  '/why-its-different',
  '/units',
  '/upgrades',
  '/patch-notes',
  // Same flag the router and the nav read, so a hidden page is never built at
  // all rather than built and merely unlinked.
  ...(COMMUNITY_PAGE_ENABLED ? ['/community'] : []),
]

const CONTENT_ROUTES = [
  ...STATIC_ROUTES,
  ...UNITS.map((unit) => `/units/${unit.id}`),
  ...PATCHES.map((patch) => `/patch-notes/${patch.date}`),
]

/**
 * `/404` renders to dist/404.html, which GitHub Pages serves automatically for
 * any unmatched path. Without it a bad URL gets GitHub's default 404 page
 * instead of the site's own. Excluded from the sitemap.
 */
const ALL_ROUTES = [...CONTENT_ROUTES, '/404']

/** Rough priority: landing pages above reference pages. */
function priorityFor(route: string): string {
  if (route === '/') return '1.0'
  if (STATIC_ROUTES.includes(route)) return '0.8'
  return '0.5'
}

// The site is served from the apex domain (wildcardarena.com), so assets live at
// the root. If this is ever hosted at a project sub-path, change `base` only.
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  /**
   * PORTS
   *   dev     3000  — what you type. strictPort makes it FAIL when 3000 is
   *                   busy rather than quietly landing on 3001; the point is
   *                   that the address never surprises you.
   *   preview 4173  — vite's default, set explicitly in scripts/rebuild.ps1.
   *                   A long-running background service behind the Cloudflare
   *                   tunnel, not something you type. The tunnel is bound to
   *                   that port, so moving it would burn the public URL.
   *
   * ALLOWED HOSTS
   * Vite rejects requests whose Host header it does not recognise, which
   * otherwise breaks any tunnel with "Blocked request. This host is not
   * allowed." A leading dot allows the domain and all its subdomains.
   *
   * Both blocks affect only `vite dev` and `vite preview` on a local machine —
   * the deployed site is static files and has no server at all.
   */
  server: {
    port: 3000,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', '.loca.lt'],
  },
  preview: {
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', '.loca.lt'],
  },

  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // Every asset is fingerprinted, so it can be cached immutably.
    assetsInlineLimit: 2048,
    /*
     * Normally empty dist/ first. During a remote review session the preview
     * server stays up while we rebuild, and emptying the directory it is
     * serving would both 502 every in-flight request and race the file handles
     * it holds open. WA_KEEP_DIST=1 writes over the top instead: old hashed
     * assets linger locally, which is harmless because CI always builds clean.
     */
    emptyOutDir: process.env.WA_KEEP_DIST !== '1',
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    /*
     * Flat: /foo.html rather than /foo/index.html.
     *
     * GitHub Pages resolves an extensionless /foo straight to foo.html with no
     * redirect. Nested output instead forces /foo -> 301 -> /foo/, which makes
     * the served URL disagree with the canonical tag and the sitemap entry.
     * Flat keeps all three identical.
     */
    dirStyle: 'flat',
    includedRoutes: () => ALL_ROUTES,
    // Inline the CSS each route actually uses; the rest loads asynchronously.
    // Removes the render-blocking stylesheet without hand-maintaining a
    // critical-CSS file that would rot the first time a component changed.
    //
    // `pruneSource` is deliberately OFF. It rewrites the shared CSS files in
    // dist/ as a side effect, and pages render concurrently — so several
    // beasties instances read and write the same file at once and corrupt it.
    // Leaving it off costs a few KB in the deferred stylesheet and makes the
    // build deterministic.
    beastiesOptions: {
      preload: 'swap',
      pruneSource: false,
    },
    async onFinished() {
      const urls = CONTENT_ROUTES.map(
        (route) =>
          `  <url><loc>${SITE.url}${route === '/' ? '/' : route}</loc><priority>${priorityFor(route)}</priority></url>`,
      ).join('\n')

      await writeFile(
        'dist/sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        'utf8',
      )
      console.log(`  sitemap.xml   ${CONTENT_ROUTES.length} routes`)
    },
  },
})
