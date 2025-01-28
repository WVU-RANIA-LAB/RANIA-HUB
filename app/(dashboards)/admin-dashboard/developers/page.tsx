import { Metadata } from 'next';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchUsersPages, fetchDeveloperGroups, fetchProjectByGroup } from '@/app/lib/data/admin-data';
import Search from '@/app/ui/search';
import AdminDevelopersTable from '@/app/ui/admin-dashboard/admin-developers-table';
import AdminDeveloperGroupsTable from '@/app/ui/admin-dashboard/admin-developer-groups-table';
import Pagination from '@/app/ui/pagination';
import { CreateUserButton, CreateDeveloperGroupButton } from '@/app/ui/admin-dashboard/admin-actions-btns';

export const metadata: Metadata = {
  title: 'Developers',
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

  // Fetch projects for each developer group
  const developerGroupsWithProjects = await Promise.all(
    developerGroups.map(async (group) => {
      const projects = await fetchProjectByGroup(group.id);
      return { ...group, projects };
    })
  );

  return (
    <main className="flex grow flex-col bg-wvu-off-white px-10 py-10 sm:px-15 sm:py-18 lg:flex-row gap-10">
      <div className="w-full lg:w-3/5 bg-white shadow-md rounded-lg p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-wvu-primary-blue">
            Developers
          </h1>
          <Search placeholder="Search developers..." />


            <div className="mb-2 flex ">
              <CreateUserButton roleType="DEVELOPER" developerGroups={developerGroups} />
            </div>
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<span className="loading loading-spinner mx-auto my-16" />}
        >
          <AdminDevelopersTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-8 self-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>

      {/* Right Column: Developer Groups */}
      <div className="w-full lg:w-2/5 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-wvu-primary-blue">Developer Groups</h2>
          <CreateDeveloperGroupButton />
        </div>
        <AdminDeveloperGroupsTable/>
        {/* <ul className="divide-y divide-gray-200">
          {developerGroupsWithProjects.map((group) => (
            <li key={group.id} className="py-2">
              <p className="font-medium text-gray-900">
                {group.semester} {group.year} {group.course} Group {group.group_number} - {group.projects.map((project) => project.name).join(', ')}
              </p>

            </li>
          ))}
        </ul> */}
      </div>
    </main>
  );
}
