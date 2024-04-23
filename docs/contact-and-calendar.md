# Contacts Documentation

## Relevant Files

- [`app/ui/add-contact-form.tsx`](../app/ui/add-contact-form.tsx)
- [`app/ui/delete-contact-form.tsx`](../app/ui/delete-contact-form.tsx)
- [`app/ui/edit-contact-from.tsx`](../app/ui/edit-contact-from.tsx)
- [`app/lib/actions/contacts-actions.ts`](../app/lib/actions/contacts-actions.ts)
- [`app/(dashboards)/resident-dashboard/contacts/page.tsx`](<../app/(dashboards)/resident-dashboard/contacts/page.tsx>)

## Future Work Needed

- Add an emergency contact icon for contacts that are assigned as emergency contacts.

## Breakdown of File Structure

### UI

This folder contains the client-side files for objects the user interacts with, such as the forms and buttons that take user input. These files call the functions in `contacts-actions`.

### Lib

This folder contains the functions that get called in the UI folder in the file `contacts-actions`. This is used for fetching information from the database.

### Resident-dashboard/contacts

This directory is where the main page for contacts is located. It contains the Contacts page and shows a table of all the contacts belonging to the user. Client-side elements from the UI folder are called here to allow for user interaction.

---

# Calendar Documentation

## Relevant Files

- [`app/ui/resident-ui/calendar.tsx`](../app/ui/resident-ui/calendar.tsx)
- [`app/(dashboards)/resident-dashboard/calendar/page.tsx`](<../app/(dashboards)/resident-dashboard/calendar/page.tsx>)

## Future Work Needed

- Add buttons to Add, Edit, and Delete events on the Calendar.
- Implement backend work to show the calendar for the user currently signed in. It currently requires hardcoded email to work properly.

## Breakdown of File Structure

### UI

This folder contains the code used to implement the Google Calendar on the Resident Calendar page using the Google Calendar API.

### Resident-dashboard/calendar

This folder contains a file that calls the function with the calendar code for the calendar to be displayed on the Calendar Page on the Web Application.
