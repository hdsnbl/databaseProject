import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToFavorites from './CRUD/addToFavorites';

const GameList = ({ flaskUrl }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${flaskUrl}/games`);
        setGames(response.data.games);
      } catch (error) {
        console.error('Error fetching games:', error);
        // Log the detailed Axios error
        console.log('Axios Error Details:', error.response);
        // Handle the error, e.g., show an error message to the user
        setGames([]);
      }
    };

    fetchGames();
  }, [flaskUrl]);

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.title} - {game.developer} - {game.release_date} - {game.genre} - {game.platform}
            <AddToFavorites flaskUrl={flaskUrl} gameId={ game.id } /*userId={ user.id }*//>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default GameList;
