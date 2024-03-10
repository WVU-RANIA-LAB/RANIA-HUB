import { lusitana } from './ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center bg-wvu-off-white">
      <div className="mx-auto flex max-w-lg flex-col text-center">
        <h1
          className={`${lusitana.className} text-5xl font-bold text-wvu-primary-blue antialiased`}
        >
          RANIA HUB
        </h1>
        <h2 className={`${lusitana.className} my-5 text-2xl text-gray-800`}>
          Empowering Independent Living for Seniors
        </h2>
        <p className={`${lusitana.className} text-1xl my-1 text-gray-800`}>
          Welcome to RANIA Hub, a pioneering web application spearheading the
          integration of medical records and IoT devices to elevate the quality
          of life for the elderly. Our innovative smart-home system fosters
          independence by seamlessly connecting medical devices, managing
          appointments, medication schedules, and daily tasks through a
          user-friendly, centralized dashboard.
        </p>
      </div>
    </main>
  );
}
