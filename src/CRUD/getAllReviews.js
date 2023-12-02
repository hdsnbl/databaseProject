import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllReviews = ({ flaskUrl }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${flaskUrl}/reviews`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Handle the error, e.g., show an error message to the user
        setReviews([]);
      }
    };

    fetchReviews();
  }, [flaskUrl]);

  return (
    <div>
      <h3>All Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.reviewid}>
            Rating: {review.rating}, Comments: {review.comments}, Game ID: {review.game_id}, User ID: {review.user_id}
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllReviews;
