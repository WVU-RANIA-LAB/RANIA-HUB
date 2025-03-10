import { Metadata } from 'next';

import { lusitana } from '@/app/ui/ui-utils/fonts';
import AddContactForm from '@/app/ui/resident-ui/add-contact-form';
import EditContactForm from '@/app/ui/resident-ui/edit-contact-form';
import DeleteContactForm from '@/app/ui/resident-ui/delete-contact-form';
import { auth } from '@/auth';
import { fetchContactsByUser, fetchUserByEmail } from '@/app/lib/data/data';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: 'Contacts',
};

export default async function Page() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const contacts = await fetchContactsByUser(user.id);

  if (contacts.length === 0) {
    return (
      <main className="flex grow flex-col bg-white px-2 py-8 sm:px-10 sm:py-20">
        <div className="mb-4 flex justify-end">
            <AddContactForm user={user}></AddContactForm>
        </div>
        <div className="rounded-md border border-black">
        <h1
          className={`${lusitana.className} mb-4 rounded-md bg-wvu-primary-blue p-2 text-3xl uppercase text-white antialiased`}
        >
          Contacts
        </h1>
          <table className="table table-auto">
            <thead>
              <tr
                className={`${lusitana.className} text-2xl font-bold text-wvu-primary-blue antialiased`}
              >
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-lg text-black">
                <td>No Contacts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }

  return (
    <main className="flex grow flex-col bg-white px-2 py-8 sm:px-10 sm:py-20">
        <div className="mb-4 flex justify-end">
            <AddContactForm user={user}></AddContactForm>
        </div>
        <div className="rounded-md border border-black">
        <h1
          className={`${lusitana.className} mb-4 rounded-md bg-wvu-primary-blue p-2 text-3xl uppercase text-white antialiased`}
        >
          Contacts
        </h1>
        <table className="table table-auto">
          <thead>
            <tr
              className={`${lusitana.className} text-lg text-black`}
            >
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="text-base text-black">{contact.firstName}/{contact.relationship}</td>
                <td className="text-base text-black">{contact.address.addressLine1}</td>
                <td className="text-base text-black">{contact.phoneNumber}</td>
                <td className="text-base text-black">{contact.email}</td>
                <td
                  className={`${lusitana.className} join join-vertical md:join-horizontal`}
                >
                <td>
                  <button className="w-12 h-8 rounded-full flex justify-center items-center">
                    <PencilIcon className='w-6' /><EditContactForm contact={contact}></EditContactForm>
                  </button>
                </td>
                <td>
                  <button className="w-12 h-8 rounded-full flex justify-center items-center">
                    <TrashIcon className='w-6' /><DeleteContactForm contact={contact}></DeleteContactForm>
                  </button>
                </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
