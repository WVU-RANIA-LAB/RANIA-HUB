import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredUsers } from '@/app/lib/data/admin-data';
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
export default async function AdminResidentsTable({
  query,
  currentPage,
}: AdminResidentsTableProps) {
  const users = await fetchFilteredUsers('RESIDENT', query, currentPage);

  if (!users.length) {
    return (
      <p className="my-16 text-center text-wvu-warm-gray-medium">No residents found</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="card card-compact">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg`}>{user.name}</h2>
                <div className="flex gap-2">
                  <EditUserButton user={user} />
                  <DeleteUserButton userId={user.id} />
                </div>
              </div>
              <p className="text-sm text-wvu-warm-gray-dark">{user.email}</p>
              <p className="text-sm text-wvu-warm-gray-dark">{user.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th className="text-lg text-wvu-warm-gray-medium border-b border-warm-gray-dark" scope="col">Name</th>
            <th className="text-lg text-wvu-warm-gray-medium border-b border-warm-gray-dark" scope="col">Email</th>
            <th className="text-lg text-wvu-warm-gray-medium border-b border-warm-gray-dark" scope="col">Phone Number</th>
            <th className="text-lg text-wvu-warm-gray-medium border-b border-warm-gray-dark" scope="col">Role</th>
            <th className="text-lg text-wvu-warm-gray-medium border-b border-warm-gray-dark" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} >
              <td className="border-b border-warm-gray-dark">{user.name}</td>
              <td className="border-b border-warm-gray-dark">{user.email}</td>
              <td className="border-b border-warm-gray-dark">{user.phoneNumber}</td>
              <td className="border-b border-warm-gray-dark">{user.role}</td>
              <td className="flex gap-2 border-b border-warm-gray-dark">
                <EditUserButton user={user} />
                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
