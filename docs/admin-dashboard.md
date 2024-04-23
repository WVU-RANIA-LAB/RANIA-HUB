# Admin Documentation

## Relevant Files

- [`app/lib/actions/admin-actions.ts`](../app/lib/actions/admin-actions.ts)
- [`app/lib/data/admin-data.ts`](../app/lib/data/admin-data.ts)
- [`app/ui/admin-dashboard/admin-actions-btns.tsx`](../app/ui/admin-dashboard/admin-actions-btns.tsx)
- [`app/ui/admin-dashboard/admin-actions-modal.tsx`](../app/ui/admin-dashboard/admin-actions-modal.tsx)
- [`app/ui/admin-dashboard/admin-admins-table.tsx`](../app/ui/admin-dashboard/admin-admins-table.tsx)
- [`app/ui/admin-dashboard/admin-doctors-table.tsx`](../app/ui/admin-dashboard/admin-doctors-table.tsx)
- [`app/ui/admin-dashboard/admin-residents-table.tsx`](../app/ui/admin-dashboard/admin-residents-table.tsx)

## Future Work Needed

Ensure the format of user inputs is validated when creating or updating users to ensure correct data storage in the database.

## Breakdown of File Structure

### `admin-actions.ts`

This file provides functions to create, update, and delete users in a database using Prisma, with form data validation handled by Zod. It also revalidates certain paths in the Next.js cache whenever a user is created, updated, or deleted.

### `admin-data.ts`

This file provides two functions: `fetchFilteredUsers` and `fetchUsersPages`, which interact with a database using Prisma to retrieve users based on role and a search query. The `fetchFilteredUsers` function retrieves a paginated list of users, while `fetchUsersPages` gets the count of users matching the criteria, which is useful for pagination.

### `Admin-action-btns.tsx`

This file contains React components for managing user actions in an admin dashboard. It provides buttons for creating, editing, and deleting users, each triggering a modal dialog to confirm the action.

### `Admin-actions-modal.tsx`

This React component renders a modal for creating or editing user details in an admin dashboard, featuring form fields for user information and role selection. It utilizes form handling with 'react-dom' hooks to manage form state and status and performs actions like user creation or update based on the selected mode ('Create' or 'Edit').

### `Admin-admins-table.tsx`

This file defines a React component that renders a table or a list of admin users based on the provided query and current page number. It fetches filtered admin users from the backend, displays their name, email, and phone number in a table or compact card format, and provides edit and delete buttons for each user.

### `Admin-doctors-table.tsx`

This file defines a React component that renders a table of filtered doctor users fetched from an API based on a query and current page. It displays either a compact card view or a detailed table view of the doctors, allowing administrators to edit or delete individual doctor records.

### `Admin-residents-table.tsx`

This file exports a component that renders a table of resident users with their information and corresponding action buttons, such as editing and deleting. It fetches filtered resident user data based on a search query and current page number and displays it as a compact mobile card view or a detailed table view for larger screens.
