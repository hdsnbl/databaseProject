import React from 'react';
import axios from 'axios';

const DeleteFavorite = ({ flaskUrl, favoriteId }) => {
  const handleDeleteFavorite = async () => {
    try {
      const response = await axios.delete(`${flaskUrl}/favorites/${favoriteId}`);
      console.log(response.data.message); // Log the response message
      // You can also update the UI as needed
    } catch (error) {
      console.error('Error deleting favorite:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <form onSubmit={handleDeleteFavorite}>
      <div>
        {/* Button to delete the favorite */}
        <button type="submit">Delete Favorite</button>
      </div>
    </form>
  );
};

export default DeleteFavorite;
