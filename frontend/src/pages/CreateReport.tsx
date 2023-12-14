import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'tailwindcss/tailwind.css';
import Sidebar from '../components/Sidebar';


import { useNavigate } from 'react-router-dom';

interface NewReport {

    emergencyLevel: string;
    reportTitle: string;
    reportContent: string;
    reportLocation: string;

}

//Component to report incidents
const ReportForm: React.FC = () => {
    const [reportData, setReportData] = useState<NewReport>({
        emergencyLevel: 'Low',
        reportTitle: '',
        reportContent: '',
        reportLocation: ''
    });


    const handleGoBack = () => {
        navigate('/viewallincidents');
    };

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setReportData({
            ...reportData,
            [name]: value,
        });
    };


    //On submit of form, Post API call is handled here
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/reports/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers as needed
                },
                body: JSON.stringify(reportData),
            });
            const data = await response.json();
            console.log('Server Response:', data);



            if (response.ok) {
                console.log('Report submitted successfully');
                navigate('/viewallincidents');
                // Optionally, you can handle the success here, e.g., redirect or show a success message
            } else {
                console.error('Error submitting report:', response.statusText);
                // Handle the error, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors or other exceptions
        }
    };



    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center justify-center">


                <form onSubmit={handleSubmit} className=" mx-0 mt-0 p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-red-500">Enter Incident Report Details</h2>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium">
                            Report Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="reportTitle"
                            //   value={reportData.reportTitle}
                            onChange={handleInputChange}
                            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium">
                            Report Description:
                        </label>
                        <textarea
                            id="description"
                            name="reportContent"
                            // value={reportData.reportContent}
                            onChange={handleInputChange}
                            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                    </div>

                    <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 font-medium">
          Report Location:
        </label>
        <input
          type="text"
          id="location"
          name="reportLocation"
         // value={reportData.reportLocation}
          onChange={handleInputChange}
          className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

                    <div className="mb-4">
                        <label htmlFor="emergencyLevel" className="block text-gray-700 font-medium">
                            Emergency Level:
                        </label>
                        <select
                            id="emergencyLevel"
                            name="emergencyLevel"
                            value={reportData.emergencyLevel}
                            onChange={(e) =>
                                setReportData({
                                    ...reportData,
                                    emergencyLevel: e.target.value,
                                })
                            }
                            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Submit Report
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300 ml-20"
                    >
                        Back
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportForm;
