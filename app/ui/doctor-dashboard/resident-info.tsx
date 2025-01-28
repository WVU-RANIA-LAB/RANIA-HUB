import { fetchUserById } from '@/app/lib/data/data';

type ResidentInformationProps = { residentId: string };

export default async function ResidentInformation({
  residentId,
}: ResidentInformationProps) {
  const resident = await fetchUserById(residentId);

  return (
    <div className="card card-compact h-full shadow-lg bg-white">
      <div className="card-body">
        <h2 className="card-title">Resident Information</h2>
        <div className="text-lg">
          <p>Name: {resident.name}</p>
          <p>Email: {resident.email}</p>
          <p>Phone Number: {resident.phoneNumber}</p>
          <p>ER Contact Name: PLACEHOLDER</p>
          <p>ER Contact Email: PLACEHOLDER</p>
          <p>ER Contact Phone Number: PLACEHOLDER</p>
        </div>
      </div>
    </div>
  );
}
