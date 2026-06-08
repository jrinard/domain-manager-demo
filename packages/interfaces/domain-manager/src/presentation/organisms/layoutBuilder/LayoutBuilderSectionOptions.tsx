import { Fragment } from 'react'
import { Icon } from '@falcon/icons'
import { TextHeading, TextBody } from '@spacedock/falcon-ui'

import { sectionList } from '../../../data/constants'

interface Props {
  onSelect: (sectionId: string) => void
}

const LayoutBuilderSectionOptions = ({ onSelect }: Props) => {
  return (
    <div
      className="bg-grayscale-200 dark:bg-grayscale-900 w-40 rounded-lg p-2"
      data-id="sections-list"
    >
      <TextHeading size={4} className="mb-4 text-white">
        Sections
      </TextHeading>
      <div className="space-y-1">
        {sectionList.map((section, index) => {
          const isLocked = false
          const isSelected = false
          const isPlaced = false
          const isDisabled = (section as any).disabled
          const showDivider =
            index > 0 &&
            (section as any).disabled &&
            !(sectionList[index - 1] as any)?.disabled

          return (
            <Fragment key={section.id}>
              {showDivider && (
                <div className="border-grayscale-700 my-3 border-t" />
              )}
              <div
                className={`flex items-center gap-2 rounded-md px-1 py-1 transition-colors ${
                  isDisabled
                    ? 'cursor-not-allowed text-gray-600 opacity-50'
                    : isLocked
                      ? 'cursor-not-allowed text-gray-500'
                      : isSelected
                        ? 'bg-grayscale-200 dark:bg-grayscale-800 text-site-fg cursor-pointer'
                        : 'hover:bg-grayscale-800 cursor-pointer text-gray-300 hover:text-white'
                }`}
                onClick={() => {
                  if (isDisabled || isLocked) return
                  onSelect(section.id)
                }}
              >
                <Icon
                  icon={
                    isPlaced
                      ? 'checkbox-blank-circle'
                      : 'checkbox-blank-circle-outline'
                  }
                  size="xs"
                  color={isPlaced ? 'error' : 'current'}
                />
                <TextBody className="text-sm">{section.label}</TextBody>
                {isLocked && (
                  <Icon
                    icon="lock"
                    size="sm"
                    color="primary"
                    className="ml-auto"
                  />
                )}
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default LayoutBuilderSectionOptions
