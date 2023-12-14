import Sidebar from '../components/Sidebar';
import React from 'react';
import Vamsi from '../assets/images/Vamsi.jpg';
import Vinay from '../assets/images/Vinay.jpeg';
import Nirnay from '../assets/images/nirnay.jpg';
import Kaushik from '../assets/images/kaushik.png';

interface Developer {
  id: number;
  name: string;
  bio: string;
  imageSrc: string;
}

//About pages component

const developers: Developer[] = [
  {
    id: 1,
    name: 'Kaushik Reddy',
    bio: 'Software Developer and Software graduate student at Northeastern University. NUID: 002248429',
    imageSrc: Kaushik
  },
  {
    id: 2,
    name: 'Vinay Gangadhara',
    bio: 'Software Developer and Software graduate student at Northeastern University. NUID: 002837596',
    imageSrc: Vinay,
  },
  {
    id: 3,
    name: 'Vamsi Naradasu',
    bio: 'Software Developer and Software graduate student at Northeastern University. NUID: 00220211',
    imageSrc: Vamsi,
  },
  {
    id: 4,
    name: 'Nirnay Reddy',
    bio: 'Software Developer and Software graduate student at Northeastern University. NUID: 002879525',
    imageSrc: Nirnay, 
  },
];

const About: React.FC = () => {
  return (
    <div className="flex h-screen" style={{fontFamily: 'Brygada, serif'}}>
      <Sidebar />
      <div className="container mx-10 my-8 overflow-y-auto max-h-full">
        <h1 className="text-3xl font-bold mb-6">Meet Our Developers</h1>
        <div className="grid grid-cols-2 gap-6">
          {developers.map((developer) => (
            <div key={developer.id} className="bg-white p-4 rounded-md shadow-md flex">
              <img src={developer.imageSrc} alt={developer.name} className="w-32 h-32 object-cover rounded-md mr-4" />
              <div>
                <h2 className="text-xl font-bold mb-2">{developer.name}</h2>
                <p>{developer.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New Section: Project ResQReach */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-4">About ResQReach</h1>
          <p>
            ResQReach is a Progressive Web Application aimed at enhancing disaster response and preparedness through active community engagement. This application empowers users to report emergencies, access preparedness resources, and facilitate sharing of leftover food from restaurants, thus playing a crucial role in crisis management.
          </p>
          <h2 className="text-2xl font-bold mb-2 mt-4">Features</h2>
          <ul className="list-disc ml-6">
            <li>Emergency Reporting System</li>
            <li>Disaster Preparedness Guides</li>
            <li>Food Share Functionality</li>
            <li>Real-Time Alerts and Notifications</li>
            <li>Enhancing Community Safety and Well-Being</li>
            <li>User reviews</li>
            <li>Internationalization</li>
          </ul>
          <h2 className="text-2xl font-bold mb-2 mt-4">Impact</h2>
          <ul className="list-disc ml-6">
            <li>Safety and Response</li>
            <li>Community Resilience</li>
            <li>Resource Optimization</li>
          </ul>
          <p className='mt-8'>
            "ResQReach is more than just an application; it's a tool to empower individuals to protect themselves, their families, and their communities before, during, and after disasters, while also addressing the critical issue of food waste through community sharing. Join us in making a difference!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
