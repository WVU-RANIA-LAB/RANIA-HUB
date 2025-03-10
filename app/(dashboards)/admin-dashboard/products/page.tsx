import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/ui-utils/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchUsersPages, fetchProjects } from '@/app/lib/data/admin-data';
import Search from '@/app/ui/ui-utils/search';
import AdminDevicesTable from '@/app/ui/admin-ui/admin-devices-table';
import AdminHubsTable from '@/app/ui/admin-ui/admin-hubs-table';

import Pagination from '@/app/ui/ui-utils/pagination';
import {CreateRegisteredDeviceButton } from '@/app/ui/admin-ui/admin-actions-btns';

export const metadata: Metadata = {
  title: 'Devices',
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
  //const developerGroups = await fetchDeveloperGroups();
  const projects = await fetchProjects();

  return (

  <main className="flex grow flex-col bg-wvu-off-white px-10 py-10 sm:px-15 sm:py-18 lg:flex-row gap-10">
    <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6">
        <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-wvu-primary-blue">
                Devices
            </h1>
            <Search placeholder="Search devices..." />
            <div className="mb-2">
                <CreateRegisteredDeviceButton projects={projects}/>
            </div>
        </div>
        <Suspense
            key={query + currentPage}
            fallback={<span className="loading loading-spinner mx-auto my-16" />}
            >
            <AdminDevicesTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-8 self-center">
            <Pagination totalPages={totalPages} />
        </div>

    </div>
    

    <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-wvu-primary-blue">
            Hubs
        </h1>
        <AdminHubsTable query={query} currentPage={currentPage} />
    </div>
  </main>
  );
}
