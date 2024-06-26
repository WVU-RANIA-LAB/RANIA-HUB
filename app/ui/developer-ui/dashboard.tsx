
import { fetchUserByEmail } from '@/app/lib/data/data';
import { auth } from '@/auth';
import { lusitana } from "../fonts";

export default async function Dashboard() {
    const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);

    return (
        <main className="flex-grow flex flex-col bg-white px-2 py-8 sm:px-10 sm:py-20">
        <div className="flex flex-col">
            <h1>Developer Dashboard</h1>
                {/* First Row */}
                <div className="flex">
                    {/* Left Container */}
                    <div className="w-1/2 h-80 p-2">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow bg-white border-2 border-black">
                                <div className="flex items-center justify-between w-full h-12 bg-wvu-primary-blue pl-5 pr-5">
                                    <h6 className={`${lusitana.className} rounded-md bg-wvu-primary-blue p-2 text-lg uppercase text-white antialiased`}>Project</h6>
                                    
                                </div>
                                <div className="pt-5 pl-5">
                                    <span className="underline text-blue-900 text-base mr-80 font-bold">Name:</span>
                                    <span className="underline text-blue-900 text-base mr-80 font-bold">Project ID:</span>
                                    <span className="underline text-blue-900 text-base font-bold">Project Description:</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Container */}
                    <div className="w-1/2 h-80 p-2 ">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow bg-white border-2 border-black">
                                <div className="flex items-center justify-between w-full h-12 bg-wvu-primary-blue pl-5 pr-5">
                                    <h6 className={`${lusitana.className} rounded-md bg-wvu-primary-blue p-2 text-lg uppercase text-white antialiased`}>Group Information</h6>
                                    
                                </div>
                                <div className="pt-5 pl-5">
                                    <table className="table-auto">
                                        <thead>
                                            <tr>
                                                <th className="text-left pr-20 pb-2 pl-10 underline text-blue-900 text-base mr-48 font-bold">First Name</th>
                                                <th className="text-left pb-2 pl-30 underline text-blue-900 text-base font-bold">Last Name</th>
                                                <th className="text-left pb-2 pl-24 underline text-blue-900 text-base font-bold">Email</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        </main>
    );
}
