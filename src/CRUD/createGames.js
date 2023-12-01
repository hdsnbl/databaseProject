import React, { useState } from 'react';
import axios from 'axios';

const CreateGame = ({ flaskUrl }) => {
  const [gameData, setGameData] = useState({
    title: '',
    developer: '',
    release_date: '',
    genre: '',
    platform: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: value });
  };

 // In createGames.js
 const handleCreateGame = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/games`, gameData);
      console.log('Game created successfully:', response.data);
    } catch (error) {
      console.error('Error creating game:', error);
      // Log the detailed Axios error
      console.log('Axios Error Details:', error.response);
    }

    window.location.reload();
  };
  

  return (
    <div>
      <h3>Create a New Game</h3>
      <form>
        <label>Title:</label>
        <input type="text" name="title" value={gameData.title} onChange={handleInputChange} />

        <label>Developer:</label>
        <input type="text" name="developer" value={gameData.developer} onChange={handleInputChange} />

        <label>Release Date:</label>
        <input type="text" name="release_date" placeholder="2000-01-01" value={gameData.release_date} onChange={handleInputChange} />

        <label>Genre:</label>
        <input type="text" name="genre" value={gameData.genre} onChange={handleInputChange} />

        <label>Platform:</label>
        <input type="text" name="platform" value={gameData.platform} onChange={handleInputChange} />

        <button type="button" onClick={handleCreateGame}>
          Create Game
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
