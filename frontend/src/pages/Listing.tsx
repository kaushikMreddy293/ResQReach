import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Link, NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'swiper/css/bundle';
import {  FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import Contact from '../components/Contact';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faFileAlt, faCar, faUtensils, faMapMarkerAlt,faBuilding  } from '@fortawesome/free-solid-svg-icons';




export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [contact, setContact] = useState<boolean>(false);
  const params = useParams();
  const { currentUser } = useSelector((state: any) => state.user);

  interface Listing {
    name: string;
    address: string;
    type: string;
    description: string;
    imageUrls: string[];
    parking: boolean;
    quantity: number;
    userRef: string;
    // Add other properties based on your actual data structure
  }

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/listing/get/${params.listingId}`);
        const data: any = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div className="flex h-screen" style={{ fontFamily: 'Brygada'}}>
    
    <Sidebar/>
    <main className='p-3 mx-auto max-w-4xl overflow-y-auto'>
  {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
  {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
  {listing && !loading && !error && (
    <div className="max-w-screen-xl mx-auto">
      {/* Swiper Slider */}
      <Swiper navigation>
        {listing.imageUrls.map((url: any) => (
          <SwiperSlide key={url}>
            <div
              className='h-[550px] w-[950px]'
              style={{
                background: `url(${url}) center no-repeat`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Share Button */}
      <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
        <FaShare
          className='text-slate-500'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>

      {/* Copied Message */}
      {copied && (
        <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
          Link copied!
        </p>
      )}

      {/* Listing Details */}
      <div className='grid grid-cols-2 gap-4 p-4 rounded-md'>

  {/* Title and Location */}
  <div className='grid-item col-span-2 bg-indigo-200 p-4 rounded-md'>
    <p className='text-xl font-semibold text-indigo-700'>
      <FontAwesomeIcon icon={faBuilding} className='mr-2' />
      {listing.name}
    </p>
    <p className='flex items-center mt-2 gap-2 text-slate-600 text-sm'>
      <FontAwesomeIcon icon={faMapMarkerAlt} className='text-green-700' />
      {listing.address}
    </p>
  </div>

  {/* Type */}
  <div className='grid-item bg-blue-200 p-4 rounded-md'>
    <p className='font-semibold text-blue-700'>
      <FontAwesomeIcon icon={faLeaf} className='mr-2' />
      Type
    </p>
    <p>{listing.type === 'veg' ? 'Veg' : 'Non Veg'}</p>
  </div>

  {/* Description */}
  <div className='grid-item bg-yellow-200 p-4 rounded-md'>
    <p className='font-semibold text-yellow-700'>
      <FontAwesomeIcon icon={faFileAlt} className='mr-2' />
      Description
    </p>
    <p>{listing.description}</p>
  </div>

  {/* Parking */}
  <div className='grid-item bg-green-200 p-4 rounded-md'>
    <p className='font-semibold text-green-700'>
      <FontAwesomeIcon icon={faCar} className='mr-2' />
      Parking
    </p>
    <p>{listing.parking ? 'Available' : 'Not Available'}</p>
  </div>

  {/* Food Available For */}
  <div className='grid-item bg-purple-200 p-4 rounded-md'>
    <p className='font-semibold text-purple-700'>
      <FontAwesomeIcon icon={faUtensils} className='mr-2' />
      Food Available For
    </p>
    <p>{`${listing.quantity} people`}</p>

    
  </div>

            <div className='flex flex-col items-center gap-4 mt-5'>
  <Link to="/foodshare">
    <button className='bg-green-900 text-white w-[200px] p-3 rounded-md hover:opacity-95'>
      Back
    </button>
  </Link>
</div>

</div>
{currentUser && listing.userRef !== currentUser._id && !contact && (
    <button
      onClick={() => setContact(true)}
      className='bg-blue-500 text-white w-full p-3 rounded-lg uppercase hover:opacity-95'
    >
      Contact User
    </button>
  )}

  {contact && <Contact listing={listing} />} 
    </div>
  )}
</main>
</div>
);


}
