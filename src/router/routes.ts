import type { RouteRecordRaw } from 'vue-router'
import { COMMUNITY_PAGE_ENABLED } from '@/data/site'

/**
 * Every page is lazily imported so each route ships its own JS chunk.
 * Home is eager because it is the entry point for most visits and the
 * prerendered HTML is served with its chunk preloaded anyway.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomeView.vue'),
  },
  {
    path: '/how-to-play',
    name: 'how-to-play',
    component: () => import('@/pages/HowToPlayView.vue'),
  },
  {
    path: '/why-its-different',
    name: 'why-its-different',
    component: () => import('@/pages/WhyDifferentView.vue'),
  },
  {
    path: '/units',
    name: 'units',
    component: () => import('@/pages/UnitsView.vue'),
  },
  {
    path: '/units/:id',
    name: 'unit',
    component: () => import('@/pages/UnitView.vue'),
  },
  {
    path: '/upgrades',
    name: 'upgrades',
    component: () => import('@/pages/UpgradesView.vue'),
  },
  {
    path: '/patch-notes',
    name: 'patch-notes',
    component: () => import('@/pages/PatchNotesView.vue'),
  },
  {
    path: '/patch-notes/:date',
    name: 'patch-note',
    component: () => import('@/pages/PatchNoteView.vue'),
  },
  /*
   * Behind COMMUNITY_PAGE_ENABLED. With the route absent, /community falls
   * through to the catch-all below, so a stale bookmark gets the 404 page
   * rather than a blank screen.
   */
  ...(COMMUNITY_PAGE_ENABLED
    ? [
        {
          path: '/community',
          name: 'community',
          component: () => import('@/pages/CommunityView.vue'),
        } satisfies RouteRecordRaw,
      ]
    : []),
  /*
   * An explicit /404 so it can be prerendered to dist/404.html, which GitHub
   * Pages serves for any unmatched path. The catch-all below handles the same
   * component for client-side navigation.
   */
  {
    path: '/404',
    name: 'not-found-page',
    component: () => import('@/pages/NotFoundView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundView.vue'),
  },
]
