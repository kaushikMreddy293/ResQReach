import React from 'react'
import twarn from '../../assets/images/tornado-warning.jpg';

const TornadoText = () => {
  return (
    <div>
      <div className="ml-4 content-section mb-6">
        <p className="mb-4 text-lg">
          Tornadoes are violently rotating columns of air that extend from a thunderstorm to the ground. Tornadoes can destroy buildings, flip cars, and create deadly flying debris.
        </p>
        <p className="mb-2 text-lg font-semibold">A tornado can:</p>&nbsp;
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-lg">Happen anytime and anywhere.</li>
          <li className="text-lg">Bring intense winds, over 200 miles per hour.</li>
          <li className="text-lg">Look like funnels.</li>
        </ul>
      </div>
      <img className="mx-auto" src={twarn} alt="Safety Instructions" />
      <ul className="ml-4 list-disc pl-5 space-y-2">
        <li className="text-lg">Go to NOAA Weather Radio and your local news or official social media accounts for updated emergency information. Follow the instructions of state, local, and tribal officials.</li>
        <li className="text-lg">Go to a safe shelter immediately, such as a safe room, basement, storm cellar, or a small interior room on the lowest level of a sturdy building.</li>
        <li className="text-lg">Stay away from windows, doors, and outside walls.</li>
        <li className="text-lg">Do not go under an overpass or bridge. You’re safer in a low, flat location.</li>
        <li className="text-lg">Watch out for flying debris that can cause injury or death.</li>
        <li className="text-lg">Use your arms to protect your head and neck.</li>
        <li className="text-lg">If you can’t stay at home, make plans to go to a public shelter.</li>
      </ul>
    </div>
  )
}

export default TornadoText