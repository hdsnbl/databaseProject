import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteReview from './CRUD/deleteReview';

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
      <h3>All Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            Game: {review.game_id} Rating: {review.rating}, Comments: {review.comments}
            <DeleteReview flaskUrl={flaskUrl} reviewId={review.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllReviews;
