import { RecentMedicalHistory } from '@/app/ui/doctor-ui/recent-medical-history';
import { RecentMedications } from '@/app/ui/doctor-ui/recent-medications';
import ResidentInformation from '@/app/ui/doctor-ui/resident-info';

type PageProps = { params: { residentId: string } };

export default function Page({ params }: PageProps) {
  const { residentId } = params;

  return (
    <main className="flex grow grid-cols-2 grid-rows-2 flex-col gap-4 bg-gray-50 p-4 md:p-8 lg:grid lg:gap-8">
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 ">
        <ResidentInformation residentId={residentId} />
      </div>
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <RecentMedicalHistory residentId={residentId} />
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <RecentMedications residentId={residentId} />
      </div>
    </main>
  );
}
