import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'reactstrap'

import RTCustomCardCell from '../../extensions/react-table/cell/RTCustomCardCell'

const CardList = ({ cards, onRemoveCard }) => {

  const columnsRef = useRef([
    {
      header: 'word',
      accessorKey: 'word',
      cell: ({ row }) => <RTCustomCardCell row={row} />,
      size: 200
    },
    {
      header: 'del',
      cell: ({ row }) => <Button onClick={() => onRemoveCard({ id: row.original.id })}>del</Button>,
      size: 10
    },
  ])

  const [data, setData] = useState([])

  const table = useReactTable({
    data,
    columns: columnsRef.current,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    setData(cards)
  }, [cards])

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} style={{ width: header.getSize() }}></th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CardList