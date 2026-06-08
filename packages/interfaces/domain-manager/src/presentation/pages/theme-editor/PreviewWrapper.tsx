import * as React from 'react'

import { CardSizingWrapper, Grid } from '@spacedock/bento'
import { TextHeading } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'

import BarGraph from './preview-cards/BarGraph'
import ButtonVariants from './preview-cards/ButtonVariants'
import CalendarContent from './preview-cards/CalendarContent'
import SimpleForm from './preview-cards/SimpleForm'
import LineGraph from './preview-cards/LineGraph'
import SelectableTable from './preview-cards/SelectableTable'
import TaskStatus from './preview-cards/TaskStatus'
import LibraryItems from './preview-cards/LibraryItems'

interface Props {
  theme: 'light' | 'dark'
}

export const PreviewWrapper = ({ theme }: Props) => {
  const [viewMode, setViewMode] = React.useState<'individual' | 'holistic'>(
    'individual',
  )

  return (
    <div className="bg-site-bg text-site-fg flex h-full w-full flex-col gap-4 rounded-xl p-4">
      <div className="flex w-full items-center justify-between">
        <TextHeading size={3}>Preview</TextHeading>
        <div className="flex flex-row gap-2">
          <Button
            variant="ghost"
            size="small"
            onClick={() => setViewMode('individual')}
            className={
              viewMode === 'individual'
                ? 'bg-secondary text-secondary-fg'
                : undefined
            }
          >
            <Icon icon="widgets-outline" size="sm" />
            Components
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={() => setViewMode('holistic')}
            className={
              viewMode === 'holistic'
                ? 'bg-secondary text-secondary-fg'
                : undefined
            }
          >
            <Icon icon="eye" size="sm" />
            Layout
          </Button>
        </div>
      </div>

      {viewMode === 'individual' ? (
        <Grid columns={12} className="w-full">
          <CardSizingWrapper
            columnSpan={4}
            bgColor="transparent"
            className="border-bg-contrast-high border"
            rounded="md"
          >
            <ButtonVariants />
          </CardSizingWrapper>

          <CardSizingWrapper
            columnSpan={4}
            bgColor="transparent"
            className="border-bg-contrast-high border"
            rounded="md"
          >
            <CalendarContent />
          </CardSizingWrapper>

          <CardSizingWrapper columnSpan={4} rounded="md">
            <TaskStatus />
          </CardSizingWrapper>

          <CardSizingWrapper
            columnSpan={6}
            bgColor="transparent"
            className="border-bg-contrast-high border"
            rounded="md"
          >
            <SimpleForm />
          </CardSizingWrapper>

          <CardSizingWrapper columnSpan={6}>
            <BarGraph />
          </CardSizingWrapper>

          <CardSizingWrapper columnSpan={6}>
            <LineGraph />
          </CardSizingWrapper>

          <CardSizingWrapper
            columnSpan={6}
            bgColor="transparent"
            className="border-bg-contrast-high border"
            rounded="md"
          >
            <SelectableTable />
          </CardSizingWrapper>

          <CardSizingWrapper columnSpan={6} rounded="md">
            <LibraryItems />
          </CardSizingWrapper>
        </Grid>
      ) : (
        <div className="flex w-full flex-1">
          <div className="border-bg-contrast-high w-full rounded-md border bg-transparent">
            <div className="flex h-full w-full items-center justify-center py-12">
              <p className="text-grayscale-500 text-lg">Coming soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
