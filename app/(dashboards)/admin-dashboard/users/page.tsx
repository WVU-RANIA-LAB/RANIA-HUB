import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/ui-utils/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchUsersPages } from '@/app/lib/data/admin-data';
import Search from '@/app/ui/ui-utils/search';
import AdminResidentsTable from '@/app/ui/admin-ui/admin-residents-table';
import AdminDoctorsTable from '@/app/ui/admin-ui/admin-doctors-table';
import AdminAdminsTable from '@/app/ui/admin-ui/admin-admins-table';

import Pagination from '@/app/ui/ui-utils/pagination';
import { CreateUserButton } from '@/app/ui/admin-ui/admin-actions-btns';

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
  const admin = await fetchUserByEmail(session!.user!.email!);
  const totalPages = await fetchUsersPages('RESIDENT', query);

  return (
    <main className="flex grow flex-col bg-wvu-off-white px-10 py-10 sm:px-15 sm:py-18 lg:flex-row gap-10">
      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-wvu-primary-blue">
            Residents
          </h1>
            <Search placeholder="Search residents..." />
            <div className="mb-2 flex">
              <CreateUserButton roleType="RESIDENT" />
            </div>
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<span className="loading loading-spinner mx-auto my-16" />}
        >
          <AdminResidentsTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-8 self-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <div className="mb-6 flex justify-between items-center">

          <h1 className="text-2xl font-semibold text-wvu-primary-blue">
            Doctors
          </h1>
          <div className="mb-2 flex">
            <CreateUserButton roleType="DOCTOR" />
          </div>
        </div>
        <AdminDoctorsTable query={query} currentPage={currentPage} />
        
      </div>

      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <div className="mb-6 flex justify-between items-center">

          <h1 className="text-2xl font-semibold text-wvu-primary-blue">
            Admins
          </h1>
          <div className="mb-2 flex">
            <CreateUserButton roleType="ADMIN" />
          </div>
        </div>
        <AdminAdminsTable query={query} currentPage={currentPage} />
      </div>



    </main>
  );
}

