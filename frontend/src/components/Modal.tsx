import React, { useEffect, useState } from 'react';
import Eimage from '../assets/images/earthquake.jpg';
import locationIcon from '../assets/icons/location.gif'
import repLow from '../assets/images/repLow.jpg'
import repMid from '../assets/images/repMid.jpg'
import repHigh from '../assets/images/repHigh2.jpg'
interface IncidentCard {
    _id: string;
    emergencyLevel: string;
    reportTitle: string;
    reportContent: string;
    reportLocation: string;
    updatedAt: string;
    // Add other properties as needed
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    report: IncidentCard | null; // Assume IncidentCard type is imported
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, report }) => {

    const getEmergencyLevelImageSrc = (emergencyLevel: string | any) => {
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
    
      const [imageURL, setImageURL] = useState('');
      useEffect(() => {
        // Call the function and set the imageURL state
        const imageUrl = getEmergencyLevelImageSrc(report?.emergencyLevel);
        setImageURL(imageUrl);
      }, [report?.emergencyLevel]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">

                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
                                <button
                                    className="absolute top-0 right-2 text-red-500 text-3xl"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Stop the event propagation
                                        onClose();
                                    }}
                                >
                                    &times;
                                </button>
                                <div className="modal-content" style={{ fontFamily: 'Sorts Mill Goudy, serif' }}>
                                    <img className="object-cover w-full h-2/5" src={imageURL} alt={report?.reportTitle} />
                                    <h2 className="text-2xl font-bold mb-4">{report?.reportTitle} reported</h2>
                                    <p className="text-lg">Emegerency Level: {report?.emergencyLevel}</p>
                                    <div className="text-lg flex mt-2">
                                    <img src={locationIcon} alt="location-icon" className="w-8 h-8 mr-4" />
                                        {report?.reportLocation}
                                        
                                    </div>
                                    <p className="mt-4"> Description: {report?.reportContent}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
