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
    <main className="flex-grow flex flex-col bg-wvu-off-white px-15 py-10 sm:px-20 sm:py-18">
      <div className="flex flex-col md:flex-row flex-wrap">
        {/* First Container */}
        <div className="w-full p-2">
          <div className="flex flex-col overflow-hidden">
            <div className="flex-grow">
              <div className="flex items-center justify-between w-full h-12 pl-5 pr-5">
                <h6 className={`text-4xl text-wvu-primary-blue font-bold`}>
                  Test Project Connectivity
                </h6>
              </div>
              <div>
                
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
          </div>
        </div>
      </div>
    </main>
  );
}
