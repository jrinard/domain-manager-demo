import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'
import { ExampleRowModel } from '../../tdm'

import { Table } from './Table'

import * as stories from './Table.stories'
const { IsLoadingPopulated, PaginationBuilder, RowIsSelectable } =
  composeStories(stories)

const SAMPLE_DATA: ExampleRowModel[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'dasfas@example.com',
  },
  {
    id: '124ls90s',
    amount: 131,
    status: 'success',
    email: 'wagtgs@example.com',
  },
  {
    id: '832pz02r',
    amount: 22,
    status: 'failed',
    email: 'gasfrw@example.com',
  },
  {
    id: '501wm52p',
    amount: 78,
    status: 'processing',
    email: 'psadfeua@example.com',
  },
]
describe('Table', () => {
  it('renders data when populated and not loading', () => {
    const { baseElement } = render(
      <Table<ExampleRowModel, string | number>
        columns={[
          {
            accessorKey: 'status',
            header: 'Status',
          },
          {
            accessorKey: 'email',
            header: 'Email',
          },
          {
            accessorKey: 'amount',
            header: 'Amount',
          },
        ]}
        data={SAMPLE_DATA}
      />,
    )
    expect(baseElement).toBeTruthy()
    expect(screen.queryByText('dasfas@example.com')).toBeInTheDocument()
  })
  it(IsLoadingPopulated.parameters.docs.description.story, () => {
    render(<IsLoadingPopulated {...IsLoadingPopulated.args} />)
    expect(screen.queryByText('dasfas@example.com')).not.toBeInTheDocument()
  })

  it('RowIsSelectable', () => {
    render(<RowIsSelectable {...RowIsSelectable.args} />)
    expect(screen.queryByTestId('728ed52f-checkbox')).not.toBeInTheDocument()
  })

  it(PaginationBuilder.parameters.docs.description.story, () => {
    const { baseElement } = render(
      <PaginationBuilder {...PaginationBuilder.args} />,
    )
    expect(baseElement).toBeTruthy()

    const selectElement = screen.getByText('Rows Per Page')
    expect(selectElement).toBeInTheDocument()

    const nextPageButton = screen.getByLabelText('chevron-right')
    expect(nextPageButton).toBeInTheDocument()
  })
})
