import React from 'react';
import axios from 'axios';

const DeleteGame = ({ flaskUrl, gameId, onDeleteSuccess, onDeleteError }) => {
  const handleDeleteGame = async () => {
    
      try {
        
        // Finally, delete the game
        const response = await axios.delete(`${flaskUrl}/games/${gameId}`);
        
        // Log the response message
        console.log(response.data.message);

        }
       catch (error) {
        // Log the error
        console.error('Error deleting game:', error);
        }
      }
  };

  return (
    <form onSubmit={handleDeleteGame}>
        <div>
            <button type="submit" onClick={()=>window.confirm("Are you sure you want to delete this game?")}>Delete Game</button>
        </div>
    </form>
  );

export default DeleteGame;
