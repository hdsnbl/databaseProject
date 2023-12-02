import React, { useState } from 'react';
import axios from 'axios';

const DeleteReview = ({ flaskUrl, reviewId }) => {
  const handleDeleteReview = async () => {
    try {
      const response = await axios.delete(`${flaskUrl}/reviews/${reviewId}`);
      console.log(response.data.message); // Log the response message
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <form onSubmit={handleDeleteReview}>
      <div>
        <button type="submit" onClick={() => window.confirm("Are you sure you want to delete this review?")}>Delete Review</button>
      </div>
    </form>
  );
};

export default DeleteReview;
