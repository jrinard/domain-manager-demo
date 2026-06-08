import { Button } from '@falcon/buttons'
import { TextInput } from '@falcon/inputs'
import { cva, VariantProps } from '@falcon/style'
import { noop } from 'lodash'
import React, { PropsWithChildren, ReactNode, useMemo, useState } from 'react'

import { Dialog, IconButton, Label } from '@spacedock/falcon-ui'
import { User } from '../../data/user'
import { UserList } from '../userList/UserList'
import { RemoveUserConfirmDialog } from '../removeUserConfirmDialog/RemoveUserConfirmDialog'

const variants = cva('flex flex-col', {
  variants: {},
  defaultVariants: {},
})

export interface AddRemoveUsersDialogProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  title: string
  includedLabel: string
  includedUsers: User[] | undefined
  excludedLabel: string
  excludedUsers: User[] | undefined
  open?: boolean
  onOpenChange: (open: boolean) => void
  onSearch: (value?: string | undefined) => void
  onRemove: (user: User) => void
  onAdd: (user: User) => void
  isLoadingExcluded?: boolean
  isLoadingIncluded?: boolean
  confirmMessageBuilder?: (user: User | undefined) => ReactNode
}

const AddRemoveUsersDialog = ({
  open,
  onOpenChange,
  title,
  includedUsers,
  excludedUsers,
  excludedLabel,
  includedLabel,
  isLoadingIncluded,
  isLoadingExcluded,
  onSearch,
  onRemove,
  onAdd,
  confirmMessageBuilder,
}: AddRemoveUsersDialogProps) => {
  const includedMapped = useMemo(
    () =>
      includedUsers?.map((user) => ({
        ...user,
        team: user.team || '',
      })),
    [includedUsers],
  )
  const excludedMapped = useMemo(
    () =>
      excludedUsers?.map((user) => ({
        ...user,
        team: user.team || '',
      })),
    [excludedUsers],
  )
  const [search, setSearch] = useState('')
  const [confirmingRemoveOf, setConfirmingRemoveOf] = useState<
    User | undefined
  >(undefined)

  return (
    <>
      <Dialog
        closeLabel="Done"
        title={title}
        open={open}
        onOpenChange={(value) => {
          if (!value) {
            setSearch('')
            setConfirmingRemoveOf(undefined)
          }
          onOpenChange(value)
        }}
      >
        <TextInput
          aria-label="Search username"
          trailingIcon="search"
          dense
          placeholder="Search to add user and to filter users already added"
          className="my-2"
          onInput={(event) => {
            setSearch(event.currentTarget.value)
            onSearch(event.currentTarget.value)
          }}
        />
        <Label>{includedLabel}</Label>
        <UserList
          items={includedMapped?.filter((item) =>
            item.displayName.includes(search),
          )}
          isLoading={isLoadingIncluded}
          onSelect={noop}
          trailingBuilder={(user) => (
            <IconButton
              icon="close"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setConfirmingRemoveOf(user)
              }}
            />
          )}
        />
        <hr className="border-muted my-2 h-px" />
        {excludedMapped && excludedMapped?.length > 0 && (
          <>
            <Label>{excludedLabel}</Label>
            <UserList
              isLoading={isLoadingExcluded}
              onSelect={(user) => onAdd(user)}
              items={excludedMapped?.filter(
                (user) =>
                  !includedMapped?.map((item) => item.id).includes(user.id),
              )}
              trailingBuilder={(user) => (
                <Button
                  variant="ghost"
                  size="text"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onAdd(user)
                  }}
                >
                  Add
                </Button>
              )}
            />
            <hr className="border-muted my-2 h-px" />
          </>
        )}
      </Dialog>
      <RemoveUserConfirmDialog
        title="Remove Participant"
        confirmingRemoveOf={confirmingRemoveOf}
        onConfirm={(user) => {
          if (user === undefined) {
            setConfirmingRemoveOf(undefined)
          } else {
            onRemove(user)
            setConfirmingRemoveOf(undefined)
          }
        }}
        messageBuilder={(user) => {
          return confirmMessageBuilder?.(user)
        }}
      />
    </>
  )
}
AddRemoveUsersDialog.displayName = 'AddRemoveUsersDialog'

export { AddRemoveUsersDialog }
