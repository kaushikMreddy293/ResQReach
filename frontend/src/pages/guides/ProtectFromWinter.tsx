import React from 'react'

const ProtectFromWinter = () => {
    return (
        <div id="section1" className="content-section">
            

            <div className="grid md:grid-cols-2 gap-6 bg-[#e2e8f0] p-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Winter Storm Warning</h3>
                    <p className="mb-4">Issued when hazardous winter weather in the form of heavy snow, heavy freezing rain, or heavy sleet is imminent or occurring. Winter Storm Warnings are usually issued 12 to 24 hours before the event is expected to begin.</p>

                    <h3 className="text-lg font-semibold mb-4">Know Your Risk for Winter Storms</h3>
                    <p>Pay attention to weather reports and warnings of freezing weather and winter storms. Listen for emergency information and alerts. Sign up for your community’s warning system. The Emergency Alert System (EAS) and National Oceanic and Atmospheric Administration (NOAA) Weather Radio also provide emergency alerts.</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Winter Storm Watch</h3>
                    <p className="mb-4">Alerts the public to the possibility of a blizzard, heavy snow, heavy freezing rain, or heavy sleet. Winter Storm Watches are usually issued 12 to 48 hours before the beginning of a Winter Storm.</p>

                    <h3 className="text-lg font-semibold mb-4">Winter Weather Advisory</h3>
                    <p>Issued for accumulations of snow, freezing rain, freezing drizzle, and sleet which will cause significant inconveniences and, if caution is not exercised, could lead to life-threatening situations.</p>
                </div>
            </div>
        </div>

    )
}

export default ProtectFromWinter