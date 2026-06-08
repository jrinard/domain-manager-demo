import { TextHeading } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'

const ButtonVariants = () => {
  return (
    <section className="flex h-full flex-col gap-4 p-4">
      <TextHeading>Buttons</TextHeading>

      <div className="mx-auto my-auto flex flex-row flex-wrap gap-2">
        <Button size="small" variant={'primary'}>
          Primary
        </Button>
        <Button size="small" variant={'secondary'}>
          Secondary
        </Button>
        <Button size="small" variant={'success'}>
          Success
        </Button>
        <Button size="small" variant={'warning'}>
          Warning
        </Button>
        <Button size="small" variant={'danger'}>
          Danger
        </Button>
        <Button size="small" variant={'outline'}>
          Outline
        </Button>
        <Button size="small" variant={'ghost'}>
          Ghost
        </Button>
      </div>
    </section>
  )
}

export default ButtonVariants
