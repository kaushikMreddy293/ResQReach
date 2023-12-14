import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import deleteIcon from '../assets/icons/delete-icon.svg'
import editIcon from '../assets/icons/edit-icon.svg'
import Toast from '../components/ToastMessage';
import ColorThief from 'colorthief';
// Defining the GuideCard interface for TypeScript type checking
interface GuideCard {
  _id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

// Defining the Props interface for the component
interface Props {
  guide: GuideCard;
  onChangeInCard: () => void
}

// Mapping of guide categories to image file names
const imageMap: { [key: string]: string } = {
  floods: 'floods.jpg',
  earthquakes: 'eq.jpg',
  wildfires: 'wildfire.jpg',
  tornadoes: 'tornado.jpg',
  winters: 'winter.jpg',
  other: 'other.jpg'
};

// The GuideCard component
const GuideCard: React.FC<Props> = ({ guide, onChangeInCard }) => {
  // State for toggling the expanded view of the card
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedContent, setEditedContent] = useState<string>(guide.content);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [textColor, setTextColor] = useState('black');

  // Function to toggle the expanded state
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Hook for navigation
  const navigate = useNavigate();

  // Function to navigate to the guide's detailed page
  const handleClick = () => {
    console.log("handle card clicked")
    navigate(`/guidePreview/${guide.category}`, { state: { guide: guide } });
  };


  // Selecting the image URL based on the guide category
  const imageName = imageMap[guide.category];
  const imageUrl = `${process.env.PUBLIC_URL}/${imageName}`;

  const handleDeleteClick = async () => {
    console.log("Delete Clicked");
    try {
      // Make a DELETE request to delete the report with the given ID
      const response = await fetch(`http://localhost:3001/guides/${guide._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Report successfully deleted, perform any additional actions (e.g., update state)
        console.log('Report deleted successfully');
        setToast({ type: 'success', message: 'Report Deleted successfuly!' });
        onChangeInCard();
      } else {
        // Handle error cases
        console.error('Failed to delete report:', response.status, response.statusText);
        setToast({ type: 'error', message: 'An error occurred. Please try again.' });

      }
    } catch (error) {
      console.error('Error deleting report:', error);
      setToast({ type: 'error', message: 'An error occurred. Please try again.' });

    }
  };

  const handleEditClick = () => {
    console.log("Edit button clicked");
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Prepare the body with the required fields for the API call
      const editedGuide = {
        title: guide.title,
        content: editedContent,
        category: guide.category,
      };

      // Make an API call to save the edited content
      const response = await fetch(`http://localhost:3001/guides/${guide._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedGuide),
      });

      if (response.ok) {
        console.log('Report edited successfully');
        setToast({ type: 'success', message: 'Report Edited successfully!' });
        setIsEditing(false);
        onChangeInCard();
      } else {
        console.error('Failed to edit report:', response.status, response.statusText);
        setToast({ type: 'error', message: 'An error occurred. Please try again.' });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error editing report:', error);
      setToast({ type: 'error', message: 'An error occurred. Please try again.' });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const loadImageColor = () => {
      // Check if imgRef.current is not null
      if (imgRef.current && imgRef.current.complete) {
        const colorThief = new ColorThief();
        try {
          const dominantColor = colorThief.getColor(imgRef.current);
          if (cardRef.current) { // Also check if cardRef.current is not null
            cardRef.current.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

            const contrastWithWhite = calculateContrast(dominantColor, [255, 255, 255]);
            const contrastWithBlack = calculateContrast(dominantColor, [0, 0, 0]);
            setTextColor(contrastWithWhite > contrastWithBlack ? 'white' : 'black');
          }
        } catch (error) {
          console.error('Error extracting color:', error);
        }
      }
    };

    // Check if imgRef.current exists before adding event listener
    if (imgRef.current) {
      if (imgRef.current.complete) {
        loadImageColor();
      } else {
        imgRef.current.addEventListener('load', loadImageColor);
      }

      // Cleanup
      return () => {
        imgRef.current?.removeEventListener('load', loadImageColor);
      };
    }
  }, [imageUrl]);

  function calculateContrast(rgb1: [number, number, number], rgb2: [number, number, number]): number {
    const luminance1 = getRelativeLuminance(rgb1);
    const luminance2 = getRelativeLuminance(rgb2);

    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  function getRelativeLuminance(rgb: [number, number, number]): number {
    const [r, g, b] = rgb.map(color => {
      color /= 255;
      return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }



  // JSX for rendering the guide card
  return (
    <div>
      {/* Card container with background, border, and hover effects */}
      <div ref={cardRef} className="bg-white border border-gray-300 rounded-lg shadow-md mb-5 overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-100 hover:shadow-lg hover:scale-105"><img ref={imgRef} src={imageUrl} alt={`Image for ${guide.title}`} /><br />
        {/* Title of the guide with custom font and color styling */}
        <h2 className="flex justify-center items-center text-xl font-bold mb-2.5" style={{ fontFamily: 'Sorts Mill Goudy, serif', color: textColor }}>{guide.title}</h2>

        {/* Static content display with character limit and custom font and color */}
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            style={{ color: textColor }}
          />
        ) : (
          <div className="ml-4 mb-2 h-[3.75rem] line-clamp-2" style={{ fontFamily: 'Brygada, serif', color: textColor }}>{guide.content.substring(0, 80)}...</div>
        )}

        {/* Button group for guide interactions */}
        <div className="flex justify-center space-x-4 mt-4 ">
          {/* Button to visit the guide */}
          <button ref={buttonRef} style={{ color: textColor }} onClick={handleClick} className="px-4 py-2 hover:bg-yellow-600 text-black rounded transition duration-300 ease-in-out">
            Visit Guide
          </button>

          {/* Button to delete the guide */}
          <button
            onClick={handleDeleteClick}
            className="text-red-500 focus:outline-none focus:ring button-hover-scale"
          >
            <img src={deleteIcon} alt="Delete Icon" className="w-6 h-6" />
          </button>

          {/* Toggle button between 'Edit' and 'Save' */}
          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500  text-white font-medium px-6 py-2 rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out hover:from-brightBlue/90 hover:to-skyBlue/90"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="text-red-500 focus:outline-none focus:ring button-hover-scale"
            >
              <img src={editIcon} alt="Edit Icon" className="w-5 h-5" />
            </button>
          )}
        </div>
        <br />
      </div>
      {/* Toast notification for feedback messages */}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
};

// Exporting the component
export default GuideCard;
