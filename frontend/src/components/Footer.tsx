import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  // Add any props you may need for your footer
}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2023 ResQReach. All rights reserved.</p>
          <nav className="mt-2">
            <Link to="/">Home</Link>
            <span className="mx-2">|</span>
            <Link to="/about">Our Team</Link>
            {/* Add additional footer links as needed */}
          </nav>
        </footer>
      );
};

export default Footer;