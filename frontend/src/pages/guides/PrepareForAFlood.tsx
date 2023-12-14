const PrepareForAFlood = () => {
    return (
        <div id="section1" className="content-section">
            <div className="grid md:grid-cols-2 gap-6 bg-[#e2e8f0] p-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Know Your Risk for Floods</h3>
                    <p className="mb-4">Visit FEMA's Flood Map Service Center to know types of flood risk in your area. Sign up for your community’s warning system. The <a href="https://www.weather.gov/nwr/" className="text-cyan-600 underline">Emergency Alert System (EAS)</a> and National Oceanic and Atmospheric Administration (<a href="https://www.noaa.gov/" className="text-cyan-600 underline">NOAA</a>) Weather Radio also provide emergency alerts.</p>

                    <h3 className="text-lg font-semibold mb-4">Purchase Flood Insurance</h3>
                    <p>Purchase or renew a flood insurance policy. Homeowner’s insurance policies do not cover flooding. It typically takes up to 30 days for a policy to go into effect so the time to buy is well before a disaster. Get flood coverage under the <a href="https://www.floodsmart.gov/" className="text-cyan-600 underline">National Flood Insurance Program (NFIP)</a>.</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Preparing for a Flood</h3>
                    <p className="mb-4">Make a plan for your household, including your pets, so that you and your family know what to do, where to go, and what you will need to protect yourselves from flooding. Learn and practice evacuation routes, shelter plans, and flash flood response. Gather supplies, including non-perishable foods, cleaning supplies, and water for several days, in case you must leave immediately or if services are cut off in your area.</p>

                    <h3 className="text-lg font-semibold mb-4">In Case of Emergency</h3>
                    <p>Keep important documents in a waterproof container. Create password-protected digital copies. Protect your property. Move valuables to higher levels. Declutter drains and gutters. Install check valves. Consider a sump pump with a battery.</p>
                </div>
            </div>
        </div>
    );
};

export default PrepareForAFlood;
