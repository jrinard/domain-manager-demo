import { Button, ButtonVariants } from '@falcon/buttons'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React from 'react'

import { Link } from '@spacedock/navigator'
import { Label } from '../label/Label'

const variants = cva('', {
  variants: {
    style: {
      bordered: 'border-bg-contrast-high border-b',
    },
  },
  defaultVariants: {
    style: 'bordered',
  },
})

interface TabProps {
  label: string
  id: string | number
  to?: string
  disabled?: boolean
  app?: string
  isRobotAccount?: boolean
}

export interface TabsProps extends VariantProps<typeof variants> {
  items: TabProps[]
  onSelect?: (id: string | number) => void
  selected?: string | number
  ariaLabelBy: string
  className?: string
}

const Tabs = ({
  items,
  ariaLabelBy,
  style,
  onSelect,
  selected,
  className,
}: TabsProps) => {
  return (
    <nav
      className={mergeClasses(variants({ style }), className)}
      aria-labelledby={ariaLabelBy}
    >
      <ul className="-mb-px flex w-full overflow-x-auto">
        {items.map((item) => {
          return (
            <li key={'tab-' + item.id}>
              {item.to && !item.disabled ? (
                <Link
                  app={item.app}
                  to={item.to}
                  className={mergeClasses(
                    ButtonVariants({ variant: 'ghost-primary' }),
                    'rounded-b-none',
                    selected === item.id
                      ? 'border-active border-b-2'
                      : 'border-b-2 border-transparent',
                  )}
                >
                  <Label textType="navigation" className="cursor-pointer">
                    {item.label}
                  </Label>
                </Link>
              ) : (
                <Button
                  variant="ghost-primary"
                  className={mergeClasses(
                    'rounded-b-none',
                    selected === item.id
                      ? 'border-primary border-b-2'
                      : 'border-b-2 border-transparent',
                    item.disabled && 'bg-transparent',
                  )}
                  onClick={() => {
                    onSelect && onSelect(item.id)
                  }}
                  disabled={item.disabled}
                  aria-disabled={item.disabled}
                >
                  <Label
                    textType="navigation"
                    className="cursor-pointer text-inherit"
                  >
                    {item.label}
                  </Label>
                </Button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
Tabs.displayName = 'Tabs'

export { Tabs }
