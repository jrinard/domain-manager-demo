import { Icon } from '@falcon/icons'
import { Dialog } from '@spacedock/falcon-ui'
import React, { ReactNode } from 'react'
import { User } from '../../data/user'

export type RemoveUserConfirmDialogProps = {
  title: string
  confirmingRemoveOf: User | undefined
  onConfirm: (user: User | undefined) => void
  messageBuilder?: (user: User | undefined) => ReactNode | undefined
}

const RemoveUserConfirmDialog = ({
  title,
  confirmingRemoveOf,
  onConfirm,
  messageBuilder,
}: RemoveUserConfirmDialogProps) => {
  return (
    <Dialog
      title={title}
      open={confirmingRemoveOf !== undefined}
      onOpenChange={(value) => onConfirm(undefined)}
      destructiveLabel="Confirm"
      action={{
        onClick: () => {
          if (confirmingRemoveOf) {
            onConfirm(confirmingRemoveOf)
          }
        },
      }}
    >
      <div className="flex items-center gap-2.5 py-1">
        <Icon icon="alert-outline" size="4xl" color="warn" />
        {messageBuilder && messageBuilder(confirmingRemoveOf)}
        {(!messageBuilder || !messageBuilder?.(confirmingRemoveOf)) && (
          <span>
            Are you sure you want to remove{' '}
            {confirmingRemoveOf ? confirmingRemoveOf.displayName : 'No user'}?
          </span>
        )}
      </div>
    </Dialog>
  )
}
RemoveUserConfirmDialog.displayName = 'RemoveUserConfirmDialog'

export { RemoveUserConfirmDialog }
