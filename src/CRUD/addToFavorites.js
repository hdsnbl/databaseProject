import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToFavorites = ({ flaskUrl }) => {
  const [gameId, setGameId] = useState('');
  const [userId, setUserId] = useState('');
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchGamesAndUsers = async () => {
      try {
        const gamesResponse = await axios.get(`${flaskUrl}/games`);
        const usersResponse = await axios.get(`${flaskUrl}/users`);

        setGames(gamesResponse.data.games);
        setUsers(usersResponse.data.users);
      } catch (error) {
        console.error('Error fetching games and users:', error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchGamesAndUsers();
  }, [flaskUrl]);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(`${flaskUrl}/favorites`, {
        game_id: gameId,
        user_id: userId,
      });

      console.log(response.data.message); // Log the response message
      // You can also reset the form or update the UI as needed
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h3>Add to Favorites</h3>
      <form>
        <label>Select Gameid:</label>
        <select value={gameId} onChange={(e) => setGameId(e.target.value)}>
          <option value="">Select a GameID</option>
          {games.map((game) => (
            <option key={game.gameid} value={game.gameid}>
              {game.title}
            </option>
          ))}
        </select>

        <label>Select User:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleAddToFavorites}>
          Add to Favorites
        </button>
      </form>
    </div>
  );
};

export default AddToFavorites;
