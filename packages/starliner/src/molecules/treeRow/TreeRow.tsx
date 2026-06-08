import type { PropsWithChildren, ComponentProps } from 'react'
import { TextHighlighter } from '@falcon/text-highlighter'

import { cva, mergeClasses, VariantProps } from '@falcon/style'
import { IconButton } from '@spacedock/falcon-ui'

import { TreeRowLabel, RowLabelProps } from '../treeRowLabel/TreeRowLabel'

const variants = cva('relative flex flex-col', {
  variants: {
    isDeactivated: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    isDeactivated: false,
  },
})

export interface TreeRowProps
  extends PropsWithChildren,
    VariantProps<typeof variants>,
    RowLabelProps,
    Pick<ComponentProps<typeof TextHighlighter>, 'secondaryMatches'> {
  searchTerm?: string
  showChildren: boolean
  updateShowChildren: (newVal: boolean) => void
  hideIcon?: boolean
  onSelect: () => void
  highlight?: boolean
  teamID?: number
  personID?: number
  className?: string
  trailingText?: string
  isFocused?: boolean
  toggleFocusTeamID?: (teamID: number) => void
}

const TreeRow = ({
  showChildren,
  title,
  updateShowChildren,
  type,
  highlight,
  teamID,
  personID,
  hideIcon,
  children,
  isDeactivated,
  trailingText,
  secondaryMatches,
  toggleFocusTeamID,
  isFocused,
  ...props
}: TreeRowProps) => {
  return (
    <TreeRowBase
      isDeactivated={isDeactivated}
      type={typeScope(type)}
      subType={type}
      childrenShowing={showChildren}
      isSearching={!!props.searchTerm}
    >
      <div
        className={mergeClasses(
          'group flex w-full flex-row items-center',
          highlight ? 'bg-bg-contrast-high rounded-md bg-opacity-40' : '',
        )}
      >
        {hideIcon ? (
          <span className="h-5 w-5" />
        ) : (
          <IconButton
            onClick={() => updateShowChildren(!showChildren)}
            icon={showChildren ? 'chevron-down' : 'chevron-right'}
          />
        )}
        <button
          className="nowrap flex flex-row items-center gap-1"
          onClick={props.onSelect}
        >
          <TreeRowLabel
            title={title}
            type={type}
            subType={props.subType}
            searchTerm={props.searchTerm}
            secondaryMatches={secondaryMatches}
          />
          {teamID && toggleFocusTeamID ? (
            <IconButton
              className={mergeClasses(
                'opacity-0 transition-opacity',
                isFocused
                  ? 'text-rose-700 opacity-100 group-hover:opacity-100'
                  : 'group-hover:opacity-60',
              )}
              icon="image-filter-center-focus-weak"
              onClick={() => toggleFocusTeamID(teamID)}
            />
          ) : null}
          {trailingText && (
            <span className="nowrap text-muted-fg flex flex-row gap-1 text-xs">
              -
              <TextHighlighter
                text={trailingText}
                searchTerm={props.searchTerm}
              />
            </span>
          )}
        </button>
      </div>
      {children}
    </TreeRowBase>
  )
}

TreeRow.displayName = 'TreeRow'

function typeScope(type: TreeRowProps['type']) {
  switch (type) {
    case 'user':
    case 'teamLeader':
      return 'user'
    case 'domain':
    case 'project':
    case 'team':
      return 'team'
    default:
      return type || 'n/a'
  }
}

export interface TreeRowBaseProps
  extends PropsWithChildren,
    VariantProps<typeof variants>,
    Pick<TreeRowProps, 'isDeactivated'> {
  type?: string
  subType?: string
  childrenShowing?: boolean
  isSearching?: boolean
}

const TreeRowBase = ({
  isDeactivated,
  children,
  type,
  subType,
  childrenShowing,
  isSearching,
}: TreeRowBaseProps) => {
  return (
    <li
      className={mergeClasses(
        variants({ isDeactivated }),
        // // 'group/row',
        // // 'before:absolute before:left-2.5 before:top-10 before:h-[calc(100%-45px)] before:border-l before:border-white/30 before:content-[""]',
        // // 'before:opacity-0',
        // // 'hover:before:opacity-100 focus-visible:before:opacity-100',
        // // '[&:has([data-rowtype="team"][data-rowchildrenshowing="true"]:focus-visible)]:before:opacity-0',
        // // '[&:has([data-rowtype="team"][data-rowchildrenshowing="true"]:hover)]:before:opacity-0',
      )}
      data-rowtype={type}
      data-rowsubtype={subType}
      data-rowchildrenshowing={childrenShowing}
      data-rowissearching={isSearching}
    >
      {children}
    </li>
  )
}
TreeRowBase.displayName = 'TreeRowBase'

export { TreeRow, TreeRowBase }
