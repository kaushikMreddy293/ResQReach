const FloodText = () => {
    return (
        <div>
            
            <div className="bg-[#e2e8f0] p-6">
                <ul className="list-none space-y-3">
                    <li className="ml-4 flex items-center">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✔</span> Find safe shelter right away.
                    </li>
                    <li className="ml-4 flex items-center">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✔</span> Do not walk, swim or drive through flood waters. <span className="text-red-600 font-bold">Turn Around, Don’t Drown!</span>
                    </li>
                    <li className="ml-4 flex items-center">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✔</span> Remember, just six inches of moving water can knock you down, and one foot of moving water can sweep your vehicle away.
                    </li>
                    <li className="ml-4 flex items-center">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✔</span> Stay off bridges over fast-moving water.
                    </li>

                    <li className="mt-4">
                        <p className="ml-12 font-semibold text-lg text-cyan-600 mb-2">Depending on the type of flooding:</p>
                        <ul className="list-none space-y-2">
                            <li className="ml-20 flex items-center">
                                <span className="text-cyan-600 mr-2">✔</span> Evacuate if told to do so.
                            </li>
                            <li className="ml-20 flex items-center">
                                <span className="text-cyan-600 mr-2">✔</span> Move to higher ground or a higher floor.
                            </li>
                            <li className="ml-20 flex items-center">
                                <span className="text-cyan-600 mr-2">✔</span> Stay where you are.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FloodText;
