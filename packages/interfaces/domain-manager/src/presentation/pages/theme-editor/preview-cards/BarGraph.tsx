import { TextHeading } from '@spacedock/falcon-ui'
import { ChartWrapper } from '@domain/ui'

const CHART_DATA = [
  {
    name: 'Training 1',
    completed: 10,
    inProgress: 5,
    notStarted: 12,
  },
  {
    name: 'Training 2',
    completed: 8,
    inProgress: 3,
    notStarted: 16,
  },
  {
    name: 'Training 3',
    completed: 12,
    inProgress: 7,
    notStarted: 7,
  },
  {
    name: 'Training 4',
    completed: 6,
    inProgress: 16,
    notStarted: 3,
  },
  {
    name: 'Training 5',
    completed: 4,
    inProgress: 15,
    notStarted: 7,
  },
]

const BarGraph = () => {
  return (
    <section className="flex flex-col gap-4 p-4">
      <TextHeading size={4}>Training Completed last 7 Days</TextHeading>

      <ChartWrapper
        data={CHART_DATA}
        colors={{
          completed: 'var(--chart-1)',
          inProgress: 'var(--chart-2)',
          notStarted: 'var(--chart-3)',
        }}
        yAxisKeys={['completed', 'inProgress', 'notStarted']}
        isLoading={false}
        chartType="bar"
        title="Training Completed last 7 Days"
      />
    </section>
  )
}

export default BarGraph
