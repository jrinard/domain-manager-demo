import { HomeSectionWrapper } from '../home-section-wrapper'
import type { HomeSection } from '@domain/configs'
import type { TextSectionData } from '@domain/schemas'
import { cva } from '@falcon/style'
import { TextEditor, PluginPresets } from '@spacedock/md-wysiwyg'

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

export const Text = ({
  section,
  sectionData,
}: {
  section: HomeSection<TextSectionData>
  sectionData: TextSectionData
}) => {
  const { content } = sectionData
  const containerClasses = containerVariants({ direction: 'row' })
  const textWrapClasses = textWrapVariants({ direction: 'row' })
  const actionWrapClasses = actionWrapVariants({ direction: 'row' })

  return (
    <HomeSectionWrapper<TextSectionData>
      section={section}
      fallbackLayoutPosition={{ columnSpan: 'full' }}
      padding={section.metadata.padding ?? 'sm'}
    >
      <div className={containerClasses}>
        <div className={textWrapClasses}>
          {content && (
            <div className="text-foreground/80 mt-1 max-w-full">
              <TextEditor
                markdown={content}
                plugins={PluginPresets.READONLY__TEXT_ONLY_PLUGINS}
              />
            </div>
          )}
        </div>
        <div className={actionWrapClasses} />
      </div>
    </HomeSectionWrapper>
  )
}

