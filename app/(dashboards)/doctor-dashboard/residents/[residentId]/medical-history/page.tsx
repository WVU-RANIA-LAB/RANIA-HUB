import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import { fetchUserByEmail, fetchUserById } from '@/app/lib/data/data';
import { fetchMedicalHistoryPages } from '@/app/lib/data/doctor-data';
import { CreateMedicalHistoryButton } from '@/app/ui/doctor-dashboard/medical-history-btns';
import Search from '@/app/ui/search';
import MedicalHistoryTable from '@/app/ui/doctor-dashboard/medical-history-table';
import Pagination from '@/app/ui/pagination';

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
    <main className="flex grow flex-col bg-white px-10 py-20">
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
      <MedicalHistoryTable
        doctorId={doctor.id}
        residentId={residentId}
        query={query}
        currentPage={currentPage}
      />
      <div className="mt-8 self-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
