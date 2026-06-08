import { Fragment } from 'react'
import { HomeSectionWrapper } from '../home-section-wrapper'
import type {
  SectionRenderMode,
  HomeSection,
  ItemsGroupSection as ItemsGroupSectionType,
} from '@domain/configs'
import { useLayoutDataFromSection } from '@domain/configs'
import type { ItemsGroupSectionData } from '@domain/schemas'
import { cva, mergeClasses } from '@falcon/style'
import { ButtonDataWrapper } from '../button/ButtonDataWrapper'
import { LinkDataWrapper } from '../link/LinkDataWrapper'
import type { DomainUI } from '@spacedock/manifest'

const containerVariants = cva('flex h-full w-full', {
  variants: {
    flow: {
      row: 'flex-row flex-wrap gap-4',
      column: 'flex-col gap-4',
      grid: 'grid gap-6',
    },
    gridColumns: {
      none: '',
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      auto: 'grid-cols-auto',
      full: 'grid-cols-full',
    },
    alignment: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      'center-center': 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-left': 'items-end justify-start',
      'bottom-center': 'items-end justify-center',
      'bottom-right': 'items-end justify-end',
    },
  },
  defaultVariants: {
    flow: 'row',
    gridColumns: 6,
    alignment: 'center-center',
  },
})

/** Row flow: keep horizontal justify from alignment, always stretch cross-axis so siblings match tallest (e.g. tab icons). */
const ROW_JUSTIFY: Record<ItemsGroupSectionData['alignment'], string> = {
  'top-left': 'justify-start',
  'top-center': 'justify-center',
  'top-right': 'justify-end',
  'center-left': 'justify-start',
  'center-center': 'justify-center',
  'center-right': 'justify-end',
  'bottom-left': 'justify-start',
  'bottom-center': 'justify-center',
  'bottom-right': 'justify-end',
}

export const ItemsGroup = ({
  section,
  sectionData,
  dynamic_section_data,
  renderMode = 'prod',
  attachments,
}: {
  section: HomeSection<ItemsGroupSectionData>
  sectionData: ItemsGroupSectionData
  renderMode?: SectionRenderMode
  dynamic_section_data?: ItemsGroupSectionType['dynamic_section_data'] & {
    domainID?: number
  }
  attachments?: DomainUI.Attachment[]
}) => {
  const {
    items = [],
    flow = 'row',
    alignment = 'center-center',
    buttonWidth = 'auto',
  } = sectionData

  const { columnSpan } = useLayoutDataFromSection({
    section,
    fallbackLayoutPosition: { columnSpan: 'full' },
  })

  const containerClasses = mergeClasses(
    containerVariants({
      flow,
      // Row: dummy alignment — real row alignment is ROW_JUSTIFY + items-stretch below
      alignment: flow === 'row' ? 'top-left' : alignment,
      gridColumns: flow === 'grid' ? columnSpan : 'none',
    }),
    flow === 'row' && mergeClasses(ROW_JUSTIFY[alignment], 'items-stretch'),
  )

  const isButton = (item: ItemsGroupSectionData['items'][number]) => {
    // Check if the item has buttonVariant property (buttons have this, links don't)
    return 'buttonVariant' in item
  }

  return (
    <HomeSectionWrapper<ItemsGroupSectionData>
      section={section}
      fallbackLayoutPosition={{ columnSpan: 'full' }}
      padding={section.metadata.padding ?? 'none'}
    >
      <div className={containerClasses}>
        {items.map((item, curIdx) => {
          const itemId = getItemID(item)
          const listKey = itemId ?? curIdx

          if (isButton(item)) {
            const el = (
              <ButtonDataWrapper
                sectionData={item}
                dynamic_section_data={{
                  ...(dynamic_section_data as any),
                  buttonWidth,
                  parentAlignment: alignment,
                  inGrid: flow === 'grid',
                  stretchWithRow: flow === 'row',
                }}
                renderMode={renderMode}
              />
            )
            return flow === 'grid' ? (
              <div
                key={listKey}
                className="min-w-0 w-full max-w-full justify-self-stretch"
              >
                {el}
              </div>
            ) : (
              <Fragment key={listKey}>{el}</Fragment>
            )
          }

          const linkEl = (
            <LinkDataWrapper
              sectionData={item as any}
              metadata={null}
              dynamic_section_data={{
                ...(dynamic_section_data as any),
                linkWidth: buttonWidth,
                parentAlignment: alignment,
                inGrid: flow === 'grid',
                stretchWithRow: flow === 'row',
              }}
              renderMode={renderMode}
              attachments={attachments}
            />
          )
          return flow === 'grid' ? (
            <div
              key={listKey}
              className="min-w-0 w-full max-w-full justify-self-stretch"
            >
              {linkEl}
            </div>
          ) : (
            <Fragment key={listKey}>{linkEl}</Fragment>
          )
        })}
      </div>
    </HomeSectionWrapper>
  )
}

function getItemID(item: ItemsGroupSectionData['items'][number]) {
  if (item.sub_type === 'menu-item') {
    return item.functionID
  } else if (item.sub_type === 'custom-tab') {
    return item.traitID
  } else if (item.sub_type === 'external-link') {
    return item.url
  }
  return undefined
}
