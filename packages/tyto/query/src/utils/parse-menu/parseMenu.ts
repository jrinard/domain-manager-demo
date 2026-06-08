import * as _ from 'lodash'
import type { Data, TytoData } from '@spacedock/manifest'
import { FUNCTIONS_BY_NAME } from '@spacedock/manifest'

import { STANDARD_RELATIONS } from './constants'
import * as MenuLinkHelpers from './menuRelLinkHelpers'

const historicalOptions = [
  STANDARD_RELATIONS.NL,
  STANDARD_RELATIONS.Legacy_V2_UI,
  STANDARD_RELATIONS.Client_Portal,
]

export const tabOptions = {
  NO_MENU: '::hidemenu',
  NO_MENU_AND_SCROLL: '::nomenscr',
  NO_SCROLL: '::noscroll',
}

function generateUserNLLinks(session: Data.SessionData) {
  const default_OverrideLink = MenuLinkHelpers.createNLRel({
    id: session.domainID ?? 0,
    idType: 'domainID',
    relType: 'Default',
  })

  const beta_DomainLink = MenuLinkHelpers.createNLRel({
    id: session.domainID ?? 0,
    idType: 'domainID',
    relType: 'Beta',
  })
  const beta_SecurityRoleLink = MenuLinkHelpers.createNLRel({
    id: session.roleID ?? 0,
    idType: 'roleID',
    relType: 'Beta',
  })

  const alpha_SecurityRoleLink = MenuLinkHelpers.createNLRel({
    id: session.roleID ?? 0,
    idType: 'roleID',
    relType: 'Alpha',
  })
  const alpha_UserLink = MenuLinkHelpers.createNLRel({
    id: session.userID ?? 0,
    idType: 'userID',
    relType: 'Alpha',
  })

  const legacy_DomainLink = MenuLinkHelpers.createNLRel({
    id: session.domainID ?? 0,
    idType: 'domainID',
    relType: 'Legacy',
  })
  const legacy_SecurityRoleLink = MenuLinkHelpers.createNLRel({
    id: session.roleID ?? 0,
    idType: 'roleID',
    relType: 'Legacy',
  })

  const development_SecurityRoleLink = MenuLinkHelpers.createNLRel({
    id: session.roleID ?? 0,
    idType: 'roleID',
    relType: 'Development',
  })
  const development_UserLink = MenuLinkHelpers.createNLRel({
    id: session.userID ?? 0,
    idType: 'userID',
    relType: 'Development',
  })

  return [
    default_OverrideLink,
    beta_DomainLink,
    beta_SecurityRoleLink,
    alpha_SecurityRoleLink,
    alpha_UserLink,
    legacy_DomainLink,
    legacy_SecurityRoleLink,
    development_SecurityRoleLink,
    development_UserLink,
  ]
}

function findNLLinks(
  session: Data.SessionData,
  links: TytoData.MenuItemLink[],
) {
  // * NOTE: Move out and pass in as a parameter
  const nlLinks = new Set(generateUserNLLinks(session))

  // * finds each link that has a rel matching the output of `generateUserNLLinks`
  // * stating which `relType` it is, such as `Default`, `Beta`, `Alpha`, `Legacy`, or `Development`
  // * then folds them into the `item` object
  const foundLinks: {
    Mobile?: TytoData.MenuItemLink
    Default?: TytoData.MenuItemLink
    Beta?: TytoData.MenuItemLink
    Alpha?: TytoData.MenuItemLink
    Legacy?: TytoData.MenuItemLink
    Development?: TytoData.MenuItemLink
  } = {}

  let iframeOrigin: string | undefined

  // * Iterate over each link and then each rel for that link
  _.forEach(links, (link) => {
    const standardRels = new Set<string>()

    _.forEach(link.rel, (rel) => {
      // * Only if the rel is in the `nlLinks` set and the matching override is not already found will we add it to the `foundLinks` object
      // * NOTE: Intentionally not suporting the same Menu Item having multiple items; `Beta` links, for example.
      if (nlLinks.has(rel)) {
        if (!foundLinks.Default && MenuLinkHelpers.relIsDefaultOverride(rel)) {
          foundLinks.Default = link
        } else if (!foundLinks.Beta && MenuLinkHelpers.relIsBeta(rel)) {
          foundLinks.Beta = link
        } else if (!foundLinks.Alpha && MenuLinkHelpers.relIsAlpha(rel)) {
          foundLinks.Alpha = link
        } else if (!foundLinks.Legacy && MenuLinkHelpers.relIsLegacy(rel)) {
          foundLinks.Legacy = link
        } else if (!foundLinks.Development && MenuLinkHelpers.relIsDev(rel)) {
          foundLinks.Development = link
        }
      } else if (MenuLinkHelpers.relIsIframe(rel)) {
        iframeOrigin = MenuLinkHelpers.pullIframeSrcFromRel(rel) || undefined
        // * Since the foundLinks are set by reference, we need to set the `_iframeSrc` property
        // * on the link object and it *SHOULD* update all the foundLinks objects for this Link.
        link._iframeSrc = iframeOrigin
      } else if (MenuLinkHelpers.relIsStandard(rel)) {
        standardRels.add(rel)
      }
    })

    if (
      !foundLinks.Mobile &&
      standardRels.has(STANDARD_RELATIONS.Mobile_UI) &&
      standardRels.has(STANDARD_RELATIONS.NL)
    ) {
      foundLinks.Mobile = link
    }
  })

  return foundLinks
}

function parseMenuItem({
  session,
  menuItem,
  relMap,
  menuItemLinkMutator,
}: {
  session: Data.SessionData
  menuItem: TytoData.MenuItemUnparsed
  relMap: RelationMap
  menuItemLinkMutator?: (menuItemLink: TytoData.MenuItemLink) => TytoData.MenuItemLink,
}): TytoData.MenuItemParsed {
  const consumableLinks = prepareAndFilterConsumable(menuItem, relMap, menuItemLinkMutator)
  // * Lying to TypeScript without removing `links` property
  // const item: TytoData.MenuItemParsed = _.omit(menuItem, ["fake_property"]);
  const { subMenu, ...saferUnParsedItems } = menuItem
  const item: TytoData.MenuItemParsed = {
    ...saferUnParsedItems,
    href: '',
    title: saferUnParsedItems?.title || '',
    iconPath: saferUnParsedItems?.iconPath || '',
    iconPathLarge: saferUnParsedItems?.iconPathLarge || '',
    hideMenu: false,
    noScroll: false,
    _mobileHref: '',
    _mobileTargetPref: undefined,
  }

  if (subMenu) {
    // * Lying to TypeScript because it there is a `subMenu`, at this pont it has already been parsed and set on this otherwise unparsed menuItem.
    item.subMenu = subMenu as unknown as TytoData.MenuItemParsed[]
  }

  // * Call a function that finds each link that has a rel matching the output of `generateUserNLLinks`
  // * stating which `relType` it is, such as `Default`, `Beta`, `Alpha`, `Legacy`, or `Development`
  const foundLinks = findNLLinks(session, consumableLinks)
  // * ...then folds them into the `item` object
  _.merge(item, foundLinks)

  // * If Default Override exists, use it, otherwise use the first link in the [prioritized] list
  const consumableLink = foundLinks.Default
    ? foundLinks.Default
    : _.first(
        _.sortBy(consumableLinks, (cl) =>
          Math.min.apply(
            null,
            _.map(cl.rel, (r: string) => 
              typeof relMap[r] === 'number' ? relMap[r] : 1_000,
            ),
          ),
        ),
      )

  // * NOTE: I *think* most of this is deprecated behavior? If not wll need to update type to utilize `TytoData.CustomMenuActionPref`
  // // if (consumableLink?.targetPref?.indexOf(tabOptions.NO_MENU_AND_SCROLL) > -1) {
  // //     item.hideMenu = true;
  // //     item.noScroll = true;
  // // } else if (consumableLink.targetPref.indexOf(tabOptions.NO_MENU) > -1) {
  // //     item.hideMenu = true;
  // //     item.noScroll = false;
  // // } else if (consumableLink.targetPref.indexOf(tabOptions.NO_SCROLL) > -1) {
  // //     item.hideMenu = false;
  // //     item.noScroll = true;
  // // } else {
  // //     item.hideMenu = false;
  // //     item.noScroll = false;
  // // }

  if (foundLinks.Mobile) {
    item._mobileHref = somewhatSafelyLowerCaseHREF(foundLinks.Mobile.href)
    item._mobileTargetPref = foundLinks.Mobile.targetPref
  }

  if (menuItem?.functionID === FUNCTIONS_BY_NAME['Page Portal']?.functionID) {
    // * If this is a `/v25/nl/__red.asp` link for a Custom Tab, lets append the `traitID` as a searchParam
    if (
      /^\/v25\/__red\.asp/i.test(consumableLink?.href ?? '') &&
      /^(traitID=\d)/i.test(menuItem.functionName)
    ) {
      const url = new URL(
        `${consumableLink?.href ?? ''}&${menuItem.functionName}`,
        window.location.origin,
      )
      url.searchParams.set('traitID', menuItem.functionName.split('=')[1])

      if (consumableLink) {
        consumableLink.href = `${url.pathname}${url.search}`
      }
    }
  }

  if (consumableLink) {
    item.href = somewhatSafelyLowerCaseHREF(consumableLink.href)
    item.targetPref = typeSafeTargetPref(consumableLink.targetPref)
    item.title = consumableLink.title
  }

  return item
}

function typeSafeTargetPref(targetPref: string): TytoData.MenuItemTargetPref {
  targetPref = targetPref.replace('::hidemenu', '').replace('::nomenscr', '')

  switch (targetPref) {
    case '_top':
      return '_top'
    case '_self':
      return '_self'
    case '_blank':
      return '_blank'
    case 'iframe':
      return 'iframe'
    default:
      return '_top'
  }
}

interface RelationMap {
  [x: string]: number
}

function prepareAndFilterConsumable(
  { links }: TytoData.MenuItemUnparsed,
  relMap: RelationMap,
  menuItemLinkMutator?: (menuItemLink: TytoData.MenuItemLink) => TytoData.MenuItemLink,
) {
  // // return _.filter(links, hasValidRel(relMap))
  return _.filter(links, link => {
    if (!hasValidRel(relMap)) {
      return false
    }
    
    if (menuItemLinkMutator) {
      menuItemLinkMutator(link)
    }

    return true
})
}

function isConsumable(relMap: RelationMap) {
  return ({ links }: TytoData.MenuItemUnparsed) =>
    _.some(links, hasValidRel(relMap))
}

function hasValidRel(relMap: RelationMap) {
  return ({ rel }: TytoData.MenuItemLink) =>
    _.some(rel, (r: string) => relMap[r] !== undefined)
}

function generateStandardSortedRels(session: Data.SessionData) {
  const [default_OverrideLink, ...rest] = generateUserNLLinks(session)
  const [nl_link, legacy_V2_UI, clientPortal] = historicalOptions

  return [
    default_OverrideLink,
    STANDARD_RELATIONS.Default,
    nl_link,
    legacy_V2_UI,
    clientPortal,
    ...rest,
  ]
}

function somewhatSafelyLowerCaseHREF(href: string) {
  const [url, maybeExistingParams] = href.split('?')

  // * If we simply call `toLowerCase()` on the `href` property, we'll lose case sensitivity on any existing params.
  // * This did occur and broke Mastery on OnPoint T_T
  return `${url.toLowerCase()}${maybeExistingParams ? `?${maybeExistingParams}` : ''}`
}

interface ParseMenuOptions {
  relTags?: string[],
  menuItemLinkMutator?: (menuItemLink: TytoData.MenuItemLink) => TytoData.MenuItemLink,
}

export function parseMenu(
  session: Data.SessionData,
  menuItems: TytoData.MenuItemUnparsed[],
  opts?: ParseMenuOptions
): TytoData.MenuItemParsed[] {
  const safeOpts = opts || {}

  if (!safeOpts.relTags || !safeOpts.relTags.length) {
    safeOpts.relTags = generateStandardSortedRels(session)
  }

  const relMap: RelationMap = _.reduce(
    safeOpts.relTags,
    (map: RelationMap, rl, idx) => {
      map[rl] = idx + 1
      return map
    },
    {},
  )

  return menuItems
    .filter(isConsumable(relMap))
    .map((unparsedMenuItem): TytoData.MenuItemParsed => {
      if (unparsedMenuItem.subMenu) {
        // * NOTE: Telling TypeScript not to worry about it. It is confused and I am confused about how to convince it not to be confused. /shrug
        // @ts-expect-error - This is a temporary fix to get the type to work
        unparsedMenuItem.subMenu = parseMenu(
          session,
          unparsedMenuItem.subMenu,
          safeOpts,
        )
      }

      return parseMenuItem({ menuItem: unparsedMenuItem, relMap, session, menuItemLinkMutator: safeOpts.menuItemLinkMutator })
    })
}
