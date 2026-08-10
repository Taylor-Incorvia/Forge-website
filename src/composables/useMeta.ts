import { useHead } from '@unhead/vue'
import { SITE } from '@/data/site'

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
    title === SITE.name ? `${SITE.name}: a StarCraft II melee mod` : `${title} · ${SITE.name}`
  const url = path ? `${SITE.url}${path}` : SITE.url

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

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
