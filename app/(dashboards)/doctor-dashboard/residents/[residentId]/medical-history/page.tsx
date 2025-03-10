import { Suspense } from 'react';

import { auth } from '@/auth';
import { lusitana } from '@/app/ui/ui-utils/fonts';
import { fetchUserByEmail, fetchUserById } from '@/app/lib/data/data';
import { fetchMedicalHistoryPages } from '@/app/lib/data/doctor-data';
import { CreateMedicalHistoryButton } from '@/app/ui/doctor-ui/medical-history-btns';
import Search from '@/app/ui/ui-utils/search';
import MedicalHistoryTable from '@/app/ui/doctor-ui/medical-history-table';
import Pagination from '@/app/ui/ui-utils/pagination';

type PageProps = {
  params: { residentId: string };
  searchParams?: { query?: string; page?: string };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { residentId } = params;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const session = await auth();
  const [doctor, resident, totalPages] = await Promise.all([
    fetchUserByEmail(session!.user!.email!),
    fetchUserById(residentId),
    fetchMedicalHistoryPages(residentId, query),
  ]);

  return (
    <main className="flex grow flex-col bg-white px-2 py-8 sm:px-10 sm:py-20">
      <div className="mb-4 flex justify-between">
        <h1 className={`${lusitana.className} text-3xl antialiased`}>
          {resident.name}&apos;s Medical History
        </h1>
        <CreateMedicalHistoryButton
          doctorId={doctor.id}
          residentId={residentId}
        />
      </div>
      <Search placeholder="Search medical history..." />
      <Suspense
        key={query + currentPage}
        fallback={<span className="loading loading-spinner mx-auto my-16" />}
      >
        <MedicalHistoryTable
          doctorId={doctor.id}
          residentId={residentId}
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
