import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToFavorites from './CRUD/addToFavorites';
import CreateReview from './CRUD/createReview';
import DeleteGame from './CRUD/deleteGame';

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
          <li key={game.id} style={{padding:"5px"}}>
            
            <div style={{ borderStyle: 'solid', borderColor: 'black', backgroundColor:"lightgray"}}>
              <div style={{padding:"5px", borderBottomStyle:"dotted", fontWeight:"bold"}}>
                {game.title} - {game.developer} - {game.release_date} - {game.genre} - {game.platform}
              </div>
              
              <AddToFavorites flaskUrl={flaskUrl} gameId={ game.id } userId={ userId }/>
              <DeleteGame flaskUrl={flaskUrl} gameId={game.id}/>
              <p style={{fontWeight:"bold"}}>Create Review:</p>
              <CreateReview flaskUrl={flaskUrl} gameId={ game.id } userId={ userId }/>
            </div>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default GameList;
