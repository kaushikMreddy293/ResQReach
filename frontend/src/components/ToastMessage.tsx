import React, { useEffect, useState } from 'react';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
}

//Component to show a toast message based on success or error and a custom message
const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);
  console.log("I'm here")

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 2000);

    // Cleanup the timeout when the component unmounts or when isVisible changes
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white items-center`}
          style={{ width: '250px' }} 
        >
          <p className="mb-2">{message}</p>
          <button className="absolute top-0 right-2 text-white" onClick={handleClose}>
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
