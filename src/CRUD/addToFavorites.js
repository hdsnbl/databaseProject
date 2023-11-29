import React, { useState } from 'react';
import axios from 'axios';

const AddToFavorites = ({ flaskUrl, gameId, userId }) => {
  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/favorites`, {
        game_id: gameId,
        user_id: userId,
      });

      console.log(response.data.message); // Log the response message
      // You can also update the UI as needed
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default AddToFavorites;
