import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllFavorites = ({ flaskUrl }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${flaskUrl}/favorites`);
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        // Handle the error, e.g., show an error message to the user
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [flaskUrl]);

  return (
    <div>
      <h3>All Favorites:</h3>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            Game ID: {favorite.game_id}, User ID: {favorite.user_id}
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllFavorites;
