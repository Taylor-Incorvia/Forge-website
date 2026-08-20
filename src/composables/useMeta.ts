import { useHead } from '@unhead/vue'
import { SITE } from '@/data/site'

/** Describes public/og.jpg. Screen readers on some platforms announce this. */
const OG_IMAGE_ALT =
  'A Wildcard Arena battle: two mixed-race armies fighting on open ground, with beam weapons firing through the middle of the engagement.'

interface MetaOptions {
  title: string
  description: string
  /** Route path, used to build the canonical URL. Defaults to none. */
  path?: string
  /** Set false on pages that should not be indexed. */
  index?: boolean
}

/**
 * One place that knows how a page describes itself. Every page calls this, so
 * the title format, canonical URL and social-card tags can never drift apart
 * between routes — which is exactly the thing that silently rots on a site
 * where each page sets its own <head>.
 */
export function useMeta({ title, description, path, index = true }: MetaOptions) {
  const fullTitle =
    title === SITE.name ? `${SITE.name}: a StarCraft II multiplayer mod` : `${title} · ${SITE.name}`
  const url = path ? `${SITE.url}${path}` : SITE.url

  /*
   * Social cards need an ABSOLUTE url — Discord, Slack and Reddit fetch the
   * page from their own servers and cannot resolve "/og.jpg". One image for
   * the whole site is deliberate: it is a gameplay still, so it says the same
   * true thing on every route.
   *
   * Deliberately NOT routed through mediaUrl(): if video ever moves to a
   * release-asset host, the card image should stay on this domain. Some
   * crawlers refuse cross-origin images and simply render no card.
   */
  const ogImage = `${SITE.url}/og.jpg`

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      ...(index ? [] : [{ name: 'robots', content: 'noindex' }]),

      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: OG_IMAGE_ALT },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
