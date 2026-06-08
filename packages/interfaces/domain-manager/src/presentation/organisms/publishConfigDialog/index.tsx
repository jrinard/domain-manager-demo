import { Dialog, Banner } from '@spacedock/falcon-ui'

const TAB_OPTIONS = [
  {
    label: 'Choose Existing',
    id: 'choose-existing',
  },
]

interface PublishConfigDialogProps {
  onConfirm: () => void
  open: boolean
  onOpenChange: (openStatus: boolean) => void
}

const PublishConfigDialog = (props: PublishConfigDialogProps) => {
  return (
    <Dialog
      title="Publish Configuration"
      open={props.open}
      onOpenChange={props.onOpenChange}
      maxWidth="xxl"
      maxHeight="screen"
      completeLabel="Select"
      action={{
        value: 'Confirm',
        onClick: () => {
          props.onConfirm()
          props.onOpenChange(false)
        },
      }}
    >
      <Banner
        preset="warn"
        headerText="Publish Configuration"
        bodyText=""
        bodyComponent={
          <div>
            <p className="text-primary-fg">
              Publishing this configuration will automatically disable the
              currently active Configuration File (is present).
            </p>
            <p className="text-primary-fg mt-2">
              Additionally, once this Configuration is published, it cannot be
              edited again. You will need to clone the configuration to make
              further updates.
            </p>
          </div>
        }
      />
    </Dialog>
  )
}

export { PublishConfigDialog }
