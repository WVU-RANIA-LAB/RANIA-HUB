'use client';
import { SetStateAction, useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function CreateRole() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRoleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    closeModal();
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full py-1 hover:bg-yellow-500 hover:text-white active:bg-blue-500 active:text-white"
        onClick={openModal}
      >
        Create
      </button>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="card-body">
              <h1 className="card-title">Create User</h1>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label htmlFor="name" className="mb-1 text-gray-800">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input bg-gray-200 text-gray-800"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="email" className="mb-1 text-gray-800">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input bg-gray-200 text-gray-800"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="phoneNumber" className="mb-1 text-gray-800">
                      Phone Number
                    </label>
                    <input
                      type="phoneNumber"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="input bg-gray-200 text-gray-800"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="role" className="mb-1 text-gray-800">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="select bg-gray-200 text-gray-800"
                      value={selectedRole}
                      onChange={handleRoleChange}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      <option value="RESIDENT">Resident</option>
                      <option value="DOCTOR">Doctor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="card-actions mt-6 justify-center">
                  <Submit />
                </div>
              </form>
            </div>
            <button
              className="btn btn-circle btn-sm absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="text btn-md rounded-md border-none bg-wvu-blue font-semibold text-white hover:bg-wvu-primary-blue"
    >
      {pending && <span className="loading loading-spinner" />}
      Save
    </button>
  );
}
