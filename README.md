# Prerequisites:

- If you’re on Windows, consider using WSL/WSL2.
- Make sure you have git installed and configured.
  - [https://git-scm.com/](https://git-scm.com/)
- Make sure you have node installed. Any recent version should work.
  - [https://nodejs.org/en](https://nodejs.org/en)

# Steps

1.  ### Clone the repository:

    - git clone [git@github.com](mailto:git@github.com):WVU-RANIA-LAB/RANIA-HUB.git
    - You may need to use a different url if the repository was moved after the completion of the Spring 2024 Capstone cycle

2.  ### Navigate to the cloned repository and install dependencies:

    - cd /path/to/repository
    - npm install
    - If the output of the previous command doesn’t indicate that Prisma Client was generated, run

      - npx prisma generate

3.  ### Create a .env.local file at the root of the repository and set the following variables:

    - `DATABASE_URL`

      - Create a database using MongoDB Atlas (Documentation: [https://www.mongodb.com/docs/atlas/getting-started/](https://www.mongodb.com/docs/atlas/getting-started/))
      - Documentation for configuring the database url: [https://www.prisma.io/docs/orm/overview/databases/mongodb#connection-details](https://www.prisma.io/docs/orm/overview/databases/mongodb#connection-details)

    - `AUTH_SECRET`

      - Follow the **Setup Environment** step to generate this variable: [https://authjs.dev/getting-started/installation](https://authjs.dev/getting-started/installation)

    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`

      - Follow the resources here to configure the Google variables: ​​[https://authjs.dev/getting-started/providers/google](https://authjs.dev/getting-started/providers/google)

    - `EMAIL_SERVER_HOST=smtp.resend.com`
    - `EMAIL_SERVER_PORT=465`
    - `EMAIL_SERVER_USER=resend`
    - `EMAIL_SERVER_PASSWORD`

      - Create an account and generate an API key here: [https://resend.com/](https://resend.com/)
      - Keep in mind that the only email that will work with email authentication is the email you sign up to Resend with

    - `EMAIL_FROM=onboarding@resend.dev`

      - Alternatively, follow the new Auth.js documentation to use a single environment variable instead of the above 5 variables: [https://authjs.dev/getting-started/authentication/email](https://authjs.dev/getting-started/authentication/email)

4.  ### Run npm run dev and visit [http://localhost:3000](http://localhost:3000/) in your browser

# Miscellaneous Future Work

- Currently, doctors can view/edit any resident as long as they have that resident’s ID. Authorization needs to be added so that doctors can’t view residents who are not theirs.
- Currently, admins can create and edit new users. There are no checks for the format of the user’s input. Admin should only be able to create new users or update existing ones by entering their information correctly.
- Add user-friendly 404 pages that contain a link to go back to the user’s dashboard.
- Implement calendar on the doctor dashboard.
- Make styling consistent across the entire website, and make sure it conforms to WVU’s style guidelines.
- Polish forms:
  - Close on submit
  - Reset form state
- Make the entire website responsive (looks good on all screen sizes)
- Create a logo
- When a user signs in for the first time, show them a form to fill out their personal information. Until this form is completed, they shouldn’t be able to access their dashboard.

### <b>For more information, please refer to the documentation in the docs folder </b>
