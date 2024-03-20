export default function Contacts() {
    return (
        <main>
            <div className="absolute left-5 top-20 w-11/12 h-5/6 border-2 border-black bg-white">

                <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                    <h6 className=" text-2xl font-bold text-white">Contacts</h6>
                    <a href="#" className="text-blue-900 no-underline">
                        <button className="w-24 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                            Add Contact
                        </button>
                    </a>
                </div>

                <div className="pt-5 pl-5">
                    <span className="text-blue-900 text-base mr-24 font-bold">Name:</span>
                    <span className="text-blue-900 text-base mr-48 font-bold">Address:</span>
                    <span className="text-blue-900 text-base mr-60 font-bold">Phone Number:</span>
                    <span className="text-blue-900 text-base mr-80 font-bold">Email:</span>
                    <span className="text-blue-900 text-base font-bold">Actions:</span>
                </div>

                <div className="border border-black mx-4"></div>

            </div>
        </main>
    );
}
