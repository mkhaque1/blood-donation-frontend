'use client';

import { Suspense } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/data-table';
import { RoleFilter } from '@/components/dashboard/role-filter';
import { Pagination } from '@/components/dashboard/pagination';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';
import {
  useAdminUsers,
  useUpdateUserStatus,
  type AdminUser,
} from '@/hooks/use-admin';
import { useUrlFilters } from '@/hooks/use-url-filters';
import { ApiError } from '@/lib/api-types';

function ManageUsersContent() {
  const { getFilter } = useUrlFilters();
  const role = getFilter('role');
  const page = Number(getFilter('page') ?? 1);

  const { data, isLoading } = useAdminUsers({ role, page, limit: 15 });
  const updateStatus = useUpdateUserStatus();

  const handleToggleStatus = (user: AdminUser) => {
    updateStatus.mutate(
      { id: user.id, isActive: !user.isActive },
      {
        onSuccess: () =>
          toast.success(
            user.isActive
              ? `${user.email} deactivated`
              : `${user.email} reactivated`,
          ),
        onError: (err) => {
          const message =
            err instanceof ApiError ? err.message : "Couldn't update user";
          toast.error(message);
        },
      },
    );
  };

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 overflow-x-hidden'>
      <h1 className='font-display text-2xl font-semibold'>Manage users</h1>
      <p className='mt-1 text-sm text-ink-soft'>
        Activate, deactivate, and review every account.
      </p>

      <div className='mt-6'>
        <RoleFilter />
      </div>

      <div className='mt-4'>
        {isLoading && <BoardSkeleton rows={8} />}

        {data && (
          <>
            <DataTable<AdminUser>
              rows={data.items}
              emptyLabel='No users match this filter.'
              columns={[
                { header: 'Email', accessor: (u) => u.email },
                {
                  header: 'Role',
                  accessor: (u) => (
                    <span className='font-mono text-xs border border-line-soft px-2 py-0.5'>
                      {u.role}
                    </span>
                  ),
                },
                {
                  header: 'Status',
                  accessor: (u) => (
                    <span
                      className={u.isActive ? 'text-pulse-teal' : 'text-blood'}
                    >
                      {u.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  ),
                },
                {
                  header: 'Joined',
                  accessor: (u) => new Date(u.createdAt).toLocaleDateString(),
                },
                {
                  header: '',
                  accessor: (u) => (
                    <Button
                      size='sm'
                      variant={u.isActive ? 'outline' : 'default'}
                      onClick={() => handleToggleStatus(u)}
                      disabled={updateStatus.isPending}
                    >
                      {u.isActive ? 'Deactivate' : 'Reactivate'}
                    </Button>
                  ),
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

export default function ManageUsersPage() {
  return (
    <Suspense fallback={<BoardSkeleton rows={8} />}>
      <ManageUsersContent />
    </Suspense>
  );
}
