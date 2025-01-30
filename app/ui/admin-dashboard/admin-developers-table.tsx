import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredUsers, fetchDeveloperGroups } from '@/app/lib/data/admin-data';
import {
  EditUserButton,
  DeleteUserButton,
} from '@/app/ui/admin-dashboard/admin-actions-btns';

/**
 * Props for the AdminResidentsTable component.
 */
type AdminResidentsTableProps = {
  query: string;
  currentPage: number;
};

/**
 * Renders a table of resident users with their information and actions.
 *
 * @param {AdminAdminsTableProps} props - The component props.
 * @param {string} props.query - The search query for filtering users.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The rendered component.
 */
export default async function AdminDevelopersTable({
  query,
  currentPage,
}: AdminResidentsTableProps) {
  const users = await fetchFilteredUsers('DEVELOPER', query, currentPage);
  const devGroups = await fetchDeveloperGroups();

  if (!users.length) {
    return (
      <p className="my-16 text-center text-gray-600">No developers found.</p>
    );
  }

  // Map over users to include group information
  const usersWithGroupInfo = users.map((user) => {
    const group = devGroups.find((group) => group.id === user.group);
    return {
      ...user,
      groupInfo: group ? `${group.year} ${group.semester} ${group.course} Group ${group.group_number}` : 'No Group',
    };
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {usersWithGroupInfo.map((user) => (
          <div key={user.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{user.name}</h2>
                <div className="flex gap-2">
                  <EditUserButton user={user} developerGroups={devGroups}/>
                  <DeleteUserButton userId={user.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-700">{user.phoneNumber}</p>
              <p className="text-sm text-gray-700">{user.groupInfo}</p>
            </div>
          </div>
        ))}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            {/* <th scope="col">Role</th> */}
            <th scope="col">Group</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersWithGroupInfo.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              {/* <td>{user.role}</td> */}
              <td>{user.groupInfo}</td>
              <td className="flex gap-2">
                <EditUserButton user={user} developerGroups={devGroups}/>
                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
