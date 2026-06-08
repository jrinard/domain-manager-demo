import { expect, describe, it } from 'vitest'
import { ExampleRowModel, FalconTableTDM } from '../../tdm'
import { mapColumnToVisibility } from './mapColumnToVisibility'

describe('mapColumnToVisibility', () => {
  it('defaults to true', () => {
    expect(
      mapColumnToVisibility<ExampleRowModel>(FalconTableTDM.createColumns()),
    ).toEqual({
      status: true,
      email: true,
      amount: true,
    })
  })
  it('allows for setting to false', () => {
    expect(
      mapColumnToVisibility<ExampleRowModel>([
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
      ]),
    ).toEqual({
      status: false,
      email: true,
      amount: true,
    })
  })
})
