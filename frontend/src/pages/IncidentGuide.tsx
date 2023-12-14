import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import GuideCard from '../components/GuideCard';
import Toast from '../components/ToastMessage';
import spinner from '../assets/icons/spinner.gif';

// Define the Guide interface for TypeScript type checking
interface Guide {
  _id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

// Custom hook for navigation
export const useNavigation = () => {
  const navigate = useNavigate();

  // Function to navigate to the suggestion form page
  const goToCreateGuide = () => {
    navigate('/create-guide');
  };

  return { goToCreateGuide };
};

// Main component for preparing guides
const PrepareGuide: React.FC = () => {
  // State for storing guides and all guides
  const [guides, setGuides] = useState<Guide[]>([]);
  const [allGuides, setAllGuides] = useState<Guide[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const requiredCategories = ['floods', 'wildfires', 'winters', 'tornadoes', 'earthquakes', 'other'];

  const navigate = useNavigate();
  // Handler for searching guides by category
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filteredGuides = allGuides.filter(guide =>
      guide.category.toLowerCase().includes(query)
    );
    setGuides(filteredGuides);
  };

  // Using custom navigation hook
  const { goToCreateGuide } = useNavigation();

  // Function to fetch guides data from the API
  const fetchData = () => {
    fetch('http://localhost:3001/guides')
      .then(response => response.json())
      .then(data => {
        setGuides(data); // Updating the state with fetched data
        setAllGuides(data); // Storing all guides for searching
      })
      .catch(e => console.error(e));
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle button click event
  const handleClick = () => {
    console.log('Button clicked!');
    goToCreateGuide();
  };

  const handleChangeInCard = () => {
    fetchData();
  }

  // Filter and deduplicate categories for the dropdown
  const uniqueCategories = Array.from(new Set(
    allGuides
      .filter(guide => requiredCategories.includes(guide.category))
      .map(guide => guide.category)
  ));

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category) {
      // Filter guides by selected category
      const filteredGuides = allGuides.filter(guide => guide.category === category);
      setGuides(filteredGuides);
    } else {
      // If no category is selected, show all guides
      setGuides(allGuides);
    }
  };

  // Function to fetch guides based on category
  const handleGetClick = async (category: string) => {
    console.log("Category selected:", category);
    try {
      const response = await fetch(`http://localhost:3001/guides/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Report successfully deleted, perform any additional actions (e.g., update state)
        console.log('Report fetched successfully');
        setToast({ type: 'success', message: 'Report fetched successfuly!' });
        // onChangeInCard();
      } else {
        // Handle error cases
        console.error('Failed to fetch report:', response.status, response.statusText);
        setToast({ type: 'error', message: 'An error occurred. Please try again.' });

      }
    } catch (error) {
      console.error('Error fetching report:', error);
      setToast({ type: 'error', message: 'An error occurred. Please try again.' });

    }
  };
  const goToLanding = () => {
    navigate('/resqreach');
  }


  // Component rendering
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto py-10 px-6 text-black bg-white mt-10 flex flex-col items-center overflow-y-auto">
        <div className="flex flex-col items-center justify-between w-full">
          <h2 className="text-4xl font-bold text-cyan-600 mb-5">Guides</h2>
          <select
            onChange={handleCategoryChange}
            className="mb-10 px-4 py-2 border border-gray-300 rounded"
            value={selectedCategory}
          >
            <option value="">Select a category...</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <div className="flex gap-4">
          <button className="px-4 py-2 bg-cyan-600 hover:bg-gradientWhite text-white rounded transition duration-300 ease-in-out" onClick={handleClick}>
            Create Guide
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-gradientWhite text-white rounded transition duration-300 ease-in-out" onClick={goToLanding}>
              Back
            </button>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-10">
          {guides && guides.length > 0 ? (
            guides.map((guide, index) => (
              <GuideCard key={index} guide={guide} onChangeInCard={handleChangeInCard} />
            ))
          ) : (
            // Display loading message
            <img src={spinner} alt="Loading Guides" />
          )}
        </div>
      </div>
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
};

// Export the component
export default PrepareGuide;
