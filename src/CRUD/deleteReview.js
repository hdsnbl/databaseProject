import React, { useState } from 'react';
import axios from 'axios';

const DeleteReview = ({ flaskUrl, reviewId }) => {
  const handleDeleteReview = async () => {
    try {
      const response = await axios.delete(`${flaskUrl}/reviews/${reviewId}`);
      console.log(response.data.message); // Log the response message
      // You can also update the UI as needed
    } catch (error) {
      console.error('Error deleting review:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    // <div>
    //   {/* Button to delete the review */}
    //   <button onClick={handleDeleteReview}>Delete Review</button>
    // </div>
    <form onSubmit={handleDeleteReview}>
    <div>
      {/* Button to delete the review */}
      <button type="submit">Delete Review</button>
    </div>
  </form>
  );
};

export default DeleteReview;
