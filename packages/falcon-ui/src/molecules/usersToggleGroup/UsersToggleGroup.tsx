import { mergeClasses } from '@falcon/style'
import React, { useCallback, useMemo } from 'react'

import { TextBody } from '../../atoms/textBody/TextBody'
import { Avatar, type AvatarProps } from '../avatar/Avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../popover/Popover'

export type UsersToggleGroupUser = {
  id: string | number
  name: string
  imageUrl?: string
}

export interface UsersToggleGroupProps {
  /** People available to filter (stable order defines stack left → right) */
  users: UsersToggleGroupUser[]
  /** Selected user ids; empty means no filter (show all). */
  selectedIds: Array<string | number>
  onSelectedIdsChange: (nextIds: Array<string | number>) => void
  /** Max avatars in the horizontal stack before "+N" overflow (default 6). */
  maxVisible?: number
  /** Optional heading above the stack */
  label?: string
  className?: string
  avatarSize?: AvatarProps['size']
  /** Shown when there is at least one selection (clears filter). */
  clearAllLabel?: string
}

function idKey(id: string | number) {
  return String(id)
}

function orderedSelectedIds(
  users: UsersToggleGroupUser[],
  selectedSet: Set<string>,
): Array<string | number> {
  return users.filter((u) => selectedSet.has(idKey(u.id))).map((u) => u.id)
}

export function UsersToggleGroup({
  users,
  selectedIds,
  onSelectedIdsChange,
  maxVisible = 6,
  label,
  className,
  avatarSize = 'sm',
  clearAllLabel = 'Show all',
}: UsersToggleGroupProps) {
  const selected = useMemo(
    () => new Set(selectedIds.map(idKey)),
    [selectedIds],
  )

  const toggle = useCallback(
    (id: string | number) => {
      const k = idKey(id)
      const set = new Set(selectedIds.map(idKey))
      if (set.has(k)) {
        set.delete(k)
      } else {
        set.add(k)
      }
      onSelectedIdsChange(orderedSelectedIds(users, set))
    },
    [onSelectedIdsChange, selectedIds, users],
  )

  const clearAll = useCallback(() => {
    onSelectedIdsChange([])
  }, [onSelectedIdsChange])

  const visible = users.slice(0, maxVisible)
  const overflow = users.slice(maxVisible)
  const hasOverflow = overflow.length > 0

  const renderToggle = (
    user: UsersToggleGroupUser,
    index: number,
    stackClassName?: string,
  ) => {
    const isOn = selected.has(idKey(user.id))
    return (
      <button
        key={idKey(user.id)}
        type="button"
        aria-pressed={isOn}
        aria-label={
          isOn
            ? `Remove filter for ${user.name}`
            : `Filter by ${user.name}`
        }
        className={mergeClasses(
          'relative shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-site-bg',
          stackClassName,
        )}
        style={{ zIndex: visible.length - index }}
        onClick={() => toggle(user.id)}
      >
        <Avatar
          name={user.name}
          size={avatarSize}
          src={user.imageUrl?.trim() || undefined}
          stroked={false}
          className={mergeClasses(
            'box-border border-2 border-solid transition-colors duration-150',
            isOn
              ? 'border-primary'
              : 'border-bg-contrast-medium hover:border-bg-contrast-high',
          )}
        />
      </button>
    )
  }

  return (
    <div
      className={mergeClasses(
        'flex w-fit max-w-full min-w-0 flex-col gap-1.5',
        className,
      )}
    >
      {label ? (
        <div className="flex min-h-[1.125rem] flex-wrap items-center gap-x-3 gap-y-1">
          <TextBody color="muted" size="xs" weight="semibold" span>
            {label}
          </TextBody>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex items-center pl-0.5">
          {visible.map((user, index) =>
            renderToggle(
              user,
              index,
              index > 0 ? '-ml-2 hover:z-50 focus-visible:z-50' : '',
            ),
          )}

          {hasOverflow ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="relative z-[5] -ml-2 flex size-8 shrink-0 items-center justify-center rounded-full border border-bg-contrast-medium bg-bg-contrast-low text-xs font-semibold text-muted-fg transition-colors hover:border-bg-contrast-high hover:bg-bg-contrast-medium hover:text-site-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-site-bg"
                  aria-label={`${overflow.length} more people — open list`}
                >
                  +{overflow.length}
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-72 max-w-[min(100vw-2rem,20rem)] p-2"
                hideHeader
                side="bottom"
                sideOffset={6}
                variant="contrast"
              >
                <TextBody
                  className="mb-2 px-1"
                  color="muted"
                  size="2xs"
                  span
                  weight="semibold"
                >
                  More people
                </TextBody>
                <ul className="flex max-h-72 flex-col gap-0.5 overflow-y-auto pr-0.5">
                  {overflow.map((user) => {
                    const isOn = selected.has(idKey(user.id))
                    return (
                      <li key={idKey(user.id)}>
                        <button
                          type="button"
                          aria-pressed={isOn}
                          className="hover:bg-bg-contrast-low flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          onClick={() => toggle(user.id)}
                        >
                          <Avatar
                            name={user.name}
                            size="sm"
                            src={user.imageUrl?.trim() || undefined}
                            stroked={false}
                            className={mergeClasses(
                              'box-border border-2 border-solid',
                              isOn
                                ? 'border-primary'
                                : 'border-bg-contrast-medium',
                            )}
                          />
                          <TextBody
                            className="min-w-0 flex-1 truncate"
                            size="s"
                            span
                          >
                            {user.name}
                          </TextBody>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>

        {selectedIds.length > 0 ? (
          <button
            type="button"
            className="text-muted-fg hover:text-site-fg shrink-0 font-body text-2xs font-semibold uppercase tracking-wide underline-offset-2 hover:underline"
            onClick={clearAll}
          >
            {clearAllLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}

UsersToggleGroup.displayName = 'UsersToggleGroup'
