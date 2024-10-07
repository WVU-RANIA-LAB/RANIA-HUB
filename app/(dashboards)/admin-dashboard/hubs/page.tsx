import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchUsersPages, fetchDeveloperGroups } from '@/app/lib/data/admin-data';
import Search from '@/app/ui/search';
import AdminHubsTable from '@/app/ui/admin-dashboard/admin-hubs-table';
import Pagination from '@/app/ui/pagination';
import {CreateHubButton } from '@/app/ui/admin-dashboard/admin-actions-btns';

export const metadata: Metadata = {
  title: 'Hubs',
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
  const totalPages = await fetchUsersPages('DEVELOPER', query);
  const developerGroups = await fetchDeveloperGroups();

  return (
  <main className="flex grow flex-col bg-wvu-off-white px-10 py-10 sm:px-15 sm:py-18">
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-5xl text-wvu-primary-blue font-bold">
        Hubs
      </h1>
      <div>
        <div className="mb-2">
          <CreateHubButton/>
        </div>
        <Search placeholder="Search hubs..." />
      </div>
    </div>
    <Suspense
      key={query + currentPage}
      fallback={<span className="loading loading-spinner mx-auto my-16" />}
    >
      <AdminHubsTable query={query} currentPage={currentPage} />
    </Suspense>
    <div className="mt-8 self-center">
      <Pagination totalPages={totalPages} />
    </div>
  </main>
  );
}