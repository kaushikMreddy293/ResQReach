import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom';
import IncidentViewCard from '../components/IncidentViewCard';
import spinner from '../assets/icons/spinner.gif';
interface Report {
  _id: string;
  emergencyLevel: string;
  reportTitle: string;
  reportContent: string;
  reportLocation: string;
  updatedAt: string;
  // Add other properties as needed
}

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToCreateIncident = () => {
    navigate('/reportincident');
  };

  return { goToCreateIncident };
};


const IncidentReport: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);

  const { goToCreateIncident } = useNavigation();

  //API call to get incident reports
  const fetchData = () => {
    // Fetch data from API
    fetch('http://localhost:3001/reports')
      .then(response => response.json())
      .then(data => {
        // Set reports state with fetched data
        setReports(data);
        console.log(data);
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, []);

  const handleClick = () => {
    // Handle button click event
    console.log('Button clicked!');
    goToCreateIncident();

  };

  const goToLanding = () => {
    navigate('/resqreach');
  }

  const handleChangeInCard = () => {

    fetchData();

  }


  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="container mx-auto py-10 px-6 text-black bg-white mt-10 flex flex-col items-center overflow-y-auto">
        <div className="flex flex-col items-center justify-between w-full">
          <h2 className="text-4xl font-bold text-cyan-600 mb-5">All Incidents</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-cyan-600 hover:bg-gradientWhite text-white rounded transition duration-300 ease-in-out" onClick={handleClick}>
              Report Incident
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-gradientWhite text-white rounded transition duration-300 ease-in-out" onClick={goToLanding}>
              Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-10">
          {reports && reports.length > 0 ? (
            // Render reports grid
            reports.map((report, index) => (
              <IncidentViewCard key={index} report={report} onChangeInCard={handleChangeInCard} />
            ))
          ) : (
            // Display loading message
            <img src={spinner} alt="Loading Reports" />
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentReport