# Resident Dashboard Documentation

## Relevant Files

- [app/lib/actions/data](../app/lib/actions/data/)
- [`app/ui/resident-ui/dashboard.tsx`](./app/ui/resident-ui/dashboard.tsx)

## Future Work Needed

- Display devices on dashboard
- Correct the spacing on each table being displayed on the dashboard
- Add pages to each table on the dashboard (similar to view residents on the doctor role)

## Breakdown of File Structure

### data

This folder contains the methods for fetching data from the backend. This includes authentication for a session and retrieving all contacts and medications to display.

### dashboard.tsx

This folder contains all of the code for the resident dashboard. Including displaying a resident's medications, devices, appointments, and contacts.

---

# Resident Medications Documentation

## Relevant Files

- [`app/lib/actions/data`](../app/lib/actions/data/)
- [`app/ui/resident-ui/medications.tsx`](../app/ui/resident-ui/medications.tsx)

## Future Work Needed

- Add pages to the medications list (similar to view residents on the doctor role)

## Breakdown of File Structure

### data

This folder contains the methods for fetching data from the backend. This includes authentication for a session and retrieving all medications to display.

### medications.tsx

This folder contains all of the code for the resident medications. This code will fetch medications from the backend using the resident ID of the currently logged-in resident. It also converts the doctor ID to the corresponding doctor's Name.
