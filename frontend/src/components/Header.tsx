import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import i18n from '../i18n';
import eng from '../assets/icons/eng.png'
import esp from '../assets/icons/spanish.png'
import tr from '../assets/icons/translations.png'

interface User {
  avatar: string;
}

interface RootState {
  user: {
    currentUser: User | null;
  };
}

// Header functional component
export default function Header() {
  // State for controlling dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  // Ref for the dropdown element
  const ref = useRef<HTMLDivElement>(null);
  // Hook for internationalization
  const { t } = useTranslation('translation');
  // Accessing current user data from Redux store
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to switch the application language
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

// Function to toggle the visibility of the dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

// Function to close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Effect to bind and unbind event listener for outside click
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // JSX for rendering the header
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Link to home */}
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-cyan-600'>ResQ</span>
            <span className='text-black'>Reach</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          {/* Navigation Links */}
          <Link to='/resqreach'>
            <li className='hidden sm:inline text-lg text-slate-700 border-b-4 border-transparent hover:border-cyan-600 transition duration-400 ease-in-out transform hover:translate-x-full font-semibold'>
              {t('home.label')}
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-lg text-slate-700 border-b-4 border-transparent hover:border-cyan-600 transition duration-400 ease-in-out transform hover:translate-x-full font-semibold'>
              {t('about.label')}
            </li>
          </Link>
          <div className="relative inline-block text-left" ref={ref}>
             {/* Dropdown button */}
            <div>
              <button onClick={toggleDropdown} type="button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <img src={tr} alt="Translate Icon" className="w-5 h-5" />
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            {/* <!-- Dropdown menu --> */}
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                <div className="py-1" role="none">
                  {/* <!-- Dropdown items --> */}
                  <button className='text-gray-700 block px-4 py-2 text-sm' onClick={() => switchLanguage('en')}>English</button>
                  <button className='text-gray-700 block px-4 py-2 text-sm' onClick={() => switchLanguage('tel')}>Telugu</button>
                  <button className='text-gray-700 block px-4 py-2 text-sm' onClick={() => switchLanguage('es')}>Spanish</button>
                  <button className='text-gray-700 block px-4 py-2 text-sm' onClick={() => switchLanguage('chi')}>Chinese</button>
                  <button className='text-gray-700 block px-4 py-2 text-sm' onClick={() => switchLanguage('ger')}>German</button>
                </div>
              </div>)}
          </div>
          
          {/* Profile Link */}
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-slate-700 text-lg font-semibold'>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
