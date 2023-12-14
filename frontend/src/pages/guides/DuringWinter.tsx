import React from 'react'
import warn from '../../assets/images/winter-warn.png';

const DuringWinter = () => {
    return (
        <div id="section2" className="content-section">
            <img className="mx-auto" src={warn} alt="Safety Instructions" />
            <div className="bg-[#e2e8f0] p-6">
                <ul className="list-disc pl-5 space-y-2">
                    <li className="text-lg">Stay off roads if at all possible. If trapped in your car, then stay inside.</li>
                    <li className="text-lg">Limit your time outside. If you need to go outside, then wear layers of warm clothing. Watch for signs of frostbite and hypothermia.</li>
                    <li className="text-lg">Reduce the risk of a heart attack by avoiding overexertion when shoveling snow and walking in the snow.</li>
                </ul><br />
                <h1 className="ml-4 text-lg font-semibold mb-4"><em>Learn the signs of, and basic treatments for, frostbite and hypothermia.</em></h1>
                <div className="grid md:grid-cols-2 gap-6 bg-[#e2e8f0] p-6">
                    <div>
                        <p className="mb-2 text-lg "><b>Frostbite</b> causes loss of feeling and color around the face, fingers and toes.</p>&nbsp;
                        <ul className="list-disc pl-5 space-y-2">
                            <li className="ml-4 flex items-center">
                                <span className="text-cyan-600 mr-2">✔</span> <b>Signs</b>: Numbness, white or grayish-yellow skin, firm or waxy skin.
                            </li>
                            <li className="ml-4 flex items">
                                <span className="text-cyan-600 mr-2">✔</span> <b> Actions</b>: Go to a warm room. Soak in warm water. Use body heat to warm. Do not massage or use a heating pad.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2 text-lg "><b>Hypothermia</b> is an unusually low body temperature. A temperature below 95 degrees is an emergency.</p>&nbsp;
                        <ul className="list-disc pl-5 space-y-2">
                            <li className="ml-4 flex items">
                                <span className="text-cyan-600 mr-2">✔</span> <b>Signs</b>: Shivering, exhaustion, confusion, fumbling hands, memory loss, slurred speech or drowsiness.
                            </li>
                            <li className="ml-4 flex items">
                                <span className="text-cyan-600 mr-2">✔</span> <b> Actions</b>: Go to a warm room. Warm the center of the body first—chest, neck, head and groin. Keep dry and wrapped up in warm blankets, including the head and neck.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DuringWinter