import { Table } from '@falcon/table'
import { useSimpleReducer } from '@spacedock/noonian'
import { Button } from '@falcon/buttons'
import { Avatar, TextHeading } from '@spacedock/falcon-ui'
import { SessionHandling } from '@spacedock/cargo-bay'
import { createFileURL } from '../../../../data/utils/file-path'

const PEOPLE_ROWS = [
  {
    userID: 2,
    id: 2,
    fullName: 'Oca Hoeflein',
    isTeamLeader: true,
    teamTitle: 'Fearless Leader',
  },
  {
    userID: 4201,
    id: 4201,
    fullName: 'Mike Hunter',
    isTeamLeader: true,
    teamTitle: 'Co-Founder',
  },
  {
    userID: 4792,
    id: 4792,
    fullName: 'Pete Bachman',
    isTeamLeader: false,
    teamTitle: '',
  },
  {
    userID: 1503800,
    id: 1503800,
    fullName: 'Austin Blain',
    isTeamLeader: false,
    teamTitle: '',
  },
  {
    userID: 1960713,
    id: 1960713,
    fullName: 'Joshua Rinard',
    isTeamLeader: false,
    teamTitle: '',
  },
  {
    userID: 2241441,
    id: 2241441,
    fullName: 'Tim Downing',
    isTeamLeader: false,
    teamTitle: '',
  },
  {
    userID: 2982394,
    id: 2982394,
    fullName: 'Dan Christ',
    isTeamLeader: false,
    teamTitle: '',
  },
]

const SelectableTable = () => {
  const { state, update } = useSimpleReducer({
    selectedRows: {
      2: true,
      1960713: true,
      2241441: true,
      2982394: true,
    },
  })

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <TextHeading className="mr-auto">Select Users</TextHeading>

        <Table
          className="w-full"
          columns={[
            {
              accessorKey: 'fullName',
              header: 'Name',
              cell: ({ cell, row }) => {
                return (
                  <div className="flex flex-row items-center gap-2">
                    <Avatar
                      size={'md'}
                      name={`${row.original.fullName}`}
                      src={createFileURL(
                        `/person/profilephoto?sessionKey=${SessionHandling.getActiveSessionKey()}&personID=${row.original.userID}&assetID=&encoding=ocORIGINAL&silhouette=empty`,
                      )}
                    />
                    <span>{row.original.fullName}</span>
                  </div>
                )
              },
            },
            {
              accessorKey: 'teamTitle',
              header: 'Team Title',
              cell: ({ cell }) => {
                return <div>{cell.getValue()}</div>
              },
            },
          ]}
          selectedRows={state.selectedRows}
          onRowSelect={(data, isSelected) => {
            if (data === 'ALL') {
              update({
                selectedRows: {
                  ...state.selectedRows,
                  ...PEOPLE_ROWS.reduce((acc: Record<string, boolean>, row) => {
                    acc[row.userID] = isSelected
                    return acc
                  }, {}),
                },
              })
            } else {
              update({
                selectedRows: {
                  ...state.selectedRows,
                  [data.userID]: isSelected,
                },
              })
            }
          }}
          //   onRowsSelected={(data, isSelected) => {
          //     if (data === 'ALL') {
          //       update({
          //         selectedRows: {
          //           ...state.selectedRows,
          //           ...PEOPLE_ROWS.reduce((acc: Record<string, boolean>, row) => {
          //             acc[row.userID] = isSelected
          //             return acc
          //           }, {}),
          //         },
          //       })
          //     } else {
          //       update({
          //         selectedRows: {
          //           ...state.selectedRows,
          //           [data.userID]: isSelected,
          //         },
          //       })
          //     }
          //   }}
          data={PEOPLE_ROWS}
        />

        <section className="mt-4 flex w-full flex-row justify-end gap-2">
          <Button variant={'ghost'}>Clear</Button>
          <Button variant={'primary'}>Add</Button>
        </section>
      </div>
    </section>
  )
}

export default SelectableTable
