import React from 'react';
import axios from 'axios';

const DeleteGame = ({ flaskUrl, gameId }) => {
  const handleDeleteGame = async () => {
    if(window.confirm('Are you sure you want to delete this game?'))
    {
      try {
        const response = await axios.delete(`${flaskUrl}/games/${gameId}`);
        console.log(response.data.message); // Log the response message
       // You can also update the UI as needed
      } catch (error) {
      console.error('Error deleting game:', error);
      // Handle the error, e.g., show an error message to the user
      }
    }
  };

  return (
    <div>
      <button onClick={handleDeleteGame}>Delete Game</button>
    </div>
  );
};

export default DeleteGame;