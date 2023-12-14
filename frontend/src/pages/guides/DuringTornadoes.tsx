import React from 'react'

const DuringTornadoes = () => {
    return (
        <div id="section2" className="content-section">
            <div className="bg-[#e2e8f0] p-6">
                <ul className="list-none space-y-3">
                    <li className="ml-4 flex items-start">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">✔</span>
                        <p><b>Immediately go to a safe location that you have identified.</b></p>
                    </li>
                    <li className="ml-4 flex items-start">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">✔</span>
                        <p><b>Pay attention to EAS, NOAA Weather Radio, or local alerting systems</b> for current emergency information and instructions.</p>
                    </li>
                    <li className="ml-4 flex items-start">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">✔</span>
                        <p><b>Protect yourself</b> by covering your head or neck with your arms and putting materials such as furniture and blankets around or on top of you.</p>
                    </li>
                    <li className="ml-4 flex items-start">
                        <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">✔</span>
                        <p><b>Do not try to outrun a tornado in a vehicle</b> if you are in a car. If you are in a car or outdoors and cannot get to a building, cover your head and neck with your arms and cover your body with a coat or blanket, if possible.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DuringTornadoes