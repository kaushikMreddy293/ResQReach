import React, { useState } from 'react';

const WinterText = () => {
    // State to toggle dark mode
    return (
        <div className="ml-4 content-section mb-6">
            <p className="mb-4 text-lg">
                Winter storms create a higher risk of car accidents, hypothermia, frostbite, carbon monoxide poisoning, and heart attacks from overexertion. Winter storms including blizzards can bring extreme cold, freezing rain, snow, ice, and high winds.
            </p>
            <p className="mb-2 text-lg ">A winter storm can:</p>&nbsp;
            <ul className="list-disc pl-5 space-y-2">
                <li className="text-lg">Last a few hours or several days.</li>
                <li className="text-lg">Cut off heat, power, and communication services.</li>
                <li className="text-lg">Put older adults, children, sick individuals, and pets at greater risk.</li>
            </ul>
        </div>
    );
};

export default WinterText;
