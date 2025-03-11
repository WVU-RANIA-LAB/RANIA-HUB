import { fetchUserByEmail } from '@/app/lib/data/data';
import { auth } from '@/auth';
import { lusitana } from '../ui-utils/fonts';
import { fetchDeveloperGroupMembers, fetchProjectByGroup } from '@/app/lib/data/developer-data';
import ProjectDashboard from './project-dashboard-components/ProjectDashboard';

export default async function Dashboard() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const groupMembers = await fetchDeveloperGroupMembers(session!.user!.group!);
  const projectInfo = await fetchProjectByGroup(session!.user!.group!);

  const groupNumber = session!.user!.group!

  return (
  <main className="flex grow flex-row bg-wvu-off-white px-10 py-10 sm:px-15 sm:py-18 lg:flex-row gap-10">
      {/* Left Column: First and Second Containers */}
      <div className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-6">
        {/* First Container */}
        <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-wvu-primary-blue">Project</h1>
            </div>
            <div className="pt-5 pl-5">
              <div className="overflow-hidden">
                {projectInfo && projectInfo.length > 0 ? (
                  <>
                    <div className="flex items-center mb-4">
                      <span className="block underline text-blue-900 text-base font-bold mr-2">Name:</span>
                      <span>{projectInfo[0].name}</span>
                    </div>
                    <span className="block underline text-blue-900 text-base font-bold">Project Description: </span>
                    <span>{projectInfo[0].description}</span>
                  </>
                ) : (
                  <span>No project information available.</span>
                )}
              </div>
            </div>
        </div>

        {/* Second Container */}
        <div className="mb-8">
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-wvu-primary-blue">Group Information</h1>
            </div>
            <div className="pt-5 pl-5">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="text-left pb-2 underline text-blue-900 text-base font-bold">Name</th>
                    <th className="text-left pb-2 underline text-blue-900 text-base font-bold">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {groupMembers && groupMembers.length > 0 ? (
                    groupMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="pb-2 pr-5 whitespace-normal break-words">{member.name}</td>
                        <td className="pb-2 whitespace-normal break-words">{member.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>No group members found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Third Container */}
      <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
        <div className="flex-grow">
          <div className="flex items-center justify-between pb-5">
            <h1 className="text-2xl font-semibold text-wvu-primary-blue">Project Dashboard</h1>
          </div>
          <div style={{ padding: 5, display: 'flex', justifyContent: 'center' }}>
            {projectInfo && projectInfo.length > 0 ? (
              <ProjectDashboard
                projectId={projectInfo[0].id}
                projectName={projectInfo[0].name}
                projectDescription={projectInfo[0].description}
              />
            ) : (
              <p>No project information available for the dashboard.</p>
            )}
          </div>
        </div>
      </div>
  </main>

  );
}
