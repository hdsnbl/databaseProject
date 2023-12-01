import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetGameById = ({ flaskUrl, gameId }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${flaskUrl}/games/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error(`Error fetching game with ID ${gameId}:`, error);
        // Handle the error, e.g., show an error message to the user
        setGame(null);
      }
    };

    fetchGame();
  }, [flaskUrl, gameId]);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Game Details:</p>
      {game ? (
        <div>
          <p>ID: {game.gameid}</p>
          <p>Title: {game.title}</p>
          <p>Developer: {game.developer}</p>
          {/* The release_date and platform fields may not exist in your backend */}
          {/* <p>Release Date: {game.release_date}</p> */}
          <p>Genre: {game.genre}</p>
          {/* <p>Platform: {game.platform}</p> */}
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No game found with ID {gameId}</p>
      )}
    </div>
  );
};

export default GetGameById;
