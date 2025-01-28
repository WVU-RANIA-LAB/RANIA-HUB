1.0 & Admin Functional Requirements
-See 'app\lib\actions\admin-actions.ts' for all functions that handle actions admin can perform in the application
    1.1.0 & Account Management Requirements
        -'async function createUser()'
            -this function facilitates creating user accounts in the system
        -'async function updateUser()'
            -this function facilitates updating information for user accounts
        -'async function deleteUser()'
            -this function facilitates deleting user accounts
    1.1.1.1 Create new doctor account in system
        -'app\(dashboards)\admin-dashboard\doctors\page.tsx'
            -This page provides a means for creating doctor accounts
    1.1.1.2 Edit existing doctor in the system
        -'app\ui\admin-dashboard\admin-doctors-table.tsx'
            -each row in the doctors table has a button for editing the doctor account information
    1.1.1.3 Delete existing doctor from the system
        -'app\ui\admin-dashboard\admin-doctors-table.tsx'
            -each row in the doctors table has a button for deleting the doctor account information
    1.1.2.1 Create new resident account in system
        -'app\(dashboards)\admin-dashboard\residents\page.tsx'
            -Admins can create a new resident in the system from this page
    1.1.2.2 Edit existing resident in the system
        -'app\ui\admin-dashboard\admin-residents-table.tsx'
            -each row in the resident table has a button for editing the resident account
    1.1.2.3 Remove resident from the system
        -'app\ui\admin-dashboard\admin-residents-table.tsx'
            -each row in the resident table has a button for deleting the resident account
    1.1.3.1 Create a new admin account in the system
        -'app\(dashboards)\admin-dashboard\admins\page.tsx'
            -admins can create a new admin account from this page.
    1.1.3.2 Edit existing admin account
        -app\ui\admin-dashboard\admin-admins-table.tsx'
            -each row in the admins table has a button for editing the admin account
    1.1.3.3 Remove existing admin account
        -app\ui\admin-dashboard\admin-admins-table.tsx'
            -each row in the admins table has a button for editing the admin account
    1.1.4.1 Create a new developer account in the system
        -app\(dashboards)\admin-dashboard\developers\page.tsx'
            -admins can create a new developer account from this page
    1.1.4.2 Edit existing developer account
        -'app\ui\admin-dashboard\admin-developers-table.tsx'
            -each row in the developers table has a button for editing the developer account
    1.1.4.3 Remove existing developer account
        -'app\ui\admin-dashboard\admin-developers-table.tsx'
            -each row in the developers table has a button for deleting the developer account

    1.2 & Developer Group Management Requirements
    1.2.1 Create a new developer group in the system
        -'app\(dashboards)\admin-dashboard\developers\page.tsx'
            -This page hosts all informaiton about developers in the system for the admins
        -'app\ui\admin-dashboard\admin-create-developer-group.tsx'
            -This page contains the form for creating a new developer group
    1.2.2 Edit developer group information
        -'app\ui\admin-dashboard\admin-developers-table.tsx'
            -Each row in the developers table has a button to edit informaiton for a certain developer
    1.2.3 Remove existing developer group
        -'app\ui\admin-dashboard\admin-developer-groups-table.tsx'
            follow delete DeleteDeveloperGroupButton
    1.2.4 Add a developer to a developer group in the system
        -'app\ui\admin-dashboard\admin-actions-modal.tsx'
            This form handles multiple actions the admin may take, including adding a developer to a developer group
    1.2.5 Remove a developer from a developer group in the system
        -'app\ui\admin-dashboard\admin-actions-modal.tsx'
            This form handles multiple actions the admin may take, including removing a developer from a developer group

    1.3 & Project Management Requirements
    1.3.1 Create a new project
        -'app\ui\admin-dashboard\admin-create-project.tsx''
            This form allows the admin to create a new project for a developer group to work on
    1.3.2 Edit project information
        -'app\ui\admin-dashboard\admin-projects-table.tsx'
            Each row in the projects table has a button for editing the project information
    1.3.3 Delete Existing Project 
        -'app\ui\admin-dashboard\admin-projects-table.tsx'
            Each row in the projects table has a button for deleting the project
    
2.0 & Developer Functional Requirements
    2.1.0 & User Interface Management
       -'app\ui\developer-ui\dashboard.tsx'
            Houses the main landing page for developers 
    2.1.1 Add Data Card to Project Dashboard
        -'app\ui\developer-ui\developer-action-buttons.tsx'
            Houses functions for adding various data type cards to the dashboard
    2.1.2 Change Data Card position on Project Dashboard
        -app\ui\developer-ui\project-dashboard-components\ProjectDashboard.tsx-
            Data card changeability is provided by react-grid-layout
    2.1.3 Change Data Card size on Project Dashboard
        -app\ui\developer-ui\project-dashboard-components\ProjectDashboard.tsx-
            Data card changeability is provided by react-grid-layout
    2.1.4 Remove Data Card from Project Dashboard
        'app\ui\developer-ui\project-dashboard-components\ProjectDashboard.tsx'
            -see delete button populating in each datacard
    2.1.5 Save Project Dashboard
        -'app\ui\developer-ui\developer-action-buttons.tsx'
            Houses function for saving the dashboard to the database
    2.2.0 & Developer Project Testing Requirements
    2.2.1 Project Connectivity Assurance
        'app\ui\developer-ui\project-dashboard-components\ProjectTestDashboard.tsx'
            This page walks the developer through ensuring that their device will be able to connect to the home hub
    2.2.2 Project Handshake Assurance
        -app\ui\developer-ui\connectivity-test-items
    2.2.3 Project Data Update Assurance
        -app\ui\developer-ui\connectivity-test-items
    
3.0 & Resident Functional Requirements
    3.1.1 View Connected Devices
        Unsupported
    3.1.2 View Notifications
        Unsupported
    3.2.1 View Contacts
        -'app\ui\resident-ui\resident-dashboard\contacts\page.tsx'
    3.2.2 Update Contact Information
        -'app\ui\resident-ui\resident-dashboard\contacts\page.tsx'
    3.2.3 Delete Contact
        -'app\ui\resident-ui\resident-dashboard\contacts\page.tsx'
    3.3.1 View Calendar
        -'app\ui\resident-ui\calendar.tsx'
    3.3.2 Create Event
        Unsupported
    3.3.3 Edit Event
        Unsupported
    3.3.4 Delete Event
        Unsupported

4.0 & Doctor Functional Requirements & & \\\hline
    see 'app\ui\doctor-dashboard'
    4.1 & Medication Management & & \\\hline
    4.1.1 Add Medication for resident
        -app\ui\doctor-dashboard\medical-history-btns.tsx
            This page allows the doctor to add a new medication to the resident's regiment
    4.1.2 Remove Medication for resident
        -app\ui\doctor-dashboard\medical-history-btns.tsx
            This page allows the doctor to remove a medication from the resident's regiment
    4.1.3 Edit medication for resident
        -app\ui\doctor-dashboard\medical-history-btns.tsx
            This page allows the doctor to alter a medication from the resident's regiment
    4.1.4 View Notifications from Resident's Home Hub
        Unsupported
    4.1.5 Connect with Resident
        Unsupported
    4.1.6 Disconnect from Resident
        Unsupported