import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteFavorite from './deleteFavorite';

const GetAllFavorites = ({ flaskUrl }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${flaskUrl}/favorites`);
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    // Call fetchFavorites inside useEffect
    fetchFavorites();
  }, [flaskUrl]);

  const handleDeleteFavorite = async (favoriteId) => {
    // Implement the logic to delete a specific favorite
    try {
      // Make an API call to delete the favorite
      const response = await axios.delete(`${flaskUrl}/favorites/${favoriteId}`);
      console.log(response.data.message); // Log the response message
      // You can also update the UI as needed

      // Fetch the updated list of favorites after deletion
      fetchFavorites();
    } catch (error) {
      console.error('Error deleting favorite:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h3>All Favorites:</h3>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
           Game Name: {favorite.game_title} , Game ID: {favorite.game_id}, User ID: {favorite.user_id}
           <DeleteFavorite
              flaskUrl={flaskUrl}
              favoriteId={favorite.id}
              handleDeleteFavorite={() => handleDeleteFavorite(favorite.id)}
            />
           
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default GetAllFavorites;
