import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'tailwindcss/tailwind.css';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

// Define the NewGuide interface for TypeScript type checking
interface NewGuide {
    title: string;
    content: string;
    category: string;
    // updatedAt: string; (commented out, optional field)
}

// CreateGuide functional component
const CreateGuide: React.FC = () => {
    // State to store the new guide data
    const [guideData, setGuideData] = useState<NewGuide>({
        title: '',
        content: '',
        category: '',
    });

    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Handle input changes and update state
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGuideData({
            ...guideData,
            [name]: value,
        });
    };

    const handleGoBack = () => {
        navigate('/guidePreview');
    };
    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Prevents the default form submit action

        try {
            // Post request to add a new guide
            const response = await fetch('http://localhost:3001/guides/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers as needed
                },
                body: JSON.stringify(guideData),
            });
            const data = await response.json();
            console.log('Server Response:', data);

            // Check if the request was successful
            if (response.ok) {
                console.log('Guide submitted successfully');
                navigate('/guidePreview'); // Redirect to incidentguide page
            } else {
                console.error('Error submitting guide:', response.statusText);
                // Handle the error, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors or other exceptions
        }
    };

    // Component JSX
    return (
        <div className="flex h-screen">
            <Sidebar /> {/* Sidebar component */}
            <div className="flex-1 flex items-center justify-center">
                {/* Form for creating a new guide */}
                <form onSubmit={handleSubmit} className="mx-0 mt-0 p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Enter Guide Details</h2>

                    {/* Title input */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleInputChange}
                            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Description input */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="content"
                            onChange={handleInputChange}
                            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                    </div>

                    {/* Category select */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-medium">
                            Category:
                        </label>
                        <select
                            id="category"
                            name="category"
                            onChange={(e) =>
                                setGuideData({
                                    ...guideData,
                                    category: e.target.value
                                })
                            }
                            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="floods">Floods</option>
                            <option value="earthquakes">Earthquakes</option>
                            <option value="wildfires">Wildfires</option>
                            <option value="tornadoes">Tornadoes</option>
                            <option value="winters">Winters</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Submit Guide
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

export default CreateGuide;
