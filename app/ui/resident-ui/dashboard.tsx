export default function Dashboard() {
    return (
        <main>
            <div className="w-1/2 h-1/2 p-4">
                <div className="flex flex-col h-full">
                    <div className="flex-grow bg-white">
                    
                        <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                            <h6 className=" text-2xl font-bold text-white">Devices</h6>
                                <a href="#" className="text-blue-900 no-underline">
                                    <button className="w-24 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                                        ---
                                    </button>
                                </a>
                        </div>

                    <div className="pt-5 pl-5">
                        <span className="underline text-blue-900 text-base mr-32 font-bold">Name:</span>
                        <span className="underline text-blue-900 text-base font-bold">Device Status:</span>
                    </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
