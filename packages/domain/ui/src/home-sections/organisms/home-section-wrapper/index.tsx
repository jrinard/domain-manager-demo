import type { PropsWithChildren } from 'react'
import type { HomeSection, SectionLayoutPosition } from '@domain/configs'
import { CardSizingWrapper } from '@spacedock/bento'
import { cva, VariantProps } from '@falcon/style'
import { OverrideLayoutData, useLayoutDataFromSection } from '@domain/configs'
import type { DomainUI } from '@spacedock/manifest'
import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'
import { pullBGImageID } from '../../../utils/attachments'

const variants = cva('', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-6 py-8',
      '2xl': 'px-8 py-10',
      '3xl': 'px-10 py-14',
    },
  },
  defaultVariants: {
    padding: 'lg',
  },
})

interface HomeSectionWrapperProps<DataType extends Record<string, unknown>>
  extends VariantProps<typeof variants> {
  section: HomeSection<DataType>
  attachments?: DomainUI.Attachment[]
  fallbackLayoutPosition?: SectionLayoutPosition
  overrideLayoutData?: OverrideLayoutData
}

export const HomeSectionWrapper = <DataType extends Record<string, unknown>>({
  children,
  section,
  attachments,
  fallbackLayoutPosition,
  overrideLayoutData,
  padding = 'lg',
}: PropsWithChildren<HomeSectionWrapperProps<DataType>>) => {
  const { pathURL } = useMatchingAttachment(
    pullBGImageID(section) ?? 0,
    attachments,
  )
  const { columnSpan, rowSpan, areaName, bgColor, style } =
    useLayoutDataFromSection({
      section,
      fallbackLayoutPosition,
      overrideLayoutData,
      bgImageURL: pathURL,
    })

  return (
    <CardSizingWrapper
      className={variants({ padding })}
      bgColor={bgColor}
      rounded={section.metadata.rounding ?? 'lg'}
      columnSpan={columnSpan}
      rowSpan={rowSpan}
      areaName={areaName}
      textColor={section.metadata?.textColor}
      style={style}
    >
      {children}
    </CardSizingWrapper>
  )
}
