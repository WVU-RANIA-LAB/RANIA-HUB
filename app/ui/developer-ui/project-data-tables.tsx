import { lusitana } from '@/app/ui/fonts';
import {
  EditUserButton,
  DeleteUserButton,
} from '@/app/ui/admin-dashboard/admin-actions-btns';

/**
 * Props for the AdminAdminsTable component.
 */
type ProjectDataTableProps = {
  query: string;
  currentPage: number;
};

/**
 * Renders a table of admin users with their information and actions.
 *
 * @param {ProjectDataTableProps} props - The component props.
 * @param {string} props.query - The search query for filtering users.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The rendered component.
 */
export async function ProjectDataTable({
  query,
  currentPage,
}: ProjectDataTableProps) {
  //const users = await fetchFilteredUsers('ADMIN', query, currentPage);

  // if (!users.length) {
  //   return <p className="my-16 text-center text-gray-600">No admins found.</p>;
  // }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {/* {users.map((user) => (
          <div key={user.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{user.name}</h2>
                <div className="flex gap-2">
                  <EditUserButton user={user} />
                  <DeleteUserButton userId={user.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-700">{user.phoneNumber}</p>
            </div>
          </div>
        ))} */}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="flex gap-2">
                <EditUserButton user={user} />
                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export async function ProjectDataTableSingleValue({
  query,
  currentPage,
}: ProjectDataTableProps) {
  //const users = await fetchFilteredUsers('ADMIN', query, currentPage);

  // if (!users.length) {
  //   return <p className="my-16 text-center text-gray-600">No admins found.</p>;
  // }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {/* {users.map((user) => (
          <div key={user.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{user.name}</h2>
                <div className="flex gap-2">
                  <EditUserButton user={user} />
                  <DeleteUserButton userId={user.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-700">{user.phoneNumber}</p>
            </div>
          </div>
        ))} */}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="flex gap-2">
                <EditUserButton user={user} />
                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
export async function ProjectDataTableDataTable({
  query,
  currentPage,
}: ProjectDataTableProps) {
  //const users = await fetchFilteredUsers('ADMIN', query, currentPage);

  // if (!users.length) {
  //   return <p className="my-16 text-center text-gray-600">No admins found.</p>;
  // }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {/* {users.map((user) => (
          <div key={user.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{user.name}</h2>
                <div className="flex gap-2">
                  <EditUserButton user={user} />
                  <DeleteUserButton userId={user.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-700">{user.phoneNumber}</p>
            </div>
          </div>
        ))} */}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="flex gap-2">
                <EditUserButton user={user} />
                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
export async function ProjectDataTableLineChartData({
  query,
  currentPage,
}: ProjectDataTableProps) {
  //const users = await fetchFilteredUsers('ADMIN', query, currentPage);

  // if (!users.length) {
  //   return <p className="my-16 text-center text-gray-600">No admins found.</p>;
  // }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {/* {users.map((user) => (
          <div key={user.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{user.name}</h2>
                <div className="flex gap-2">
                  <EditUserButton user={user} />
                  <DeleteUserButton userId={user.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-700">{user.phoneNumber}</p>
            </div>
          </div>
        ))} */}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="flex gap-2">
                <EditUserButton user={user} />
                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
