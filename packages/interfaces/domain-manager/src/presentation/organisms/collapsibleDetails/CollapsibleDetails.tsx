'use client'

import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  TextBody,
} from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'

const WIDTH_CLASS = {
  full: 'w-full',
  '3/4': 'w-full sm:w-3/4',
  '1/2': 'w-full sm:w-1/2',
} as const

export type CollapsibleDetailsWidth = keyof typeof WIDTH_CLASS

export interface CollapsibleDetailsProps {
  /** Label shown on the left when collapsed; also used as the toggle header. */
  label: string
  /** Description shown to the right of the label when collapsed. */
  description?: string
  /** Whether the section is expanded by default. */
  defaultOpen?: boolean
  /** Width of the section: full, 3/4, or 1/2 of container. */
  width?: CollapsibleDetailsWidth
  children: React.ReactNode
  /** Optional class name for the root element. */
  className?: string
}

export const CollapsibleDetails = ({
  label,
  description,
  defaultOpen = false,
  width = 'full',
  children,
  className = '',
}: CollapsibleDetailsProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const widthClass = WIDTH_CLASS[width]

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={`inline-flex flex-col ${widthClass} ${className}`.trim()}
    >
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 text-left transition-colors duration-200 hover:opacity-80"
          aria-expanded={open}
        >
          <TextBody span className="shrink-0 font-medium opacity-70">
            {label}
          </TextBody>
          {description ? (
            <TextBody span className="min-w-0 truncate text-sm opacity-50">
              {description}
            </TextBody>
          ) : null}
          <span
            className={`inline-flex shrink-0 transition-transform duration-200 ease-out ${
              open ? 'rotate-0' : '-rotate-90'
            }`}
            aria-hidden
          >
            <Icon icon="chevron-down" size="2xl" color="current" aria-hidden />
          </span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="state-closed:animate-accordion-up state-open:animate-accordion-down overflow-hidden">
        <div className="flex flex-col gap-4 py-2 sm:flex-row sm:gap-6">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
