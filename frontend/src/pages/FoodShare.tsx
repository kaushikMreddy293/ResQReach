// FoodShare.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ListingCard from '../components/ListingCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


interface Listing {
  _id: string;
  imageUrls: string[];
  name: string;
  description: string;
  address: string;
  type: string;
  quantity: number;
  parking: boolean;
  // Add other properties based on your Listing type
}


function FoodShare() {
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch('http://localhost:3001/listing/alllistings', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data: Listing[] = await res.json();
        setAllListings(data);
      } catch (error) {
        setShowListingsError(true);
        console.error('Error fetching all listings:', error);
      }
    };

    fetchAllListings();
  }, []);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`http://localhost:3001/users/listing/${currentUser._id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: any = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/listing/delete/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data: any = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  const goToLanding = () => {
    
    navigate('/resqreach');
  }

  return (
    // <>
    <div className="flex h-screen">
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content div */}
      <div className="overflow-y-auto">

        {/* <div className="flex justify-content mb-4 gap-5 ml-4">
          <form className="flex flex-col gap-20">
            <Link
              className="bg-cyan-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
              to={'/resqreach/foodshare/create-listing'}
            >
              Create Listing
            </Link>
          </form><br />
          <button
            onClick={handleShowListings}
            className="bg-cyan-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          >
            Show My Listings
          </button><br />
          <button
            onClick={() => setUserListings([])}
            className="bg-cyan-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          >
            Show All Listings
          </button>
          <p className="text-red-700 mt-5">
            {showListingsError ? 'Error showing listings' : ''}
          </p>



        </div> */}



        <div className="container mx-auto py-10 px-6 text-black bg-white mt-10 flex flex-col items-center overflow-y-auto">
        
          <div className="flex flex-col items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-cyan-600 mb-5">
              {userListings.length > 0 ? 'My Personal Listings' : 'All Listings'}
            </h1>
          </div>
          <div className="flex justify-content mb-4 gap-5 ml-4">
          <form className="flex flex-col gap-20">
            <Link
              className="bg-cyan-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
              to={'/resqreach/foodshare/create-listing'}
            >
              Create Listing
            </Link>
          </form><br />
          <button
            onClick={handleShowListings}
            className="bg-cyan-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          >
            Show My Listings
          </button><br />
          <button
            onClick={() => setUserListings([])}
            className="bg-cyan-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          >
            Show All Listings
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-gradientWhite text-white rounded transition duration-300 ease-in-out" onClick={goToLanding}>
              Back
            </button>
          <p className="text-red-700 mt-5">
            {showListingsError ? 'Error showing listings' : ''}
          </p>



        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-10">
            { }
            {(userListings.length > 0 ? userListings : allListings).map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                handleListingDelete={handleListingDelete}
                isUserListing={userListings.length > 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodShare;
