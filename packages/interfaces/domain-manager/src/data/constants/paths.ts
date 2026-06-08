const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

/** Portfolio demo landing domain (Columbia Bank). */
export const PORTFOLIO_DEMO_DOMAIN_ID = 551

/** Allowed domain IDs in the portfolio picker (keep in sync with demoStore DEMO_DOMAINS). */
export const PORTFOLIO_DEMO_DOMAIN_IDS = new Set([551, 1001, 1002])

/** URL segment for the start/home tab (`tryyb` in production, `home` in portfolio demo). */
export const HOME_TAB_ROUTE = IS_PORTFOLIO_DEMO ? 'home' : 'tryyb'

export const DOMAIN_MANAGER_PATHS = {
  // Portfolio: BrowserRouter basename is /domain-manager — paths stay relative to that root.
  BASE_ROUTE: '',
} as const

export function homeTabPath(scope: 'domain' | 'team', id: number): string {
  return `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/${scope}/${id}/${HOME_TAB_ROUTE}`
}