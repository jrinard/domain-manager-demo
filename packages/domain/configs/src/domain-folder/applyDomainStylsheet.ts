// // import { getDomainV4StylesheetPath } from "./getDomainV4StylesheetPath";
import { EnvironmentVariables } from '@spacedock/tricorder'
import { makePathFullyQualified } from '@tyto/assets'
import { getTopOrigin } from '@spacedock/origins'

const STYLESHEET_ATTRIBUTE_NAME = 'data-domain-stylesheet'
const LEGACY_STYLESHEET_ATTRIBUTE_NAME = 'data-legacy-domain-stylesheet'

type StylesheetAttributeName = typeof STYLESHEET_ATTRIBUTE_NAME | typeof LEGACY_STYLESHEET_ATTRIBUTE_NAME

function findStylesheetLinksOnDocument(attributeName: StylesheetAttributeName) {
  const styleTags = Array.from(
    document.head.querySelectorAll(
      `link[rel="stylesheet"][${attributeName}]`,
    ),
  )

  return styleTags
}

function removeStylesheetsFromDocument(
  imageIDException: number,
  stylesheetLinkTags: Element[],
  attributeName: StylesheetAttributeName,
) {
  let foundMatchingTag = false

  stylesheetLinkTags.forEach((styleTag) => {
    if (
      styleTag.getAttribute(attributeName) ===
      `${imageIDException || 0}`
    ) {
      foundMatchingTag = true
    } else {
      styleTag.remove()
    }
  })

  return foundMatchingTag
}

function createStylesheetLinkTag({
  imageID,
  pathURL,
  attributeName,
  originOverride,
}: {
  imageID: number
  pathURL: string
  attributeName: StylesheetAttributeName
  originOverride?: string
}) {
  const styleTag = document.createElement('link')
  styleTag.rel = 'stylesheet'
  styleTag.setAttribute(attributeName, `${imageID || 0}`)
  const topOrigin = getTopOrigin()

  const safeOrigin =
    topOrigin && !topOrigin.includes('localhost')
      ? topOrigin
      : EnvironmentVariables.ASSETS_BASE_URL

  styleTag.href = makePathFullyQualified({
    baseURL: originOverride || safeOrigin,
    relativePath: pathURL,
    // // relativePath: getDomainV4StylesheetPath(imageID),
  })

  return styleTag
}

export function applyStylesheetLinkToDocument(props: {
  imageID: number
  stylesheetPathURL: string
  sessionOncourseURL?: string
  attributeName?: StylesheetAttributeName
}) {
  if (!props.imageID) {
    console.error('Domain ID is required to apply Domain Styles')
    return
  }

  const attributeName = props.attributeName || STYLESHEET_ATTRIBUTE_NAME

  const stylesheetLinkTags = findStylesheetLinksOnDocument(attributeName)

  const foundMatchingTag = removeStylesheetsFromDocument(
    props.imageID || 0,
    stylesheetLinkTags,
    attributeName,
  )

  if (foundMatchingTag) {
    return
  }

  const stylesheetLinkTag = createStylesheetLinkTag({
    imageID: props.imageID,
    pathURL: props.stylesheetPathURL,
    attributeName,
    originOverride: props.sessionOncourseURL,
  })
  document.head.appendChild(stylesheetLinkTag)
}
