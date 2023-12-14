import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Eimage from '../assets/images/earthquake.jpg';
import Modal from './Modal';
import deleteIcon from '../assets/icons/delete-icon.svg'
import editIcon from '../assets/icons/edit-icon.svg'
import Toast from './ToastMessage';
import '../index.css';
import ColorThief from 'colorthief';
import repLow from '../assets/images/repLow.jpg'
import repMid from '../assets/images/repMid.jpg'
import repHigh from '../assets/images/repHigh2.jpg'
import locationIcon from '../assets/icons/location.gif'

let reportHostUrl = "http://localhost:3001/";
interface IncidentCard {
  _id: string;
  emergencyLevel: string;
  reportTitle: string;
  reportContent: string;
  reportLocation: string;
  updatedAt: string;
  // Add other properties as needed
}

interface CardProps {
  report: IncidentCard;
  onChangeInCard:()=>void
}

const imageMap: { [key: string]: string } = {
  Low: 'repLow2.jpg',
  Medium: 'repMid.jpg',
  High: 'repHigh2.jpg'
};


const IncidentViewCard: React.FC<CardProps> = ({ report,onChangeInCard }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReport, setModalReport] = useState<IncidentCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<string>(report.reportContent);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [textColor, setTextColor] = useState('black');
  

  const handleCardClick = async () => {
    // Open the modal
    setIsModalOpen(true);

    console.log("handle card clicked")
    // Make an API call to get report details by ID
    try {
      const response = await fetch( reportHostUrl + `reports/fetch/${report._id}`);
      const data = await response.json();
      setModalReport(data);
    } catch (error) {
      console.error('Error fetching report details:', error);
    }

  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  
  const [imageURL, setImageURL] = useState('');

  // Function to set image URL based on emergency level
  const getEmergencyLevelImageSrc = (emergencyLevel: string) => {
    switch (emergencyLevel) {
      case 'Low':
        return repLow;
      case 'Medium':
        return repMid;
      case 'High':
        return repHigh;
      default:
        return ''; // Provide a default value or handle other cases
    }
  };

  useEffect(() => {
    // Call the function and set the imageURL state
    const imageUrl = getEmergencyLevelImageSrc(report.emergencyLevel);
    setImageURL(imageUrl);
  }, [report.emergencyLevel]); // Run the effect whenever the emergency level changes


  //Handling font color change based on emergency level
  function getColorClass(emergencyLevel: string) {
    


    switch (emergencyLevel) {
      case 'Low':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'black'; // Default color or handle other cases
    }
  }

  const handleDeleteClick = async () => {

    console.log("Delete Clicked");
    try {

      // Make a DELETE request to delete the report with the given ID
      const response = await fetch(`http://localhost:3001/reports/delete/${report._id}`, {
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
        // Implement logic to update the state or remove the card from the UI
        
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
      const editedReport = {
        emergencyLevel: report.emergencyLevel, // Assuming you want to keep the emergency level unchanged
        reportTitle: report.reportTitle, // Assuming you want to keep the report title unchanged
        reportLocation: report.reportLocation,
        reportContent: editedContent, // Use the edited content
      };

      // Make an API call to save the edited content
      const response = await fetch(`http://localhost:3001/reports/update/${report._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReport),
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
  }, [imageURL]);

  //Methods to calculate color of card based on image inserted
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

  
  

  
  return (
    <div>
      <div ref={cardRef} className="bg-white border border-gray-300 rounded-lg shadow-md mb-5 overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-100 hover:shadow-lg hover:scale-105"><img ref={imgRef} src={imageURL} alt={`Image for ${report.reportTitle}`} style={ {maxHeight: '400px' } } /><br />
      <h2 className="flex justify-center items-center text-xl font-bold mb-2.5" style={{ fontFamily: 'Sorts Mill Goudy, serif', color: textColor }}>{report.reportTitle}</h2>
        <h4 className={`flex justify-center items-center text-xl font-bold mb-2.5 ${getColorClass(report.emergencyLevel)}`}> Emergency Level: {report.emergencyLevel}</h4>

        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
          />
        ) : (
          <div className="ml-4 mb-2 h-[3.75rem] line-clamp-2" style={{ fontFamily: 'Brygada, serif', color: textColor }}>{report.reportContent.substring(0, 80)}...</div>
        )}

      <h6 className="flex justify-center items-center text-xl font-bold mb-2.5" style={{ fontFamily: 'Sorts Mill Goudy, serif', color: textColor }}> <img src={locationIcon} alt="location-icon"  className="w-8 h-8 mr-4" style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px',padding:'3px' }} /> {report.reportLocation}</h6>
       


        <div className="flex justify-center space-x-4 mt-4">
          <button
            ref={buttonRef} style={{ color: textColor }}
            onClick={handleCardClick}
            className="px-4 py-2 hover:bg-yellow-600 text-black rounded transition duration-300 ease-in-out"
          > View Incident </button>

          <button
            onClick={handleDeleteClick}
            className="text-red-500 focus:outline-none focus:ring button-hover-scale"
            style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }}
          >
            <img src={deleteIcon} alt="Delete Icon" className="w-6 h-6" />
          </button>

          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500  text-white font-medium px-6 py-2 rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out hover:from-brightBlue/90 hover:to-skyBlue/90 "
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="text-red-500 focus:outline-none button-hover-scale"
              style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }}
            >
              <img src={editIcon} alt="Edit Icon" className="w-5 h-5" />
            </button>
          )}
        </div>
        <br />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} report={modalReport} />
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
};

export default IncidentViewCard;
