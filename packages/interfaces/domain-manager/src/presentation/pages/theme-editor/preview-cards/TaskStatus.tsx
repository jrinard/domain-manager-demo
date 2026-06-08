import { Badge, TextHeading } from '@spacedock/falcon-ui'

const TaskStatus = () => {
  return (
    <section className="border-bg-contrast-high flex h-full flex-col gap-4 rounded-md border p-4">
      <TextHeading>Task Status</TextHeading>

      <div className="mx-auto my-auto flex flex-row flex-wrap gap-2">
        <Badge variant={'status-complete'}>Complete</Badge>

        <Badge variant={'status-incomplete'}>Incomplete</Badge>

        <Badge variant={'status-overdue'}>Overdue</Badge>

        <Badge variant={'status-atrisk'}>At Risk</Badge>

        <Badge variant={'status-notapplicable'}>Not Applicable</Badge>

        <Badge variant={'status-postponed'}>Postponed</Badge>
      </div>
    </section>
  )
}

export default TaskStatus
