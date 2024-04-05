import { Metadata } from 'next';

import { lusitana } from '@/app/ui/fonts';
import AddContactForm from '@/app/ui/add-contact-form';
import EditContactForm from '@/app/ui/edit-contact-form';
import DeleteContactForm from '@/app/ui/delete-contact-form';
import { auth } from '@/auth';
import { fetchContactsByUser, fetchUserByEmail } from '@/app/lib/data';
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
      <main className="grow bg-white py-16">
        {' '}
        <div className="mx-auto max-w-7xl">
          <div
            className={`${lusitana.className} rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased`}
          >
            Manage Contacts <AddContactForm user={user}></AddContactForm>
          </div>
          <br></br>
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }

  return (
    <main className="grow bg-white py-16">
      <div className="mx-auto max-w-7xl">
        <div
          className={`${lusitana.className} rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased`}
        >
          Manage Contacts <AddContactForm user={user}></AddContactForm>
        </div>
        <br></br>
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
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.firstName && contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.phoneNumber}</td>
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
