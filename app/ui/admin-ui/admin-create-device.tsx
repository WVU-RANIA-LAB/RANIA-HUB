'use client';
import { forwardRef, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createRegisteredDevice } from '@/app/lib/actions/admin-actions';

type CreateRegisteredDeviceModalProps = {
  projects: { id: string; name: string }[]; // Add projects as a prop
};

const CreateRegisteredDeviceModal = forwardRef<
  HTMLDialogElement,
  CreateRegisteredDeviceModalProps
>(function CreateRegisteredDeviceModal({ projects }, ref) {
  const formRef = useRef<HTMLFormElement>(null);
  const deviceAction = createRegisteredDevice;
  const [state, dispatch] = useFormState(deviceAction, {});
  
  // State to hold the selected project's ID and Name
  const [selectedProject, setSelectedProject] = useState({ id: '', name: '' });

  // Handle project selection
  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    const projectName = projects.find((project) => project.id === projectId)?.name || '';
    setSelectedProject({ id: projectId, name: projectName });
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-6 top-6"
            onClick={() => {
              formRef.current?.reset();
            }}
          >
            <XMarkIcon className="h-6" />
          </button>
        </form>
        <h2 className="mb-4 text-lg font-bold">Register New Device</h2>
        <form
          ref={formRef}
          action={(formData) => {
            // Manually append the project name to formData before dispatching
            formData.append('projectName', selectedProject.name);
            dispatch(formData);
          }}
          className="flex flex-col gap-y-4"
        >
          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">From Project:</span>
              </div>
              <select
                name="projectId"
                className="select select-bordered"
                required
                onChange={handleProjectChange} // Update project name and ID on change
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <Submit />
            {state.message && <span className="text-red-500">{state.message}</span>}
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => formRef.current?.reset()} />
      </form>
    </dialog>
  );
});

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="btn mt-4 w-full hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
    >
      {pending && <span className="loading loading-spinner" />}
      Register Device
    </button>
  );
}

export default CreateRegisteredDeviceModal;
