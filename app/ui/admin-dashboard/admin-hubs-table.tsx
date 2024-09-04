import { lusitana } from '@/app/ui/fonts';
import { fetchProjects, fetchDeveloperGroups } from '@/app/lib/data/admin-data';
import { EditProjectButton, DeleteProjectButton } from './admin-actions-btns';
import { Project, DeveloperGroup } from '@prisma/client';

/**
 * Props for the AdminProjectsTable component.
 */
type AdminDevicesTableProps = {
  query: string;
  currentPage: number;
};

/**
 * Renders a table of projects with their information and actions.
 *
 * @param {AdminDevicesTableProps} props - The component props.
 * @param {string} props.query - The search query for filtering projects.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The rendered component.
 */
export default async function AdminHubsTable({
  query,
  currentPage,
}: AdminDevicesTableProps) {
  const projects: Project[] = await fetchProjects();
  const devGroups: DeveloperGroup[] = await fetchDeveloperGroups();

  // Filter projects based on query
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * 20;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + 20);

  if (!paginatedProjects.length) {
    return (
      <p className="my-16 text-center text-gray-600">No projects found.</p>
    );
  }

  // Map over projects to include group information
  const projectsWithGroupInfo = paginatedProjects.map((project) => {
    const group = devGroups.find((group) => group.id === project.group_owner);
    return {
      ...project,
      groupInfo: group
        ? `${group.year} ${group.semester} ${group.course} Group ${group.group_number}`
        : 'No Group',
    };
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {projectsWithGroupInfo.map((project) => (
          <div key={project.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{project.name}</h2>
                <div className="flex gap-2">
                  <EditProjectButton project={project} developerGroups={devGroups} />
                  <DeleteProjectButton projectId={project.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">{project.description}</p>
              <p className="text-sm text-gray-700">Group Owner: {project.groupInfo}</p>
            </div>
          </div>
        ))}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Project Description</th>
            <th scope="col">Group Owner</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectsWithGroupInfo.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.groupInfo}</td>
              <td className="flex gap-2">
                <EditProjectButton project={project} developerGroups={devGroups} />
                <DeleteProjectButton projectId={project.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
