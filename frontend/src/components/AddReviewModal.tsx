import React, { useState } from 'react';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {  author: string; rating: number; comment: string }) => void;
}

//Creating our modal component with required data
const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [reviewData, setReviewData] = useState({
    
    author: '',
    rating: 0,
    comment: '',
  });


  //Handling all our input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (newRating: number) => {
    setReviewData((prevData) => ({
      ...prevData,
      rating: newRating,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reviewData);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <div className="relative bg-white rounded-lg p-8 shadow-md max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &#x2715;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Author:</label>
          <input
            type="text"
            name="author"
            value={reviewData.author}
            onChange={handleInputChange}
            className="w-full border rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring focus:border-blue-300"
          />

          <label className="block mb-2 text-sm font-medium">Rating:</label>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingChange(value)}
                className={`text-xl mx-1 focus:outline-none ${
                  reviewData.rating >= value ? 'text-yellow-500' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <label className="block mb-2 text-sm font-medium">Comment (Max 100 characters):</label>
          <textarea
            name="comment"
            maxLength={100}
            value={reviewData.comment}
            onChange={handleInputChange}
            className="w-full border rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
