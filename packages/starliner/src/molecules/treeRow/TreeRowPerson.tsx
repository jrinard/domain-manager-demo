import { cva, mergeClasses, VariantProps } from '@falcon/style'
import type { SecondaryMatchData } from '@falcon/text-highlighter'
import { TextHighlighter } from '@falcon/text-highlighter'

import type { TreeRowProps } from './TreeRow'
import { TreeRow } from './TreeRow'

import { ensure3 } from '../../utils'
import { useMemo } from 'react'

const variants = cva('', {
  variants: {
    indentation: {
      lg: 'pl-5',
      md: 'pl-2.5',
      sm: 'pl-1',
    },
    indentationLine: {
      true: 'border-light-300/50 border-l',
      false: '',
    },
    borderColor: {
      [-1]: '',
      0: 'border-light-300',
      1: 'border-light-300/60',
      2: 'border-light-300/30',
    },
  },
  defaultVariants: {
    indentation: 'lg',
    indentationLine: false,
    borderColor: -1,
  },
})

export interface TreeRowPersonProps
  extends TreeRowProps,
    VariantProps<typeof variants> {
  level?: number
  primaryTeamName: string
  lastActivityDate: string | Date
  personID?: number
  onPrimaryTeamSelect?: () => void
  hightlight?: boolean
  trailingText?: string
  email?: string
}

const TreeRowPerson = ({
  indentation,
  level = 0,
  primaryTeamName,
  lastActivityDate,
  personID,
  email,
  onPrimaryTeamSelect,
  onSelect,
  highlight,
  trailingText,
  ...props
}: TreeRowPersonProps) => {
  const secondaryHighlightItems = useMemo((): SecondaryMatchData[] => {
    return [
      { propertyName: 'email', value: `${email || ''}` },
      { propertyName: 'personID', value: `${personID || ''}` },
    ]
  }, [personID, email])

  return (
    <TreeRow
      {...props}
      highlight={highlight}
      personID={personID}
      onSelect={onSelect}
      hideIcon
      trailingText={trailingText}
      secondaryMatches={secondaryHighlightItems}
    >
      {props.showChildren ? (
        <div
          className={mergeClasses(
            variants({ indentation, borderColor: ensure3(level) }),
          )}
        >
          <div className="flex flex-row text-xs opacity-50">
            <p
              className="pl-4 text-xs"
              onClick={onPrimaryTeamSelect}
              role={onPrimaryTeamSelect ? 'button' : undefined}
            >
              <TextHighlighter
                text={primaryTeamName}
                searchTerm={props.searchTerm}
              />
            </p>
          </div>
        </div>
      ) : null}
    </TreeRow>
  )
}

export { TreeRowPerson }
