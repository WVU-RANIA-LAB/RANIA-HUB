import { Metadata } from 'next';
import { Suspense } from 'react';

import { lusitana } from '@/app/ui/ui-utils/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchResidentsPages } from '@/app/lib/data/doctor-data';
import Search from '@/app/ui/ui-utils/search';
import ResidentsTable from '@/app/ui/doctor-ui/residents-table';
import Pagination from '@/app/ui/ui-utils/pagination';

export const metadata: Metadata = {
  title: 'Residents',
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
  const doctor = await fetchUserByEmail(session!.user!.email!);
  const totalPages = await fetchResidentsPages(doctor.residentIds, query);

  return (
    <main className="flex grow flex-col bg-wvu-off-white px-2 py-8 sm:px-10 sm:py-20">
      <h1 className={`text-4xl text-wvu-primary-blue font-bold pb-5`}>
        Residents
      </h1>
      <Search placeholder="Search residents..." />
      <Suspense
        key={query + currentPage}
        fallback={<span className="loading loading-spinner mx-auto my-16" />}
      >
        <ResidentsTable
          residentIds={doctor.residentIds}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-8 self-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
