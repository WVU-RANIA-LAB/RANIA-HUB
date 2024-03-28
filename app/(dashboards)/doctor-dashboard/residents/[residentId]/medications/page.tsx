import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { fetchUserById, fetchUserByEmail } from '@/app/lib/data/data';
import { fetchMedicationsPages } from '@/app/lib/data/doctor-data';
import Search from '@/app/ui/search';
import MedicationsTable from '@/app/ui/doctor-dashboard/medications-table';
import Pagination from '@/app/ui/pagination';
import CreateMedicationForm from '@/app/ui/doctor-dashboard/create-medication-form';

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
    fetchMedicationsPages(residentId, query),
  ]);

  return (
    <main className="flex grow flex-col bg-white px-10 py-20">
      <h1 className={`${lusitana.className} mb-4 text-3xl antialiased`}>
        {resident.name}&apos;s Medications
      </h1>
      <Search placeholder="Search medications..." />
      <MedicationsTable
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
