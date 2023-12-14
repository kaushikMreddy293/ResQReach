import React, { useState, ChangeEvent, FormEvent } from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaUpload, FaTrash, FaCheck } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCar, faUtensils } from '@fortawesome/free-solid-svg-icons';

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBp8dpOEAXn0Form0SF9Fmd7vjfuef0Y3M",
  authDomain: "resqreach6150.firebaseapp.com",
  projectId: "resqreach6150",
  storageBucket: "resqreach6150.appspot.com",
  messagingSenderId: "526925269528",
  appId: "1:526925269528:web:292ad87e19b41de992916d"
};
export const app = initializeApp(firebaseConfig);

interface FormData {
  imageUrls: string[];
  name: string;
  description: string;
  address: string;
  type: string;
  quantity: number;
  parking: boolean;
}

export default function CreateListing() {
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'non-veg',
    quantity: 1,
    parking: false,
  });
  const [imageUploadError, setImageUploadError] = useState<string | boolean>(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises: Promise<string>[] = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      } catch (err) {
        setImageUploadError('Image upload failed (2 mb max per image)');
        setUploading(false);
      }
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.id === 'veg' || e.target.id === 'non-veg' || e.target.id === 'mixed') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === 'parking' && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
      setLoading(true);
      setError(false);
      
      const emailAddressesResponse = await fetch('http://localhost:3001/listing/all-emails', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const emailAddressesData = await emailAddressesResponse.json();
    console.log(emailAddressesData);
    // Extract email addresses from the response
    //const recipients = emailAddressesData.map((emailData:any) => emailData.email);

    // Create the emailData object
    const emailData = {
      subject: 'New Listing',
      body: `A new Food listing named ${formData.name} has been created.\nPlease grab the food at ${formData.address}.`,
      recipients:emailAddressesData,
    };
      const res = await fetch('http://localhost:3001/listing/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          emailData,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/resqreach/foodshare/listing/${data._id}`);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Brygada, serif'}}>
      <Sidebar />
      <main className='p-6 max-w-4xl mx-auto mt-12 flex-grow'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Food Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
          <div className='flex flex-col gap-4 flex-1'>
            <input
              type='text'
              placeholder='Name'
              className='border p-3 rounded-lg'
              id='name'
              maxLength={62}
              minLength={10}
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              placeholder='Description'
              className='border p-3 rounded-lg'
              id='description'
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type='text'
              placeholder='Address'
              className='border p-3 rounded-lg'
              id='address'
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='veg'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.type === 'veg'}
                />
                <span>veg</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='non-veg'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.type === 'non-veg'}
                />
                <span>non-veg</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='quantity'
                  min={1}
                  max={100}
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.quantity}
                />
                <span>Quantity</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>
              Images:
              <span className='font-normal text-gray-600 ml-2'>
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className='flex gap-4'>
              <input
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                className='p-3 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                disabled={uploading}
                onClick={handleImageSubmit}
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 border items-center'
                >
                  <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-contain rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className='p-3 bg-blue-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full'
            >
              {loading ? 'Creating...' : 'Create Now'}
            </button>
            <Link to="/foodshare">
              <button
                className='p-3 bg-green-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full'
              >
                Back
              </button>
            </Link>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
        </form>
      </main>

     
      
      
    </div>
  );
}

