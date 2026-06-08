import { HomeSectionWrapper } from '../home-section-wrapper'
import type { SectionRenderMode, HomeSection } from '@domain/configs'
import type { LogoAndButtonSectionData } from '@domain/schemas'
import { cva } from '@falcon/style'
import { ButtonDataWrapper } from '../button/ButtonDataWrapper'
import type { DomainUI } from '@spacedock/manifest'

const containerVariants = cva('flex w-full gap-4 p-2', {
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

const actionWrapVariants = cva(
  'flex flex-wrap items-center justify-center gap-2',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
      },
    },
  },
)

export const LogoAndButton = ({
  section,
  sectionData,
  attachments,
  logoPathURL,
  renderMode = 'prod',
}: {
  section: HomeSection<LogoAndButtonSectionData>
  sectionData: LogoAndButtonSectionData
  attachments?: DomainUI.Attachment[]
  logoPathURL?: string
  renderMode?: SectionRenderMode
}) => {
  const {
    logoAlt,
    imageSize = 4,
    buttons,
    buttonWidth = 'auto',
    direction = 'column',
    buttonsDirection = 'row',
  } = sectionData

  const containerClasses = containerVariants({ direction })
  const textWrapClasses = textWrapVariants({ direction })
  const actionWrapClasses = actionWrapVariants({ direction: buttonsDirection })

  return (
    <HomeSectionWrapper<LogoAndButtonSectionData>
      section={section}
      attachments={attachments}
      fallbackLayoutPosition={{ columnSpan: 'full' }}
      padding={section.metadata.padding ?? 'sm'}
    >
      <div className={containerClasses}>
        <div
          className={textWrapClasses}
          style={{
            maxWidth: `${(Math.min(12, Math.max(1, imageSize)) / 12) * 100}%`,
          }}
        >
          {logoPathURL && (
            <img
              src={logoPathURL}
              alt={logoAlt}
              className=" w-auto max-w-full object-contain"
            />
          )}
        </div>
        {!!buttons?.length && (
          <div className={actionWrapClasses}>
            {buttons.map((button, curIdx) => (
              <ButtonDataWrapper
                key={getButtonID(button) || curIdx}
                sectionData={button}
                dynamic_section_data={{ buttonWidth }}
                renderMode={renderMode}
              />
            ))}
          </div>
        )}
      </div>
    </HomeSectionWrapper>
  )
}

function getButtonID(button: LogoAndButtonSectionData['buttons'][number]) {
  if (button.sub_type === 'menu-item') {
    return button.functionID
  } else if (button.sub_type === 'custom-tab') {
    return button.traitID
  } else if (button.sub_type === 'external-link') {
    return button.url
  }
  return undefined
}
