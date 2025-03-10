import { lusitana } from '@/app/ui/ui-utils/fonts';
import { fetchFilteredUsers, fetchDeveloperGroups, fetchProjectByGroup  } from '@/app/lib/data/admin-data';
import {
  //EditUserButton,
  DeleteDeveloperGroupButton,
} from '@/app/ui/admin-ui/admin-actions-btns';

/**
 * Props for the AdminResidentsTable component.
 */
type AdminResidentsTableProps = {
  // query: string;
  // currentPage: number;
};

/**
 * Renders a table of resident users with their information and actions.
 *
 * @param {AdminAdminsTableProps} props - The component props.
 * @param {string} props.query - The search query for filtering users.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The rendered component.
 */


export default async function AdminDeveloperGroupsTable({
  // query,
  // currentPage,
}: AdminResidentsTableProps) {
  const devGroups = await fetchDeveloperGroups();

  if (!devGroups.length) {
    return (
      <p className="my-16 text-center text-gray-600">No developers found.</p>
    );
  }

    // Fetch projects for each developer group
    const developerGroupsWithProjects = await Promise.all(
      devGroups.map(async (group) => {
        const projects = await fetchProjectByGroup(group.id);
        return { ...group, projects };
      })
    );  

    return (
      <div className="overflow-x-auto">
        {/* Mobile View */}
        <div className="flex flex-col gap-y-2 md:hidden">
          {developerGroupsWithProjects.map((group) => (
            <div key={group.id} className="card card-compact bg-gray-50">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className={`text-lg ${lusitana.className}`}>{group.year}</h2>
                </div>
                <p className="text-sm text-gray-700">{group.semester}</p>
                <p className="text-sm text-gray-700">{group.year}</p>
                <p className="text-sm text-gray-700">{group.course}</p>
                <p className="text-sm text-gray-700">{group.group_number}</p>
                
                <p className="text-sm text-gray-700">
                  <strong>Project:</strong>{' '}
                  {group.projects.length > 0
                    ? group.projects.map((project) => project.name).join(', ')
                    : 'No Project Assigned'}
                </p>
                <div className="flex gap-2">
                  {/* <EditUserButton user={user} developerGroups={devGroups}/> */}
                  <DeleteDeveloperGroupButton devGroupId={group.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Desktop View */}
        <table className="table hidden md:table">
          <thead>
            <tr>
              <th scope="col">Semester</th>
              <th scope="col">Year</th>
              <th scope="col">Course</th>
              <th scope="col">Group #</th>
              <th scope="col">Project</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
          <tbody>
            {developerGroupsWithProjects.map((group) => (
              <tr key={group.id}>
                <td>{group.semester}</td>
                <td>{group.year}</td>
                <td>{group.course}</td>
                <td>{group.group_number}</td>
                <td>
                  {group.projects.length > 0
                    ? group.projects.map((project) => project.name).join(', ')
                    : 'No Project Assigned'}
                </td>
                <td>
                <div className="flex gap-2">
                  {/* <EditUserButton user={user} developerGroups={devGroups}/> */}
                  <DeleteDeveloperGroupButton devGroupId={group.id} />
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
