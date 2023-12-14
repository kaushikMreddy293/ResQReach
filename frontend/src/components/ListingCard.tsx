// ListingCard.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../assets/icons/delete-icon.svg'
import editIcon from '../assets/icons/edit-icon.svg'
import tor from '../assets/images/tornado.jpg'
import '../index.css';
import ColorThief from 'colorthief';
let reportHostUrl = "http://localhost:3001/";
interface Listing {
  _id: string;
  imageUrls: string[];
  name: string;
}

interface ListingCardProps {
  listing: Listing;
  handleListingDelete: (listingId: string) => void;
  isUserListing: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, handleListingDelete, isUserListing }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [textColor, setTextColor] = useState('black');

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
  }, [tor]);

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
      <div ref={cardRef} className="bg-white border border-gray-300 rounded-lg shadow-md mb-5 overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-100 hover:shadow-lg hover:scale-105">
        <img ref={imgRef} src={listing.imageUrls[0]} alt="listing cover" /><br />
        <h2 className="flex justify-center items-center text-xl font-bold mb-2.5" style={{ fontFamily: 'Brygada, serif', color: textColor }}>
          {listing.name}
        </h2>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to={`/resqreach/foodshare/listing/${listing._id}`}>
            <button
              ref={buttonRef}
              style={{ color: textColor, fontFamily: 'Brygada, serif'}}
              className="px-4 py-2 hover:bg-yellow-600 text-black rounded transition duration-300 ease-in-out"
            >
              View Listing
            </button>
          </Link>

          {isUserListing && (
            <>
              <button
                onClick={() => handleListingDelete(listing._id)}
                className="text-red-500 focus:outline-none focus:ring button-hover-scale"
              >
                <img src={deleteIcon} alt="Delete Icon" className="w-6 h-6" />
              </button>

              <Link
                to={`/resqreach/foodshare/update-listing/${listing._id}`}
                className="text-center sm:text-left"
              >
                <button className="text-white font-semibold px-4 sm:px-6 py-2 focus:outline-none focus:ring transition duration-300 ease-in-out button-hover-scale">
                  <span className="flex items-center">
                    <img src={editIcon} alt="Edit Icon" className="w-5 h-5" />
                  </span>
                </button>
              </Link>
            </>
          )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default ListingCard;
