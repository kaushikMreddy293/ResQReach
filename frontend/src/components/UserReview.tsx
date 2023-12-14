import React, { useEffect, useState } from 'react';
import AddReviewModal from './AddReviewModal';
import Toast from './ToastMessage';
import fiveStarIconUrl from '../assets/icons/thumbsUp.gif'

interface UserReview {
  author: string;
  rating: number;
  comment: string;
}

interface UserReviewProps {
  review: UserReview;
}

//Component for user review card design and functions
const UserReviewCard: React.FC<UserReviewProps> = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-300  mb-4 " style={{ height: '160px', fontFamily: 'Brygada, serif' }} >
      <h2 className="text-xl font-semibold mb-2 flex gap-16">{review.author}  
      {review.rating === 5 ? (
    <img src={fiveStarIconUrl} alt="5-Star Icon" className="w-10 h-10" />
  ) : null}</h2>
      
      <div className="flex items-center mb-2">
        {/* Display stars or rating */}
        {/* Adjust styling based on your design */}
        {Array.from({ length: review.rating }).map((_, index) => (
          <span key={index} className="text-yellow-500 mr-1">
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

//Component to show all user reviews
const UserReviewPage: React.FC = () => {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<UserReview[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //GET API call for user reviews
  const fetchData = () => {
    // Fetch data from API
    fetch('http://localhost:3001/reviews')
      .then(response => response.json())
      .then(data => {
        // Set reports state with fetched data
        setReviews(data);
        console.log(data);
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, []);

  //function to handle add reviews and post API call
  const handleAddReview = async (newReview: UserReview) => {
    // Update your reviews state with the new review
    //   setReviews((prevReviews) => [...prevReviews, newReview]);
    console.log("On Submit of add review come here")

    try {
      const response = await fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
        body: JSON.stringify(newReview),
      });
      const data = await response.json();
      console.log('Server Response:', data);



      if (response.ok) {
        console.log('Review submitted successfully');
        setToast({ type: 'success', message: 'Review Added, Thank you for your review!' });
        fetchData();

      } else {
        console.error('Error submitting review', response.statusText);
        setToast({ type: 'error', message: 'An error occurred. Please try again.' });
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      setToast({ type: 'error', message: 'An error occurred. Please try again.' });
      // Handle network errors or other exceptions
    }


    console.log(newReview);
  };

  return (
    <div className="container mx-auto my-8 flex flex-col justify-items items-center" style={{fontFamily: 'Brygada, serif', marginTop:'100px'}}>
      <h1 className="text-3xl font-bold mb-8">User Reviews</h1>
      <div className="grid grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="w-96">
            <UserReviewCard review={review} />
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button className="px-4 py-2 bg-cyan-600 hover:bg-gradientWhite text-white rounded transition duration-300 ease-in-out" onClick={handleOpenModal}>
          Give a Review
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <AddReviewModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddReview} />
        </div>
      )}

      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );

}

export default UserReviewPage;
