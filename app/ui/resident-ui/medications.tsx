export default function Medications() {
    return (
        <main>
            <div className="absolute left-5 top-20 w-11/12 h-5/6 border-2 border-black bg-white">

                <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                    <h6 className=" text-2xl font-bold text-white">Medications</h6>
                    <a href="#" className="text-blue-900 no-underline">
                        <button className="w-24 h-8 text-base rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                            Create
                        </button>
                    </a>
                </div>

                <div className="pt-5 pl-5">
                    <span className="text-blue-900 text-base mr-20 font-bold">Prescribed By:</span>
                    <span className="text-blue-900 text-base mr-32 font-bold">Prescribed Date:</span>
                    <span className="text-blue-900 text-base mr-48 font-bold">Medication:</span>
                    <span className="text-blue-900 text-base mr-80 font-bold">Instructions:</span>
                    <span className="text-blue-900 text-base font-bold">Refills:</span>
                </div>

                <div className="border border-black mx-4"></div>

            </div>
        </main>
    );
}
