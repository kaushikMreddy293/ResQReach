import React from 'react'

const BeforeEarthquake = () => {
    return (
        <div id="section1" className="content-section">
            <div className="bg-[#e2e8f0] p-6">
                <ul className="list-none space-y-3">
                    {/* Main points with cyan-600 circle and white check */}
                    <li className="ml-4 flex items-center">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✔</span> Practice Drop, Cover, and Hold On with family and coworkers.
                    </li>
                    <li className="ml-4 flex items-center">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">✔</span>
                        <span><b>Make an Emergency Plan</b>: Create a family emergency communications plan that has an out-of-state contact. Plan where to meet if you get separated. Make a supply kit that includes enough food and water for several days, a flashlight, a fire extinguisher and a whistle.</span>
                    </li>
                    <li className="ml-20 flex items-center">
                        <span className="text-cyan-600 mr-2">✔</span> Being prepared allows you to avoid unnecessary excursions and to address minor medical issues at home, alleviating the burden on urgent care centers and hospitals.
                    </li>
                    <li className="ml-20 flex items-center">
                        <span className="text-cyan-600 mr-2">✔</span> Remember that not everyone can afford to respond by stocking up on necessities. For those who can afford it, make essential purchases and slowly build up supplies.
                    </li>
                    <li className="ml-4 flex items-center">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">✔</span>
                        <span><b>Protect Your Home</b>: Secure heavy items in your home like bookcases, refrigerators, water heaters, televisions and objects that hang on walls. Store heavy and breakable objects on low shelves.</span>
                    </li>
                    <li className="ml-20 flex items-center">
                        <span className="text-cyan-600 mr-2">✔</span> Consider making improvements to your building to fix structural issues that could cause your building to collapse during an earthquake..
                    </li>
                    <li className="ml-20 flex items-center">
                        <span className="text-cyan-600 mr-2">✔</span> Consider obtaining an earthquake insurance policy. A standard homeowner’s insurance policy does not cover earthquake damage.
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default BeforeEarthquake