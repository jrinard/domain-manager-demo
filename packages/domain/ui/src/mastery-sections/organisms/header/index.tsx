import type { MasteryHeaderSection as HeaderSectionType } from '@domain/configs'
import type { SectionRenderMode, HeaderSectionData } from '@domain/schemas'
import { TextHeading, TextBody, Button } from '@spacedock/falcon-ui'
import type { DomainUI } from '@spacedock/manifest'
import { Link } from '@spacedock/navigator'
import { useMatchingAttachment } from '../../../home-sections/hooks/useMatchingAttachment'
import { useSafeDestinationPath } from '../../../home-sections/hooks/useSafeDestinationPath'
import { createFileURL } from '../../../utils/file-path'

export interface HeaderSectionProps {
  section: HeaderSectionType
  renderMode?: SectionRenderMode
  attachments?: DomainUI.Attachment[]
}

export const HeaderSection = ({
  section,
  renderMode = 'prod',
  attachments,
}: HeaderSectionProps) => {
  // Get signature image from attachments - must be called before early return
  const { pathURL: signatureImageUrl } = useMatchingAttachment(
    section?.section_data?.signatureImageID ?? 0,
    attachments,
  )

  // Determine button href - convert relative paths to full URLs
  // Must be called before early return to follow Rules of Hooks
  const data: HeaderSectionData | undefined = section?.section_data as HeaderSectionData | undefined
  const buttonHref = useSafeDestinationPath(
    data?.buttonVideoPath
      ? data.buttonVideoPath.startsWith('/')
        ? createFileURL(data.buttonVideoPath)
        : data.buttonVideoPath
      : '',
  )

  if (!section || !data) return null

  // Check if button should be shown
  const shouldShowButton =
    data.showButton && data.buttonLabel && data.buttonVideoPath

  return (
    <div className="p-4 bg-grayscale-900 rounded-lg border border-grayscale-800 shadow-sm flex w-full flex-col gap-3 text-left">
      {data.largeTagline && (
        <TextHeading size={1} className="text-white">
          {data.largeTagline}
        </TextHeading>
      )}
      {data.quoteText && (
        <div className="flex flex-col gap-1">
          <TextBody className="text-white text-base">{data.quoteText}</TextBody>
          {data.quoteFrom && (
            <TextBody className="text-white text-sm italic opacity-75">
              {data.quoteFrom}
            </TextBody>
          )}
        </div>
      )}
      {data.signatureImageID && (
        <div className="w-full">
          {signatureImageUrl ? (
            <img
              src={signatureImageUrl}
              alt="Signature"
              className="max-h-[150px] w-auto"
            />
          ) : (
            <div className="text-sm text-white opacity-60">
              Signature Image (ID: {data.signatureImageID})
            </div>
          )}
        </div>
      )}
      {shouldShowButton && buttonHref && (
        <div>
          <Link to={buttonHref} target="_blank">
            <Button
              variant={data.buttonVariant || 'primary'}
              size={
                data.buttonSize === '2xl'
                  ? 'xxlarge'
                  : (data.buttonSize as
                      | 'tiny'
                      | 'small'
                      | 'medium'
                      | 'large'
                      | 'xlarge'
                      | 'xxlarge') || 'medium'
              }
            >
              {data.buttonLabel}
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
