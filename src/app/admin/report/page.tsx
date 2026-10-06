'use client';

import { Suspense } from 'react';
import { DataTable } from '@/components/dashboard/data-table';
import { Pagination } from '@/components/dashboard/pagination';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';
import { useAdminAuditLogs, type AuditLogEntry } from '@/hooks/use-admin';
import { useUrlFilters } from '@/hooks/use-url-filters';

function auditActionLabel(action: string) {
  return action.replace(/_/g, ' ').toLowerCase();
}

function AuditLogsContent() {
  const { getFilter } = useUrlFilters();
  const page = Number(getFilter('page') ?? 1);
  const { data, isLoading } = useAdminAuditLogs({ page, limit: 20 });

  return (
    <div className='px-6 py-8 md:px-10 md:py-10'>
      <h1 className='font-display text-2xl font-semibold'>Audit logs</h1>
      <p className='mt-1 text-sm text-ink-soft'>
        Every verification, status change, and moderation action.
      </p>

      <div className='mt-6'>
        {isLoading && <BoardSkeleton rows={10} />}

        {data && (
          <>
            <DataTable<AuditLogEntry>
              rows={data.items}
              emptyLabel='No audit activity yet.'
              columns={[
                {
                  header: 'Action',
                  accessor: (log) => (
                    <span className='font-mono text-xs'>
                      {auditActionLabel(log.action)}
                    </span>
                  ),
                },
                {
                  header: 'Target',
                  accessor: (log) =>
                    `${log.targetType} · ${log.targetId.slice(0, 8)}`,
                },
                { header: 'By', accessor: (log) => log.actor.email },
                {
                  header: 'When',
                  accessor: (log) => new Date(log.createdAt).toLocaleString(),
                },
              ]}
            />
            {data.meta && (
              <div className='border-x border-b border-line-soft'>
                <Pagination
                  page={data.meta.page}
                  totalPages={data.meta.totalPages}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function AuditLogsPage() {
  return (
    <Suspense fallback={<BoardSkeleton rows={10} />}>
      <AuditLogsContent />
    </Suspense>
  );
}
