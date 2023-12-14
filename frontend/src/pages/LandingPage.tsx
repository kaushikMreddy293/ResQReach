import React from 'react';

import Sidebar from '../components/Sidebar';
import emergencyIcon from '../assets/icons/emergency-icon.png'
import guideIcon from '../assets/icons/guide-icon.png'
import mealIcon from '../assets/icons/meal-icon.png'
import donationIcon from '../assets/icons/donation-icon.png'
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/landing_image.jpg'
import Footer from '../components/Footer';
import UserReviewPage from '../components/UserReview';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col min-h-screen'>
        <div className="flex-grow p-10">

            <div className="flex justify-center items-center">

                {/* Main content div */}
                {/* <div className="p-10 bg-peach relative z-10"> */}
                <div className="  relative z-10 your-container-class bg-cover bg-center bg-no-repeat bg-peach"
                    style={{ backgroundImage: bgImage }}>

                    <h1 className="text-4xl font-bold mb-10 text-center text-black" style={{ fontFamily: 'Brygada'}}>"By failing to prepare, you are preparing to fail"</h1>

                    <h2 className="text-4xl font-bold mb-10 text-center text-black" style={{ fontFamily: 'Brygada'}}>Welcome to ResQReach</h2>
                    <p className="mb-10 text-center text-black" style={{ fontFamily: 'Brygada'}}>
                        ResQReach is more than just an application; it's a tool to empower individuals to protect themselves, their families, and their communities before, during, and after disasters, while also addressing the critical issue of food waste through community sharing. Join us in making a difference!
                    </p>

                    {/* Buttons in a 2x2 grid */}

                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="bg-gray-800 p-8 rounded-xl text-white text-center w-60 h-60">
                            <button onClick={() => navigate('/viewallincidents')} className="text-white" style={{ fontFamily: 'Brygada'}}>
                                REPORT INCIDENT
                                <img src={emergencyIcon} alt="rescue Icon" style={{ margin: '10px', height: '130px' }} />
                            </button>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl text-white text-center w-60 h-60">
                            <button onClick={() => navigate('/foodshare')} className="text-white" style={{ fontFamily: 'Brygada'}}>
                                SHARE FOOD
                                <img src={mealIcon} alt="rescue Icon" style={{ margin: '10px', height: '130px' }} />
                            </button>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl text-white text-center w-60 h-60">
                            <button onClick={() => navigate('/guidePreview')} className="text-white" style={{ fontFamily: 'Brygada'}}>
                                VIEW GUIDE
                                <img src={guideIcon} alt="rescue Icon" style={{ margin: '10px', height: '130px' }} />
                            </button>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl text-white text-center w-60 h-60">
                            <button onClick={() => navigate('/donation')} className="text-white" style={{ fontFamily: 'Brygada'}}>
                                DONATE
                                <img src={donationIcon} alt="rescue Icon" style={{ margin: '10px', height: '130px' }} />
                            </button>
                        </div>
                    </div>

                </div>
               
            </div>
            <UserReviewPage />
            </div>
            
            <Footer />
        </div>

    );
}

export default LandingPage;
