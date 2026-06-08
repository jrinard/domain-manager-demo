/**
 * This type is used to define the shape of our data.
 * You can use a Zod schema here if you want.
 */
export type ExampleRowModel = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}
export const FalconTableTDM = {
  createRows: (): ExampleRowModel[] => {
    return [
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
      {
        id: '728ed52f',
        amount: 100,
        status: 'pending',
        email: 'ExtraForPagination@example.com',
      },
      {
        id: '124ls90s',
        amount: 131,
        status: 'success',
        email: 'ExtraForPagination@example.com',
      },
      {
        id: '832pz02r',
        amount: 22,
        status: 'failed',
        email: 'ExtraForPagination@example.com',
      },
      {
        id: '501wm52p',
        amount: 78,
        status: 'processing',
        email: 'ExtraForPagination@example.com',
      },
      {
        id: '728ed52f',
        amount: 100,
        status: 'pending',
        email: 'ExtraForPagination@example.com',
      },
      {
        id: '124ls90s',
        amount: 131,
        status: 'success',
        email: 'ExtraForPagination@example.com',
      },
      {
        id: '832pz02r',
        amount: 22,
        status: 'failed',
        email: 'Page2-ExtraForPagination@example.com',
      },
      {
        id: '501wm52p',
        amount: 78,
        status: 'processing',
        email: 'Page2-ExtraForPagination@example.com',
      },
    ]
  },
  createColumns: () => {
    return [
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
    ]
  },
}
