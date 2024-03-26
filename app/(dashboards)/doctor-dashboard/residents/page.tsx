import { Metadata } from 'next';

import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchResidentsPages } from '@/app/lib/data/doctor-data';
import Search from '@/app/ui/search';
import ResidentsTable from '@/app/ui/doctor-dashboard/residents-table';
import Pagination from '@/app/ui/pagination';

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
    <main className="flex grow flex-col bg-white px-10 py-20">
      <h1 className={`${lusitana.className} mb-4 text-3xl antialiased`}>
        Residents
      </h1>
      <Search placeholder="Search residents..." />
      <ResidentsTable
        residentIds={doctor.residentIds}
        query={query}
        currentPage={currentPage}
      />
      <div className="mt-8 self-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
