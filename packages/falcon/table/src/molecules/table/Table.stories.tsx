import { omit } from 'lodash'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IconButton, TextBody } from '@spacedock/falcon-ui'
import { ExampleRowModel, FalconTableTDM } from '../../tdm'
import { Table } from './Table'
import { screen } from 'storybook/test'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Table<ExampleRowModel>> = {
  title: 'DL: Falcon/Molecules/Table',
  component: Table<ExampleRowModel>,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
}

export default meta
type Story = StoryObj<typeof Table<ExampleRowModel>>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic Table',
      },
    },
  },
  render: ({ ...props }) => (
    <Table<ExampleRowModel>
      columns={FalconTableTDM.createColumns()}
      data={FalconTableTDM.createRows()}
    />
  ),
}

export const WithSorting: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Table that allows sorting based on one column',
      },
    },
  },
  render: ({ ...props }) => (
    <Table<ExampleRowModel>
      columns={[
        {
          accessorKey: 'status',
          header: 'Status',
        },
        {
          accessorKey: 'email',
          header: ({ column }) => {
            return (
              <div className="flex gap-2">
                <div className="font-heading ">Email</div>
                <IconButton
                  icon="sort"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                  }
                />
              </div>
            )
          },
        },
        {
          accessorKey: 'amount',
          header: 'Amount',
        },
      ]}
      data={FalconTableTDM.createRows()}
    />
  ),
}

export const WithSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table that allows rows to be selected',
      },
    },
  },
  render: ({ onRowSelect, ...props }) => (
    <Table<ExampleRowModel>
      columns={FalconTableTDM.createColumns()}
      data={FalconTableTDM.createRows()}
      onRowSelect={onRowSelect}
      {...omit(props, 'data', 'columns')}
    />
  ),
}

export const IsLoadingEmpty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Is loading with data empty',
      },
    },
  },
  render: ({ onRowSelect, ...props }) => (
    <Table<ExampleRowModel>
      isLoading
      columns={FalconTableTDM.createColumns()}
      data={[]}
      onRowSelect={onRowSelect}
      {...omit(props, 'data', 'columns')}
    />
  ),
}

export const IsLoadingPopulated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Is loading with data populated',
      },
    },
  },
  render: ({ ...props }) => (
    <Table<ExampleRowModel>
      isLoading
      columns={FalconTableTDM.createColumns()}
      data={FalconTableTDM.createRows()}
      {...omit(props, 'data', 'columns')}
    />
  ),
}

export const RowIsSelectable: Story = {
  argTypes: { onRowSelect: { action: 'onRowSelect' } },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: 'Ability to control whether or not a specific row is selectable',
      },
    },
  },
  render: ({ ...props }) => (
    <Table<ExampleRowModel>
      {...props}
      columns={FalconTableTDM.createColumns()}
      onRowSelect={(...args) => {
        action('onRowSelect')(args)
      }}
      rowIsSelectable={(row) => {
        return row.status !== 'processing'
      }}
      data={FalconTableTDM.createRows()}
    />
  ),
}

export const MaxSelectableRows: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Prevent more than this number of rows to be selected',
      },
    },
  },
  render: ({ ...props }) => {
    const rows = FalconTableTDM.createRows()
    return (
      <Table<ExampleRowModel>
        {...props}
        onRowSelect={(...args) => {
          action('onRowSelect')(args)
        }}
        columns={FalconTableTDM.createColumns()}
        maxSelectableRows={2}
        selectedRows={{ [rows[0].id]: true, [rows[1].id]: true }}
        data={rows}
      />
    )
  },
}

export const PaginationBuilder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Is loading with data populated',
      },
    },
  },
  render: ({ onRowSelect, ...props }) => (
    <Table<ExampleRowModel>
      {...omit(props, 'data', 'columns')}
      paginationBuilder={(paginationModel, paginationMethods) => {
        const startRange =
          paginationModel.pageIndex * paginationModel.pageSize + 1
        const endRange = Math.min(
          (paginationModel.pageIndex + 1) * paginationModel.pageSize,
          FalconTableTDM.createRows().length,
        )
        return (
          <div className="flex items-center justify-end gap-2 space-x-4 text-xs">
            <span className="text-sm text-red-500">
              Note: Pagination styles do not match live exactly
            </span>

            <span className="mr-2"> Rows Per Page</span>
            <div className="mr-2 max-w-xs rounded-lg border border-gray-700 bg-transparent px-4 py-2">
              <select
                className="w-48 max-w-xs bg-transparent text-white outline-none"
                value={paginationModel.pageSize}
                onChange={(e) => {
                  paginationMethods.setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-xs">
              {startRange}-{endRange} of {FalconTableTDM.createRows().length}
            </span>
            <button
              className="mr-2 rounded p-1"
              onClick={() => {
                paginationMethods.setPageIndex(0)
              }}
            >
              {'|<'}
            </button>
            <button
              className="mr-2 rounded p-1"
              onClick={() => {
                paginationMethods.previousPage()
              }}
            >
              {'<'}
            </button>
            <button
              aria-label="chevron-right"
              className="mr-2 rounded p-1"
              onClick={() => {
                paginationMethods.nextPage()
              }}
            >
              {'>'}
            </button>
            <button
              className="mr-2 rounded p-1"
              onClick={() =>
                paginationMethods.setPageIndex(
                  paginationMethods.getPageCount() - 1,
                )
              }
            >
              {'>|'}
            </button>
          </div>
        )
      }}
      columns={FalconTableTDM.createColumns()}
      data={FalconTableTDM.createRows()}
    />
  ),
  play: async ({ userEvent }) => {
    await userEvent.click(screen.getByLabelText('chevron-right'))
  },
}

export const PassingClassName: Story = {
  argTypes: { onRowSelect: { action: 'onRowSelect' } },
  parameters: {
    docs: {
      description: {
        story:
          '`classname` can be passed down. This example is passing a set height of 20 and padding of 14',
      },
    },
  },
  render: ({ ...props }) => {
    const rows = FalconTableTDM.createRows()
    return (
      <Table<ExampleRowModel>
        {...props}
        columns={FalconTableTDM.createColumns()}
        className="h-20 p-14"
        data={rows}
        paginationBuilder={() => {
          return <TextBody>Pagination Here</TextBody>
        }}
      />
    )
  },
}

export const HeaderProps: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When you need to change the style of the header or other properties of the header',
      },
    },
  },
  render: ({ ...props }) => {
    const rows = FalconTableTDM.createRows()
    return (
      <Table<ExampleRowModel>
        {...props}
        columns={FalconTableTDM.createColumns()}
        data={rows}
        headerProps={{
          className: 'bg-transparent border-b border-neutral-400',
        }}
      />
    )
  },
}

export const CellProps: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When you need to change the style of the cells or other properties of the cells',
      },
    },
  },
  render: ({ ...props }) => {
    const rows = FalconTableTDM.createRows()
    return (
      <Table<ExampleRowModel>
        {...props}
        columns={FalconTableTDM.createColumns()}
        data={rows}
        cellProps={{
          border: 'transparent',
        }}
      />
    )
  },
}

export const SetWithOfColumns: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When you need to change the style of the cells or other properties of the cells',
      },
    },
  },
  render: ({ ...props }) => {
    const rows = FalconTableTDM.createRows()
    return (
      <Table<ExampleRowModel>
        {...props}
        columns={[
          {
            accessorKey: 'id',
            header: 'ID',
            headerClassName: 'w-8 truncate',
          },
          ...FalconTableTDM.createColumns(),
        ]}
        data={rows}
        cellProps={{
          border: 'transparent',
        }}
      />
    )
  },
}

export const CustomEmptyMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Customize the empty message',
      },
    },
  },
  render: ({ ...props }) => {
    return (
      <Table<ExampleRowModel>
        {...props}
        emptyMessage="You do not have access or the filter is invalid"
        columns={FalconTableTDM.createColumns()}
        data={[]}
      />
    )
  },
}

export const DefaultVisibility: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set the default visibility of a given column',
      },
    },
  },
  render: ({ ...props }) => {
    return (
      <Table<ExampleRowModel>
        {...props}
        emptyMessage="You do not have access or the filter is invalid"
        columns={[
          {
            defaultVisibility: false,
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
        data={[]}
      />
    )
  },
}
