import { Icon } from '@falcon/icons'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React, { PropsWithChildren, ComponentProps } from 'react'
import { TextHighlighter } from '@falcon/text-highlighter'

import { TextBody } from '@spacedock/falcon-ui'

const CLARIFYING_ICONS = {
  domain: 'house-outline',
  team: 'account-multiple-outline',
  project: 'cog',
  user: 'account',
  robot_user: 'robot',
  teamLeader: 'account-star',
  primaryTeam: 'account-check',
  robot_primaryTeam: 'robot',
  both: 'account-star-check',
  robot_both: 'robot',
} as const

const variants = cva(
  'white-space-nowrap mx-0 flex flex-row gap-2 truncate pb-1 pt-2  ',
  {
    variants: {
      size: {
        md: 'mx-1 min-w-14 pb-1 pt-2 ',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type IconProps = ComponentProps<typeof Icon>

interface RowLabelBaseProps
  extends
    PropsWithChildren,
    VariantProps<typeof variants>,
    Pick<IconProps, 'icon'>,
    Pick<ComponentProps<typeof TextHighlighter>, 'secondaryMatches'> {
  title: string
  searchTerm?: string
  hideIcon?: boolean
}

const RowLabelBase = ({
  icon,
  secondaryMatches,
  size,
  title,
  searchTerm,
  ...props
}: RowLabelBaseProps) => {
  return (
    <div className={mergeClasses(variants({ size }))} translate="no" {...props}>
      {props.hideIcon ? <span className="h-5 w-5" /> : <Icon icon={icon} />}
      <TextBody span>
        <TextHighlighter
          text={title}
          searchTerm={searchTerm}
          secondaryMatches={secondaryMatches}
        />
      </TextBody>
    </div>
  )
}
RowLabelBase.displayName = 'RowLabel'

export interface RowLabelProps extends Omit<RowLabelBaseProps, 'icon'> {
  searchTerm?: string
  subType?: 'robot'
  type:
    | 'domain'
    | 'team'
    | 'project'
    | 'user'
    | 'teamLeader'
    | 'primaryTeam'
    | 'both'
}

const TreeRowLabel = ({
  type,
  subType,
  title,
  searchTerm,
  secondaryMatches,
  hideIcon,
  size,
}: RowLabelProps) => (
  <RowLabelBase
    icon={iconForType(type, subType)}
    title={title}
    searchTerm={searchTerm}
    secondaryMatches={secondaryMatches}
    hideIcon={hideIcon}
    size={size}
  />
)

function iconForType(
  type: RowLabelProps['type'],
  subType?: RowLabelProps['subType'],
) {
  if (subType === 'robot') {
    switch (type) {
      case 'user':
        return CLARIFYING_ICONS.robot_user
      case 'primaryTeam':
        return CLARIFYING_ICONS.robot_primaryTeam
      case 'both':
        return CLARIFYING_ICONS.robot_both
      default:
        break
    }
  }

  return CLARIFYING_ICONS[type as keyof typeof CLARIFYING_ICONS] || ''
}

export { TreeRowLabel }
