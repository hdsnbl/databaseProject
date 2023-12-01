import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToFavorites from './CRUD/addToFavorites';

const GameList = ({ flaskUrl, userId }) => {
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
      <h2>All Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.gameid} style={{padding:"5px"}}>
            
            <div style={{ borderStyle: 'solid', borderColor: 'black', backgroundColor:"lightgray"}}>
              <div style={{padding:"5px", borderBottomStyle:"dotted", fontWeight:"bold"}}>
                {game.title} - {game.developer}  - {game.genre} -
              </div>
              
              <AddToFavorites flaskUrl={flaskUrl} gameId={ game.gameid } userId={ userId }/>
            </div>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default GameList;
