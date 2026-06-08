import { saveAs } from 'file-saver'
type Row = Array<string | number>

export function sanitizeCell(item: string | number) {
  return `"${item}"`
}

export function exportToCSV(
  columnTitles: string[],
  rows: Row[],
  fileName: string,
) {
  if (!Array.isArray(rows) || !Array.isArray(rows[0])) {
    throw new Error('rows arguments must be an array of arrays.')
  }

  const header = columnTitles.map(sanitizeCell).join(',')
  const rowsStr = rows
    .reduce((rows, row) => {
      return rows.concat(row.map(sanitizeCell).join(','))
    }, [])
    .join('\r\n')

  const output = `${header}\r\n${rowsStr}`
  if (output.length) {
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8' })

    const safeFileName = /\.csv$/i.test(fileName) ? fileName : `${fileName}.csv`

    saveAs(blob, safeFileName)
  } else {
    throw new Error('Output length was zero')
  }
}

export function exportToJSON(data: unknown, fileName: string) {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })

  const safeFileName = /\.json$/i.test(fileName) ? fileName : `${fileName}.json`

  saveAs(blob, safeFileName)
}
