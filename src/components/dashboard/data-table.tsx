import type { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyLabel = 'No results',
}: {
  columns: Column<T>[];
  rows: T[];
  emptyLabel?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className='border border-line-soft px-6 py-16 text-center text-sm text-ink-soft'>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className='border border-line-soft overflow-x-auto'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-line-soft bg-paper-raised'>
            {columns.map((col) => (
              <th
                key={col.header}
                className='text-left font-mono text-xs text-line px-4 py-3 whitespace-nowrap'
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-line-soft'>
          {rows.map((row) => (
            <tr key={row.id} className='hover:bg-paper-raised/60'>
              {columns.map((col) => (
                <td
                  key={col.header}
                  className={`px-4 py-3.5 whitespace-nowrap ${col.className ?? ''}`}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
