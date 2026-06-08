import { Button } from '@falcon/buttons'
import { HomeSectionWrapper } from '../home-section-wrapper'
import type { HomeSection } from '@domain/configs'
import type { WelcomeSectionData } from '@domain/schemas'
import { useCurrentUser } from '@spacedock/chaincode'
import { useMenuItem } from '../../hooks/useMenuItem'
import { cva } from '@falcon/style'

const containerVariants = cva('flex w-full gap-4 p-6', {
  variants: {
    direction: {
      row: 'flex-row items-center justify-between',
      column: 'flex-col items-center justify-center text-center',
    },
  },
})

const textWrapVariants = cva('flex min-w-0 flex-col', {
  variants: {
    direction: {
      row: '',
      column: 'items-center',
    },
  },
})

const actionWrapVariants = cva('', {
  variants: {
    direction: {
      row: 'shrink-0',
      column: 'mt-3 shrink-0',
    },
  },
})

export const Welcome = ({
  section,
  sectionData,
}: {
  section: HomeSection<WelcomeSectionData>
  sectionData: WelcomeSectionData
}) => {
  const {
    welcomeText,
    welcomeUser,
    description,
    buttons,
    direction = 'row',
  } = sectionData
  const flow = (sectionData as any).flow || 'forward'

  const currentUser = useCurrentUser()
  const anyUser = currentUser as any
  const fullName: string =
    anyUser?.person?.name || anyUser?.name || anyUser?.userName || ''
  const firstName = fullName.split(' ').filter(Boolean)[0] || ''

  const baseContainer = containerVariants({ direction })
  const reverseClass =
    flow === 'reverse' ? (direction === 'row' ? 'flex-row-reverse' : 'flex-col-reverse') : ''
  // alignment from section data or metadata (left | center | right)
  const alignment =
    (sectionData as any).alignment ||
    (section.metadata as any)?.alignment ||
    'center'
  const itemsAlignmentClass =
    direction === 'column'
      ? alignment === 'left'
        ? 'items-start'
        : alignment === 'right'
        ? 'items-end'
        : 'items-center'
      : ''

  const textAlignClass =
    alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center'

  const containerClasses = [baseContainer, reverseClass, itemsAlignmentClass].filter(Boolean).join(' ')
  const textWrapClasses = [textWrapVariants({ direction }), textAlignClass].filter(Boolean).join(' ')
  const actionWrapClasses = actionWrapVariants({ direction })
  const RenderButton = ({ button }: { button: any }) => {
    // Resolve menu/custom-tab data if needed
    const { menuItem } = useMenuItem({
      functionID: button?.functionID,
      traitID: button?.traitID,
    })

    const href =
      button?.sub_type === 'external-link'
        ? button?.url || '#'
        : menuItem?.href || '#'

    const label =
      button?.textOverride || menuItem?.title || 'Start Training'

    const variant = (button?.buttonVariant as any) || 'primary'

    return (
      <a href={href} target="_blank" rel="noreferrer">
        <Button variant={variant}>{label}</Button>
      </a>
    )
  }

  return (
    <HomeSectionWrapper<WelcomeSectionData>
      section={section}
      fallbackLayoutPosition={{ columnSpan: 'full' }}
      padding={section.metadata.padding ?? 'sm'}
    >
      <div className={containerClasses}>
      <div className={textWrapClasses}>
          <div className={`${textAlignClass} w-full font-sans text-2xl font-bold tracking-tight text-site-fg`}>
            {welcomeText} {welcomeUser ? `${firstName}!` : ''}
          </div>
          {description && (
            <div className={`${textAlignClass} w-full mt-1 max-w-full text-sm text-site-fg `}>
              {description}
            </div>
          )}
        </div>
        <div className={actionWrapClasses}>
          <div className={direction === 'row' ? 'flex items-center gap-2' : 'flex flex-col items-center gap-2'}>
            {Array.isArray(buttons) && buttons.length > 0 &&
              buttons.map((btn, idx) => <RenderButton key={idx} button={btn} />)}
          </div>
        </div>
      </div>
    </HomeSectionWrapper>
  )
}
