import React from 'react';
import axios from 'axios';

const DeleteGame = ({ flaskUrl, gameId, onDeleteSuccess, onDeleteError }) => {
  const handleDeleteGame = async () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        // Delete associated reviews
        await axios.delete(`${flaskUrl}/reviews/game/${gameId}`);
        
        // Delete associated favorites
        await axios.delete(`${flaskUrl}/favorites/game/${gameId}`);

        // Finally, delete the game
        const response = await axios.delete(`${flaskUrl}/games/${gameId}`);
        
        // Log the response message
        console.log(response.data.message);

        // If provided, call the onDeleteSuccess callback
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } catch (error) {
        // Log the error
        console.error('Error deleting game:', error);

        // If provided, call the onDeleteError callback
        if (onDeleteError) {
          onDeleteError();
        }
      }
    }
  };

  return (
    <form onSubmit={handleDeleteGame}>
        <div>
            <button type="submit">Delete Game</button>
        </div>
    </form>
  );
};

export default DeleteGame;
