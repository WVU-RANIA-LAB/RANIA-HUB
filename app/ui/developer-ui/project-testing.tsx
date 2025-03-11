import { fetchUserByEmail } from '@/app/lib/data/data';
import { auth } from '@/auth';
import { lusitana } from '../ui-utils/fonts';
import { fetchDeveloperGroupMembers, fetchProjectByGroup } from '@/app/lib/data/developer-data';
import ProjectTestDashboard from './project-dashboard-components/ProjectTestDashboard';

export default async function ProjectTesting() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const groupMembers = await fetchDeveloperGroupMembers(session!.user!.group!);
  const projectInfo = await fetchProjectByGroup(session!.user!.group!);

  const groupNumber = session!.user!.group!


  return (
    <main className="flex grow flex-row bg-wvu-off-white px-10 py-10 sm:px-15 sm:py-18 lg:flex-row gap-10">
        {/* First Container */}
            <div className="w-full lg:w-1/1 bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between w-full h-12 pl-5 pr-5">
                <h1 className="text-2xl font-semibold text-wvu-primary-blue">
                  Test Project Connectivity
                </h1>
              </div>

              <div className="pt-5 pl-5">
                {projectInfo && projectInfo.length > 0 ? (
                  <ProjectTestDashboard
                    projectId={projectInfo[0].id}
                    projectName={projectInfo[0].name}
                    projectDescription={projectInfo[0].description}
                  />
                ) : (
                  <p>No project information available for testing.</p>
                )}
              </div>
            </div>
    </main>
  );
}
