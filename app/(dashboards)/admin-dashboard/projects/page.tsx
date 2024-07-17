import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchUsersPages, fetchDeveloperGroups } from '@/app/lib/data/admin-data';
import Search from '@/app/ui/search';
import AdminProjectsTable from '@/app/ui/admin-dashboard/admin-projects-table';
import Pagination from '@/app/ui/pagination';
import {CreateProjectButton } from '@/app/ui/admin-dashboard/admin-actions-btns';

export const metadata: Metadata = {
  title: 'Projects',
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
    <main className="flex grow flex-col bg-white px-2 py-8 sm:px-10 sm:py-20">
      <div className="mb-4 flex justify-end">
        <CreateProjectButton developerGroups={developerGroups}/>
      </div>
      <div className="rounded-md border border-black">
        <h1
          className={`${lusitana.className} mb-4 rounded-md bg-wvu-primary-blue p-2 text-3xl uppercase text-white antialiased`}
        >
          Projects
        </h1>
        <Search placeholder="Search Projects..." />
        <Suspense
          key={query + currentPage}
          fallback={<span className="loading loading-spinner mx-auto my-16" />}
        >
          <AdminProjectsTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-8 self-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
