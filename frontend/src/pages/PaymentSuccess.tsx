import React from 'react';
import './SuccessPage.css';
import Sidebar from '../components/Sidebar'
const SuccessPage: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="success-container">
      <div className="success-animation">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
      <div className="thank-you-message">
        Thank You for Your Valuable Payment.
      </div>
    </div>
    </div>
    
  );
};

export default SuccessPage;
