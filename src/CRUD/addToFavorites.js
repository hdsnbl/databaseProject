import React, { useState } from 'react';
import axios from 'axios';

const AddToFavorites = ({ flaskUrl, gameid, userid }) => {
  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/favorites`, {
        game_id: gameid,
        user_id: userid,
      });

      console.log(response.data.message); // Log the response message
      // You can also update the UI as needed
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <form onSubmit={handleAddToFavorites}>
      <button type="submit">Add to Favorites</button>
    </form>
  );
};

export default AddToFavorites;
