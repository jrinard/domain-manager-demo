import type { SectionRenderMode } from '@domain/configs'
import type {
  BannerItem as BannerItemType,
  MenuItemBanner,
  CustomTabBanner,
  ExternalLinkBanner,
  LessonBanner,
} from '@domain/schemas'
import type { DomainUI } from '@spacedock/manifest'
import { TextBody, TextHeading } from '@spacedock/falcon-ui'
import { Link } from '@spacedock/navigator'
import { useSyync } from '@spacedock/syyncronyyzed'
import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'
import { useMenuItem } from '../../hooks/useMenuItem'
import { useSafeDestinationPath } from '../../hooks/useSafeDestinationPath'
import { ButtonCard } from '../button/ButtonCard'

interface BannerItemProps {
  banner: BannerItemType
  attachments?: DomainUI.Attachment[]
  renderMode: SectionRenderMode
  domainID?: number
}

export const BannerItem = ({
  banner,
  attachments,
  renderMode,
  domainID,
}: BannerItemProps) => {
  // All hooks must be called before any early returns
  const { pathURL: imagePathURL } = useMatchingAttachment(
    banner?.imageID || 0,
    attachments,
  )

  const menuItemBanner = banner as MenuItemBanner
  const customTabBanner = banner as CustomTabBanner
  const externalLinkBanner = banner as ExternalLinkBanner
  const lessonBanner = banner as LessonBanner
  const syync = useSyync()

  const { menuItem } = useMenuItem({
    functionID:
      banner?.sub_type === 'menu-item' ? menuItemBanner?.functionID : undefined,
    traitID:
      banner?.sub_type === 'custom-tab' ? customTabBanner?.traitID : undefined,
    utilizeAdminEndponts: renderMode === 'mock',
    domainID,
  })

  // For external links, use URL directly (don't process through useSafeDestinationPath)
  // For internal links, use useSafeDestinationPath to handle relative paths
  let externalUrl: string | null = null
  if (banner?.sub_type === 'external-link' && externalLinkBanner?.url) {
    // Ensure external URLs have a protocol
    const rawUrl = externalLinkBanner.url.trim()
    if (rawUrl && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
      externalUrl = `https://${rawUrl}`
    } else {
      externalUrl = rawUrl
    }
  }
  
  const internalHref = banner?.sub_type !== 'external-link' ? menuItem?.href || '' : ''
  const safeDestinationPath = useSafeDestinationPath(internalHref || '#')

  // Defensive checks - after all hooks
  if (!banner || !banner.sub_type) {
    return null
  }

  const url = externalUrl || (safeDestinationPath && safeDestinationPath !== '#' ? safeDestinationPath : null)
  const target = banner.target || menuItem?.targetPref || '_self'
  const disabled =
    !url ||
    (banner.sub_type === 'menu-item' &&
      !!menuItemBanner.functionID &&
      !menuItem?.href) ||
    (banner.sub_type === 'custom-tab' &&
      !!customTabBanner.traitID &&
      !menuItem?.href) ||
    (banner.sub_type === 'external-link' && !externalLinkBanner.url) ||
    (banner.sub_type === 'lesson' && !lessonBanner.lessonID)

  const interactionType = banner.interactionType || 'banner'
  const showButton = interactionType === 'button'
  const buttonLabel = banner.buttonLabel || 'View'

  // Determine if banner should be clickable in banner mode
  // For external-link: need URL
  // For menu-item: need functionID (can use functionData even if href not resolved)
  // For custom-tab: need traitID AND menuItem?.href (href must be resolved from traitID)
  // For lesson: need lessonID
  // In edit/mock mode, banners should not be clickable to prevent navigation
  const isBannerClickable = (() => {
    if (interactionType !== 'banner') return false
    if (renderMode === 'mock') return false // Disable in edit/preview mode
    if (banner.sub_type === 'external-link') return !!externalLinkBanner.url
    if (banner.sub_type === 'menu-item') return !!menuItemBanner.functionID
    if (banner.sub_type === 'custom-tab') return !!customTabBanner.traitID && !!menuItem?.href
    if (banner.sub_type === 'lesson') return !!lessonBanner.lessonID
    return false
  })()

  // Button component - only shown when interactionType is 'button'
  // Use ButtonCard for consistent link handling with other sections
  // For lesson banners, handle click via syync instead of href
  const handleLessonClick = (e: React.MouseEvent) => {
    if (banner.sub_type === 'lesson' && lessonBanner.lessonID && syync?.isConnected) {
      e.preventDefault()
      void syync.sendMessage('launch-lesson-viewer', {
        lessonID: lessonBanner.lessonID,
      })
    }
  }

  const buttonElement = showButton ? (
    <div className="mt-2 max-w-[200px]" onClick={(e) => e.stopPropagation()}>
      {banner.sub_type === 'lesson' && lessonBanner.lessonID ? (
        <button
          onClick={handleLessonClick}
          disabled={!syync?.isConnected || renderMode === 'mock'}
          className="bg-primary hover:bg-primary-dark disabled:bg-grayscale-400 text-white disabled:text-grayscale-600 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed"
        >
          {buttonLabel}
        </button>
      ) : (
        <ButtonCard
          href={url || '#'}
          title={buttonLabel}
          variant="primary"
          size="medium"
          buttonWidth="auto"
          isExternal={banner.sub_type === 'external-link'}
          disabled={!url || disabled || renderMode === 'mock'}
          target={target}
        />
      )}
    </div>
  ) : null

  const bannerContent = (
    <div
      className={`relative flex min-h-[200px] w-full justify-start overflow-hidden rounded-lg bg-cover bg-center ${
        isBannerClickable ? 'cursor-pointer' : ''
      }`}
      style={{
        backgroundImage: imagePathURL ? `url(${imagePathURL})` : undefined,
        backgroundColor: imagePathURL ? 'transparent' : '#1a1a1a',
      }}
    >
      {/* Content */}
      <div className="relative z-[1] flex flex-col justify-center py-8 pl-[65px] pr-10">
        {/* Subtitle (hidden on mobile via CSS) */}
        {banner.subtitle && (
          <TextBody className="text-grayscale-200 mb-1 hidden text-sm md:block">
            {banner.subtitle}
          </TextBody>
        )}

        {/* Title */}
        <TextHeading size={2} className="text-white">
          {banner.urlName || ''}
        </TextHeading>

        {/* Button */}
        {buttonElement}
      </div>
    </div>
  )

  // If interactionType is 'button', don't wrap banner in link (button handles it)
  if (showButton) {
    // In button mode, only render banner without link wrapper
    return bannerContent
  }

  // If interactionType is 'banner', wrap entire banner in link based on banner type
  if (isBannerClickable) {
    if (banner.sub_type === 'external-link' && url) {
      // External link - use URL
      return (
        <a
          href={url}
          target={target}
          rel={target === '_blank' ? 'noreferrer' : undefined}
          className="block w-full cursor-pointer"
          style={{ display: 'block', width: '100%' }}
        >
          {bannerContent}
        </a>
      )
    } else if (banner.sub_type === 'menu-item' && menuItemBanner.functionID) {
      // Menu item - use functionID (href may not be resolved yet)
      return (
        <Link
          to={url || ''}
          functionData={{ id: menuItemBanner.functionID }}
          target={target}
          className="block w-full cursor-pointer"
          style={{ display: 'block', width: '100%' }}
        >
          {bannerContent}
        </Link>
      )
    } else if (banner.sub_type === 'custom-tab' && customTabBanner.traitID && menuItem?.href) {
      // Custom tab - use href from resolved menuItem (traitID is resolved to menuItem via useMenuItem hook)
      return (
        <Link 
          to={url || menuItem.href} 
          target={target} 
          className="block w-full cursor-pointer"
          style={{ display: 'block', width: '100%' }}
        >
          {bannerContent}
        </Link>
      )
    } else if (banner.sub_type === 'lesson' && lessonBanner.lessonID) {
      // Lesson - launch lesson viewer via syync
      return (
        <div
          onClick={handleLessonClick}
          className="block w-full cursor-pointer"
          style={{ display: 'block', width: '100%' }}
        >
          {bannerContent}
        </div>
      )
    }
  }

  // Not clickable - render without link
  return bannerContent
}
