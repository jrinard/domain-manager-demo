import { Button, ButtonVariants } from '@falcon/buttons'
import { ApprovedIcon, Icon } from '@falcon/icons'
import { cva, mergeClasses } from '@falcon/style'
import { noop } from 'lodash'
import React, { ReactElement, useMemo } from 'react'
import type { VariantProps } from 'class-variance-authority'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  TextBody,
} from '../../index'

type ItemType = ReactElement | string

export type ComboBoxItem = {
  value: string
  item: ItemType
  id?: number
  properties?: Record<string, unknown>
}

export interface ComboBoxGroup {
  heading?: string
  items: ComboBoxItem[]
  /** Applied to CommandGroup; use `cmdk-group-heading:*` to style the heading row. */
  groupClassName?: string
}

/** One selectable row (`ComboBoxItem`) or a titled block of rows (`ComboBoxGroup`). */
export type ComboBoxItemOrGroup = ComboBoxItem | ComboBoxGroup

/**
 * `ComboBoxItem`: single option (`value` + label in `item`).
 * `ComboBoxGroup`: section object with `items[]` and optional `heading` — not one selectable row.
 */
export function isComboBoxGroup(
  itemOrGroup: ComboBoxItemOrGroup,
): itemOrGroup is ComboBoxGroup {
  if (itemOrGroup == null || typeof itemOrGroup !== 'object') return false
  const row = itemOrGroup as Record<string, unknown>
  const isLeaf =
    'value' in row && typeof row.value === 'string' && 'item' in row
  if (isLeaf) return false
  return Array.isArray(row.items)
}

/**
 * Turns `items` into a list of sections for the menu: each {@link ComboBoxGroup} is one section;
 * consecutive {@link ComboBoxItem}s become one section with no heading (typical flat list).
 */
export function convertComboBoxItemsToGroups(
  items: ComboBoxItemOrGroup[],
): ComboBoxGroup[] {
  type Acc = { sections: ComboBoxGroup[]; pendingSingles: ComboBoxItem[] }

  const { sections, pendingSingles } = items.reduce<Acc>(
    (acc, entry) => {
      if (isComboBoxGroup(entry)) {
        // Single options since the last section → one block with no title, then this titled block.
        const afterSingles =
          acc.pendingSingles.length > 0
            ? [...acc.sections, { items: [...acc.pendingSingles] }]
            : acc.sections
        const afterTitledSection =
          entry.items.length > 0
            ? [
                ...afterSingles,
                {
                  heading: entry.heading,
                  groupClassName: entry.groupClassName,
                  items: entry.items,
                },
              ]
            : afterSingles
        return { sections: afterTitledSection, pendingSingles: [] }
      }
      return {
        sections: acc.sections,
        pendingSingles: [...acc.pendingSingles, entry],
      }
    },
    { sections: [], pendingSingles: [] },
  )

  const out =
    pendingSingles.length > 0
      ? [...sections, { items: [...pendingSingles] }]
      : sections

  return out.filter((g) => g.items.length > 0)
}

const triggerButtonVariants = cva(
  'mx-0 flex flex-row items-center disabled:cursor-not-allowed',
  {
    variants: {
      border: {
        true: 'border-border',
        false: 'border-transparent',
      },
      fill: {
        true: 'bg-muted rounded-xl',
        false: '',
      },
    },
    defaultVariants: {
      border: true,
      fill: false,
    },
  },
)

export interface ComboBoxProps extends VariantProps<
  typeof triggerButtonVariants
> {
  triggerClassName?: string
  triggerIcon?: ApprovedIcon
  selectPlaceholder?: string
  includeSearch?: boolean
  searchPlaceholder?: string
  searchNoResultsText?: string
  triggerSize?: VariantProps<typeof ButtonVariants>['size']
  /**
   * Mix of single options and/or `{ heading?, items }` blocks. A plain list of options is still
   * one untitled section in the menu.
   */
  items: ComboBoxItemOrGroup[]
  /** Divider between sections when there is more than one. */
  separateItemGroups?: boolean
  onChange?: (value: string, item?: ComboBoxItem) => void
  onBlur?: () => void
  value?: string | number
  disabled?: boolean
  id?: string
  name?: string
  isLoadingItems?: boolean
}

const ComboBox = ({
  border,
  fill,
  triggerSize,
  isLoadingItems,
  ...props
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false)

  const sections = useMemo(
    () => convertComboBoxItemsToGroups(props.items),
    [props.items],
  )

  const flatItems = useMemo(
    () => sections.flatMap((section) => section.items),
    [sections],
  )

  const selectedItem = useMemo((): ComboBoxItem | undefined => {
    if (!props.value || !flatItems.length) return

    return flatItems.find((item) => item.value === `${props.value}`)
  }, [flatItems, props.value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        disabled={props.disabled}
        id={props.id || props.name}
      >
        <Button
          className={mergeClasses(
            triggerButtonVariants({
              border,
              fill,
            }),
            props.triggerClassName,
          )}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size={triggerSize}
          disabled={props.disabled}
          id={props.id}
          name={props.name}
        >
          <span className="max-w-full grow truncate text-left">
            {selectedItem?.item ?? props.selectPlaceholder ?? 'Select...'}
          </span>
          <span className="basis-3">
            <Icon icon={props.triggerIcon || 'chevron-down'} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-32 p-0"
        hideHeader
        onInteractOutside={props.onBlur || noop}
      >
        <Command className="w-full">
          {props.includeSearch && !isLoadingItems && (
            <>
              <CommandInput
                placeholder={
                  props.searchPlaceholder
                    ? props.searchPlaceholder
                    : 'Search...'
                }
              />
              <CommandEmpty>
                <TextBody>
                  {props.searchNoResultsText
                    ? props.searchNoResultsText
                    : 'No Results'}
                </TextBody>
              </CommandEmpty>
            </>
          )}
          <div className="max-h-96 w-full overflow-y-auto">
            {isLoadingItems && (
              <CommandGroup>
                <CommandItem className="w-full" disabled>
                  Loading...
                </CommandItem>
              </CommandGroup>
            )}
            {!isLoadingItems &&
              sections.map((section, sectionIndex) => (
                <React.Fragment
                  key={`${section.heading ?? 'section'}-${sectionIndex}`}
                >
                  {sectionIndex > 0 && props.separateItemGroups ? (
                    <CommandSeparator className="my-2" />
                  ) : null}
                  <CommandGroup
                    heading={section.heading}
                    className={section.groupClassName}
                  >
                    {section.items.map((item, index) => (
                      <CommandItem
                        className={mergeClasses(
                          'hover:bg-accent aria-selected:bg-accent w-full',
                          item.value === `${props.value}`
                            ? 'text-primary aria-selected:text-primary'
                            : '',
                        )}
                        key={`${section.heading ?? 's'}-${item.value}-${index}`}
                        onSelect={() => {
                          if (props.onChange) props.onChange(item.value, item)
                          setOpen(false)
                        }}
                      >
                        {item.item}
                        {item?.id ? ` -  ${item?.id}` : ''}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </React.Fragment>
              ))}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
ComboBox.displayName = 'ComboBox'

export { ComboBox }
