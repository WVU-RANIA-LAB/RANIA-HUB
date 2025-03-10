import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/ui-utils/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchUsersPages } from '@/app/lib/data/admin-data';
import Search from '@/app/ui/ui-utils/search';
import AdminAdminsTable from '@/app/ui/admin-ui/admin-admins-table';
import Pagination from '@/app/ui/ui-utils/pagination';
import { CreateUserButton } from '@/app/ui/admin-ui/admin-actions-btns';

export const metadata: Metadata = {
  title: 'Admins',
};

type PageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const session = await auth();
  const admin = await fetchUserByEmail(session!.user!.email!);
  const totalPages = await fetchUsersPages('ADMIN', query);

  return (
    <main className="flex grow flex-col bg-wvu-off-white px-10 py-10 sm:px-15 sm:py-18">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-5xl text-wvu-primary-blue font-bold">
          Admins
        </h1>
        <div>
          <div className="mb-2">
            <CreateUserButton roleType="ADMIN" />
          </div>
          <Search placeholder="Search admins..." />
        </div>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<span className="loading loading-spinner mx-auto my-16" />}
      >
        <AdminAdminsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-8 self-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
