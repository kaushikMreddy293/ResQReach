import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import {loadStripe, Stripe} from "@stripe/stripe-js"
import './YourComponent.css';
import { useNavigate } from 'react-router-dom';

const Donation: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [enteredCardNumbers, setEnteredCardNumbers] = useState<number | null>(0);
  const navigate = useNavigate();

  const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const value = e.target.value;
  
    // Allow only numeric characters
    const numericValue = value.replace(/\D/g, '');
  
    // Restrict the card number to 16 digits
    const truncatedValue = numericValue.slice(0, 16);
  
    const cardNumberElement = document.getElementById('card_number');
  
    if (cardNumberElement) {
      // Remove the 'filed' class from all spans
      cardNumberElement.querySelectorAll('span').forEach(span => span.classList.remove('filed'));
  
      for (let i = 0; i < truncatedValue.length; i++) {
        const targetChild = cardNumberElement.children[i] as HTMLDivElement;
  
        if (targetChild) {
          targetChild.innerText = i > 3 && i < 12 ? '*' : truncatedValue.charAt(i);
          targetChild.classList.add('filed');
        }
      }
    }
  
    // Update the card number state
    setCardNumber(truncatedValue);
    setEnteredCardNumbers(truncatedValue.length);
  };

  const handleHolderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardHolder = document.getElementById('card_holder');
    if (cardHolder) {
      cardHolder.innerText = e.target.value;
    }
  };

  const handleCvvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardCvvField = document.getElementById('card_cvv_field');
    const cvvValue = e.target.value;
  
    if (cardCvvField) {
      // Limit the CVV to a maximum of 3 characters
      const truncatedCvv = cvvValue.slice(0, 3);
  
      // Update the cardCvvField with '*' for each character
      cardCvvField.innerText = Array(truncatedCvv.length + 1).join('*');
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cardExpiresMonth = document.getElementById('card_expires_month');
    if (cardExpiresMonth) {
      cardExpiresMonth.innerText = e.target.value;
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cardExpiresYear = document.getElementById('card_expires_year');
    if (cardExpiresYear) {
      cardExpiresYear.innerText = e.target.value.slice(-2);
    }
  };

const formatCardNumberForDisplay = (number: string) => {
  // Replace each digit with an asterisk
  return number.replace(/\d/g, '*');
};

const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, '');
  if (value.length <= 16) {
      setCardNumber(value); // Store the actual number
  }
};



const makePayment = async () => {
  const stripe: Stripe | null = await loadStripe("pk_test_51OLCk5EWEm77uzFJADmXs0LBDoZciUBMUAXSL3mp8nZhro87wDruUpIJ9XgL8bCdTlVpcUTLJHwoyzmCN0IQtRlM00DaPugjSM");

  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  const response = await fetch("http://localhost:3001/donation/payDonation", {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const session = await response.json();
  const result = await stripe?.redirectToCheckout({
    sessionId: session.id
  });

  if (result?.error) {
    console.log(result.error);
  }
};

const goToLanding = () => {
  navigate('/resqreach');
}



  return (
    <>
    <div style={{ display: 'flex' }}>
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content div */}
      <div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
      <button className="px-4 py-2 bg-red-600 hover:bg-gradientWhite text-white rounded transition duration-300 ease-in-out" onClick={goToLanding}>
              Back
            </button>

          <main style={{ flex: 1, textAlign: 'center', padding: '35px' }}>
      <section id="card" className="card">
        <div id="highlight"></div>
        <section className="card__front">
          <div className="card__header">
            <div>CreditCard</div>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="60" id="svg895" version="1.1" viewBox="-96 -98.908 832 593.448">
  <defs id="defs879">
  <style id="style877" type="text/css">{`.e { fill: #f79e1b; }`}</style>
  </defs>
  <path id="rect887" display="inline" fill="#ff5f00" stroke-width="5.494" d="M224.833 42.298h190.416v311.005H224.833z"/>
  <path id="path889" d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z" fill="#eb001b" stroke-width="5.494"/>
  <path id="path891" d="M621.101 320.394v-6.372h2.747v-1.319h-6.537v1.319h2.582v6.373zm12.691 0v-7.69h-1.978l-2.307 5.493-2.308-5.494h-1.977v7.691h1.428v-5.823l2.143 5h1.483l2.143-5v5.823z" className="e" fill="#f79e1b" stroke-width="5.494"/>
  <path id="path893" d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z" className="e" fill="#f79e1b" stroke-width="5.494"/>
</svg>
          </div>
          <div id="card_number" className="card__number">
          {/* {cardNumber.split('').map((char, index) => (
                  <span key={index} className={char === '*' ? 'filed' : ''}>{char}</span>
                ))} */}
                {formatCardNumberForDisplay(cardNumber).split('').map((char, index) => (
        <span key={index}>{char}</span>
    ))}
          </div>
          <div className="card__footer">
            <div className="card__holder">
              <div className="card__section__title">Card Holder</div>
              {/* <div className="card__number text-2xl">{cardNumber || '#### #### #### ####'}</div> */}
              <div id="card_holder">Name on card</div>
            </div>
            <div className="card__expires">
              <div className="card__section__title">Expires</div>
              <span id="card_expires_month">MM</span>/<span id="card_expires_year">YY</span>
            </div>
          </div>
        </section>
        <section className="card__back">
          <div className="card__hide_line"></div>

          <div className="card_cvv">
            <span>CVV</span>
            <div id="card_cvv_field" className="card_cvv_field"></div>
          </div>
        </section>
      </section>

      <form className="form">
       
        <div>
        <div>
                    {/* <label htmlFor="number" className="block text-gray-700 font-semibold mb-2">Card Number</label> */}
                    <label htmlFor="number">Card Number</label>
                    <input 
                        id="number" 
                        type="text" 
                        className="block w-full border border-gray-300 rounded-lg p-3"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                    />
                </div>
        {/* <div className="card__number text-2xl">{cardNumber || '#### #### #### ####'}</div> */}
          <label htmlFor="holder">Card Holder Name</label>
          <input id="holder" type="text" onChange={handleHolderInput} />
        </div>
        <div className="filed__group">
          <div>
            <label htmlFor="expiration_month">Expiration Date</label>
            <div className="filed__date">
              <select id="expiration_month" onChange={handleMonthChange}>
                <option selected disabled>Month</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <select id="expiration_year" onChange={handleYearChange}>
                <option selected disabled>Year</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
                <option>2031</option>
                <option>2032</option>
              </select>
            </div>
          </div>
          <div>
  <label htmlFor="cvv">CVV</label>
  <input
    id="cvv"
    type="text"  // Change type to 'text' to allow pattern attribute
    maxLength={3}
    pattern="\d*"  // Allow only numeric input
    onChange={handleCvvInput}
  />
</div>
        </div>
      </form>
      
    </main>
          <div >
            {/* <form onSubmit={makePayment}>
            <button
            style={{
              padding: '10px 240px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Pay Now
          </button>
            </form> */}
          <button
            onClick={makePayment}
            style={{
              padding: '10px 240px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Pay Now
          </button>
          </div>
         
          {/* Add your profile content here */}
        </div>
    </div>
    </>
    
    
  )
}

export default Donation